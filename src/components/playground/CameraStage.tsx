import { useEffect, useRef, useState, type ReactNode } from "react";
import { Camera, CameraOff, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HandOverlayCanvas } from "@/components/playground/HandOverlayCanvas";
import type { useHandLandmarker } from "@/hooks/useHandLandmarker";

type Controller = ReturnType<typeof useHandLandmarker>;

interface CameraStageProps {
  controller: Controller;
  overlay?: ReactNode;
  showLandmarks?: boolean;
}

export function CameraStage({ controller, overlay, showLandmarks = true }: CameraStageProps) {
  const { videoRef, status, modelReady, frame, errorMessage, startCamera, stopCamera } = controller;
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 960, height: 540 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full -scale-x-100 object-cover"
        playsInline
        muted
        aria-label="Live camera feed for gesture detection"
      />

      {status === "granted" && showLandmarks && frame && (
        <HandOverlayCanvas hands={frame.hands} width={size.width} height={size.height} />
      )}

      {status === "granted" && overlay}

      {status !== "granted" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-dark/80 p-8 text-center backdrop-blur-sm">
          {status === "requesting" && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="text-sm text-muted">Requesting camera access…</p>
            </>
          )}
          {(status === "idle" || status === "denied") && (
            <>
              <Camera className="h-10 w-10 text-accent" />
              <p className="max-w-sm text-sm text-muted">
                {status === "denied"
                  ? errorMessage
                  : "Enable your camera to start real-time hand gesture recognition. Video never leaves your device."}
              </p>
              <Button onClick={startCamera} disabled={!modelReady}>
                {modelReady ? "Enable Camera" : (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading AI model…
                  </span>
                )}
              </Button>
            </>
          )}
          {status === "error" && (
            <>
              <AlertTriangle className="h-10 w-10 text-red-400" />
              <p className="max-w-sm text-sm text-muted">{errorMessage}</p>
            </>
          )}
        </div>
      )}

      {status === "granted" && (
        <button
          onClick={stopCamera}
          className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-2 text-xs font-medium text-white backdrop-blur-md hover:bg-black/70"
        >
          <CameraOff className="h-4 w-4" /> Stop Camera
        </button>
      )}
    </div>
  );
}
