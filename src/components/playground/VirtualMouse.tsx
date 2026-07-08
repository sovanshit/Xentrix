import { useEffect, useRef, useState } from "react";
import { MousePointer2 } from "lucide-react";
import type { DetectedHand } from "@/types";

interface VirtualMouseProps {
  hands: DetectedHand[];
  width: number;
  height: number;
}

export function VirtualMouse({ hands, width, height }: VirtualMouseProps) {
  const [cursor, setCursor] = useState({ x: width / 2, y: height / 2 });
  const [clicking, setClicking] = useState(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const primary = hands[0];
    if (!primary) return;
    const tip = primary.landmarks[8];
    const target = { x: (1 - tip.x) * width, y: tip.y * height };
    setCursor((prev) => ({
      x: prev.x + (target.x - prev.x) * 0.35,
      y: prev.y + (target.y - prev.y) * 0.35
    }));

    if (primary.gesture === "Pinch" || primary.gesture === "OK") {
      if (!clicking) {
        setClicking(true);
        if (clickTimeout.current) clearTimeout(clickTimeout.current);
        clickTimeout.current = setTimeout(() => setClicking(false), 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hands, width, height]);

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold">Virtual Mouse Demo</h3>
      <p className="mt-1 text-sm text-muted">
        Move your index finger to move the cursor. Pinch your thumb and index finger together to click.
        This is an educational interaction demo, not a system-wide mouse replacement.
      </p>
      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <div
          className="absolute grid grid-cols-3 gap-4 p-8"
          style={{ width, height }}
        >
          {["Open", "Save", "Delete"].map((label) => (
            <div
              key={label}
              className="flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm text-muted"
            >
              {label}
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute z-10 flex items-center justify-center transition-transform duration-75"
          style={{ transform: `translate(${cursor.x - 16}px, ${cursor.y - 16}px)` }}
        >
          <MousePointer2
            className={`h-8 w-8 drop-shadow-lg transition-all ${
              clicking ? "scale-125 text-accent" : "text-white"
            }`}
          />
          {clicking && (
            <span className="absolute -z-10 h-10 w-10 animate-ping rounded-full bg-accent/40" />
          )}
        </div>
      </div>
    </div>
  );
}
