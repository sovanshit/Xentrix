import { useEffect, useRef } from "react";
import type { DetectedHand } from "@/types";

const CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17]
];

interface HandOverlayCanvasProps {
  hands: DetectedHand[];
  width: number;
  height: number;
  mirrored?: boolean;
}

export function HandOverlayCanvas({ hands, width, height, mirrored = true }: HandOverlayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    if (mirrored) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    hands.forEach((hand) => {
      const points = hand.landmarks.map((lm) => ({ x: lm.x * width, y: lm.y * height }));

      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.85)";
      CONNECTIONS.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(points[a].x, points[a].y);
        ctx.lineTo(points[b].x, points[b].y);
        ctx.stroke();
      });

      points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, i === 0 ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? "#8B5CF6" : "#4F46E5";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    });

    ctx.restore();
  }, [hands, width, height, mirrored]);

  return <canvas ref={canvasRef} width={width} height={height} className="absolute inset-0 h-full w-full" />;
}
