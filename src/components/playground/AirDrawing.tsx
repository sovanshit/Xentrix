import { useCallback, useEffect, useRef, useState } from "react";
import { Undo2, Redo2, Eraser, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { DetectedHand, DrawStroke } from "@/types";

const COLORS = ["#4F46E5", "#8B5CF6", "#06B6D4", "#F472B6", "#22C55E", "#FACC15", "#FFFFFF"];

interface AirDrawingProps {
  hands: DetectedHand[];
  width: number;
  height: number;
}

export function AirDrawing({ hands, width, height }: AirDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<DrawStroke[]>([]);
  const [, setRedoStack] = useState<DrawStroke[]>([]);
  const [color, setColor] = useState(COLORS[2]);
  const [brushSize, setBrushSize] = useState(6);
  const [eraserMode, setEraserMode] = useState(false);
  const currentStroke = useRef<DrawStroke | null>(null);
  const wasDrawing = useRef(false);

  const primary = hands[0];
  const isDrawingGesture = primary?.gesture === "Point";

  useEffect(() => {
    if (!primary) {
      if (currentStroke.current) {
        setStrokes((prev) => [...prev, currentStroke.current as DrawStroke]);
        currentStroke.current = null;
      }
      wasDrawing.current = false;
      return;
    }

    const tip = primary.landmarks[8];
    // Mirror x to match the mirrored video display.
    const point = { x: (1 - tip.x) * width, y: tip.y * height };

    if (isDrawingGesture) {
      if (!wasDrawing.current) {
        currentStroke.current = {
          points: [point],
          color: eraserMode ? "#09090B" : color,
          size: eraserMode ? brushSize * 4 : brushSize
        };
        setRedoStack([]);
      } else if (currentStroke.current) {
        currentStroke.current.points.push(point);
      }
      wasDrawing.current = true;
    } else if (wasDrawing.current) {
      if (currentStroke.current) {
        setStrokes((prev) => [...prev, currentStroke.current as DrawStroke]);
        currentStroke.current = null;
      }
      wasDrawing.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, isDrawingGesture, color, brushSize, eraserMode, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, width, height);

    const allStrokes = currentStroke.current ? [...strokes, currentStroke.current] : strokes;
    allStrokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    });
  }, [strokes, width, height, primary]);

  const undo = useCallback(() => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((r) => [...r, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const clearCanvas = useCallback(() => {
    setStrokes([]);
    setRedoStack([]);
    currentStroke.current = null;
  }, []);

  const exportPNG = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "xentrix-air-drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div className="glass-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">Air Drawing</h3>
          <p className="mt-1 text-sm text-muted">
            Hold a <span className="text-accent">Point</span> gesture (index finger only) and move your hand to draw.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                aria-label={`Select color ${c}`}
                onClick={() => {
                  setColor(c);
                  setEraserMode(false);
                }}
                className={`h-6 w-6 rounded-full border-2 transition-transform ${
                  color === c && !eraserMode ? "scale-110 border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="range"
            min={2}
            max={24}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            aria-label="Brush size"
            className="accent-accent"
          />
          <Button variant="secondary" onClick={() => setEraserMode((e) => !e)} className="px-3 py-2">
            <Eraser className={`h-4 w-4 ${eraserMode ? "text-accent" : ""}`} />
          </Button>
          <Button variant="secondary" onClick={undo} className="px-3 py-2" aria-label="Undo">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" onClick={redo} className="px-3 py-2" aria-label="Redo">
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" onClick={clearCanvas} className="px-3 py-2" aria-label="Clear canvas">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={exportPNG} className="px-3 py-2" aria-label="Export as PNG">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <canvas ref={canvasRef} width={width} height={height} className="h-full w-full" />
      </div>
    </div>
  );
}
