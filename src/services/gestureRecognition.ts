import type { Landmark, GestureName } from "@/types";

/**
 * MediaPipe Hand landmark indices reference:
 * 0 Wrist
 * 1-4  Thumb (CMC, MCP, IP, TIP)
 * 5-8  Index (MCP, PIP, DIP, TIP)
 * 9-12 Middle
 * 13-16 Ring
 * 17-20 Pinky
 */
const TIP = { thumb: 4, index: 8, middle: 12, ring: 16, pinky: 20 };
const PIP = { index: 6, middle: 10, ring: 14, pinky: 18 };
const MCP = { thumb: 2, index: 5, middle: 9, ring: 13, pinky: 17 };

function dist(a: Landmark, b: Landmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y, (a.z ?? 0) - (b.z ?? 0));
}

/** Returns true if a finger (excluding thumb) is extended, based on tip vs pip vertical position. */
function isFingerExtended(landmarks: Landmark[], tipIdx: number, pipIdx: number, mcpIdx: number): boolean {
  const tip = landmarks[tipIdx];
  const pip = landmarks[pipIdx];
  const mcp = landmarks[mcpIdx];
  // Extended if tip is further from the palm (wrist) than the pip/mcp joints, in image-space "up" direction.
  const wrist = landmarks[0];
  const tipToWrist = dist(tip, wrist);
  const pipToWrist = dist(pip, wrist);
  const mcpToWrist = dist(mcp, wrist);
  return tipToWrist > pipToWrist && pipToWrist > mcpToWrist * 0.95;
}

function isThumbExtended(landmarks: Landmark[], handedness: "Left" | "Right"): boolean {
  const tip = landmarks[TIP.thumb];
  const ip = landmarks[3];
  const mcp = landmarks[MCP.thumb];
  const wrist = landmarks[0];
  const spread = dist(tip, landmarks[MCP.index]);
  const folded = dist(ip, landmarks[MCP.index]);
  const straight = dist(tip, wrist) > dist(mcp, wrist);
  void handedness;
  return spread > folded * 1.15 && straight;
}

export interface FingerState {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export function getFingerState(landmarks: Landmark[], handedness: "Left" | "Right"): FingerState {
  return {
    thumb: isThumbExtended(landmarks, handedness),
    index: isFingerExtended(landmarks, TIP.index, PIP.index, MCP.index),
    middle: isFingerExtended(landmarks, TIP.middle, PIP.middle, MCP.middle),
    ring: isFingerExtended(landmarks, TIP.ring, PIP.ring, MCP.ring),
    pinky: isFingerExtended(landmarks, TIP.pinky, PIP.pinky, MCP.pinky)
  };
}

export function countExtendedFingers(state: FingerState): number {
  return Object.values(state).filter(Boolean).length;
}

export function getPinchDistance(landmarks: Landmark[]): number {
  return dist(landmarks[TIP.thumb], landmarks[TIP.index]);
}

export function getPalmSize(landmarks: Landmark[]): number {
  return dist(landmarks[0], landmarks[MCP.middle]);
}

interface GestureMatch {
  gesture: GestureName;
  confidence: number;
}

/**
 * Rule-based gesture classifier built on top of MediaPipe's 21 hand landmarks.
 * Each rule scores geometric agreement; the highest-confidence match wins.
 */
export function classifyGesture(landmarks: Landmark[], handedness: "Left" | "Right"): GestureMatch {
  const f = getFingerState(landmarks, handedness);
  const count = countExtendedFingers(f);
  const palmSize = getPalmSize(landmarks) || 0.001;
  const pinchDist = getPinchDistance(landmarks) / palmSize;

  const candidates: GestureMatch[] = [];

  // Pinch / OK — thumb and index tips close together
  if (pinchDist < 0.35) {
    const othersExtended = [f.middle, f.ring, f.pinky].filter(Boolean).length;
    if (othersExtended >= 2) {
      candidates.push({ gesture: "OK", confidence: 0.9 - pinchDist });
    } else {
      candidates.push({ gesture: "Pinch", confidence: 0.92 - pinchDist });
    }
  }

  if (count === 5) {
    candidates.push({ gesture: "Open Palm", confidence: 0.95 });
  }
  if (count === 0) {
    candidates.push({ gesture: "Fist", confidence: 0.95 });
  }
  if (f.index && f.middle && !f.ring && !f.pinky && !f.thumb) {
    candidates.push({ gesture: "Peace", confidence: 0.88 });
    candidates.push({ gesture: "Victory", confidence: 0.7 });
  }
  if (f.thumb && !f.index && !f.middle && !f.ring && !f.pinky) {
    const tip = landmarks[TIP.thumb];
    const wrist = landmarks[0];
    const pointingUp = tip.y < wrist.y;
    candidates.push({
      gesture: pointingUp ? "Thumbs Up" : "Thumbs Down",
      confidence: 0.85
    });
  }
  if (f.index && !f.middle && !f.ring && !f.pinky) {
    candidates.push({ gesture: "Point", confidence: 0.82 });
  }
  if (f.index && f.pinky && !f.middle && !f.ring) {
    candidates.push({ gesture: "Rock", confidence: 0.86 });
  }
  if (f.thumb && f.pinky && !f.index && !f.middle && !f.ring) {
    candidates.push({ gesture: "Call Me", confidence: 0.86 });
  }

  if (candidates.length === 0) {
    return { gesture: "Unknown", confidence: 0.3 };
  }

  candidates.sort((a, b) => b.confidence - a.confidence);
  return candidates[0];
}
