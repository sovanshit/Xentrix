import { useCallback, useEffect, useRef, useState } from "react";
import {
  HandLandmarker,
  FilesetResolver,
  type HandLandmarkerResult
} from "@mediapipe/tasks-vision";
import { classifyGesture, countExtendedFingers, getFingerState } from "@/services/gestureRecognition";
import type { DetectedHand, FrameResult } from "@/types";

const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export type CameraStatus = "idle" | "requesting" | "granted" | "denied" | "error";

interface UseHandLandmarkerOptions {
  numHands?: number;
  minDetectionConfidence?: number;
}

export function useHandLandmarker(options: UseHandLandmarkerOptions = {}) {
  const { numHands = 2, minDetectionConfidence = 0.6 } = options;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());

  const [status, setStatus] = useState<CameraStatus>("idle");
  const [modelReady, setModelReady] = useState(false);
  const [frame, setFrame] = useState<FrameResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initModel = useCallback(async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_URL,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands,
        minHandDetectionConfidence: minDetectionConfidence,
        minHandPresenceConfidence: minDetectionConfidence,
        minTrackingConfidence: minDetectionConfidence
      });
      setModelReady(true);
    } catch (err) {
      console.error("Failed to initialize HandLandmarker", err);
      setErrorMessage(
        "Could not load the AI model. Check your internet connection and try again."
      );
      setStatus("error");
    }
  }, [numHands, minDetectionConfidence]);

  useEffect(() => {
    initModel();
    return () => {
      landmarkerRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processResult = useCallback((result: HandLandmarkerResult, detectMs: number) => {
    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;
    const fps = delta > 0 ? Math.min(60, 1000 / delta) : 0;

    const hands: DetectedHand[] = result.landmarks.map((landmarks, i) => {
      const handedness = (result.handedness[i]?.[0]?.categoryName as "Left" | "Right") ?? "Right";
      const handednessScore = result.handedness[i]?.[0]?.score ?? 0;
      const worldLandmarks = result.worldLandmarks[i] ?? [];
      const fingerState = getFingerState(landmarks, handedness);
      const fingerCount = countExtendedFingers(fingerState);
      const match = classifyGesture(landmarks, handedness);

      return {
        landmarks,
        worldLandmarks,
        handedness,
        handednessScore,
        fingerCount,
        fingerState,
        gesture: match.gesture,
        gestureConfidence: match.confidence
      };
    });

    setFrame({ hands, fps, detectionTimeMs: detectMs, timestamp: now });
  }, []);

  const loop = useCallback(() => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (video && landmarker && video.readyState >= 2) {
      const startTime = performance.now();
      const result = landmarker.detectForVideo(video, startTime);
      const detectMs = performance.now() - startTime;
      processResult(result, detectMs);
    }
    rafRef.current = requestAnimationFrame(loop);
  }, [processResult]);

  const startCamera = useCallback(async () => {
    setStatus("requesting");
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("granted");
      rafRef.current = requestAnimationFrame(loop);
    } catch (err) {
      console.error("Camera permission error", err);
      setStatus("denied");
      setErrorMessage(
        "Camera access was denied or is unavailable. Please allow camera permissions and try again."
      );
    }
  }, [loop]);

  const stopCamera = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStatus("idle");
    setFrame(null);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return {
    videoRef,
    status,
    modelReady,
    frame,
    errorMessage,
    startCamera,
    stopCamera
  };
}
