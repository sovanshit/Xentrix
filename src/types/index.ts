export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export type Handedness = "Left" | "Right";

export type GestureName =
  | "Open Palm"
  | "Fist"
  | "Peace"
  | "Thumbs Up"
  | "Thumbs Down"
  | "OK"
  | "Pinch"
  | "Point"
  | "Rock"
  | "Victory"
  | "Call Me"
  | "Unknown";

export interface FingerState {
  thumb: boolean;
  index: boolean;
  middle: boolean;
  ring: boolean;
  pinky: boolean;
}

export interface DetectedHand {
  landmarks: Landmark[];
  worldLandmarks: Landmark[];
  handedness: Handedness;
  handednessScore: number;
  fingerCount: number;
  fingerState: FingerState;
  gesture: GestureName;
  gestureConfidence: number;
}

export interface FrameResult {
  hands: DetectedHand[];
  fps: number;
  detectionTimeMs: number;
  timestamp: number;
}

export interface GestureDefinition {
  name: GestureName;
  description: string;
  emoji: string;
  fingerHint: string;
}

export interface PerformanceSample {
  fps: number;
  detectionTimeMs: number;
  timestamp: number;
}

export interface DrawStroke {
  points: { x: number; y: number }[];
  color: string;
  size: number;
}
