import type { FrameResult } from "@/types";
import { Activity, Timer, Hand, Fingerprint } from "lucide-react";

interface StatsPanelProps {
  frame: FrameResult | null;
}

function StatRow({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3 last:border-0">
      <span className="flex items-center gap-2 text-sm text-muted">
        <Icon className="h-4 w-4 text-accent" /> {label}
      </span>
      <span className="font-mono text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function StatsPanel({ frame }: StatsPanelProps) {
  const primaryHand = frame?.hands[0];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold">Live Detection Stats</h3>
      <div className="mt-2">
        <StatRow icon={Activity} label="FPS" value={frame ? frame.fps.toFixed(0) : "—"} />
        <StatRow icon={Timer} label="Detection Time" value={frame ? `${frame.detectionTimeMs.toFixed(1)} ms` : "—"} />
        <StatRow icon={Hand} label="Hands Detected" value={String(frame?.hands.length ?? 0)} />
        <StatRow
          icon={Fingerprint}
          label="Handedness"
          value={primaryHand ? `${primaryHand.handedness} (${(primaryHand.handednessScore * 100).toFixed(0)}%)` : "—"}
        />
        <StatRow icon={Hand} label="Fingers Up" value={primaryHand ? String(primaryHand.fingerCount) : "—"} />
        <StatRow
          icon={Activity}
          label="Gesture"
          value={primaryHand ? `${primaryHand.gesture} (${(primaryHand.gestureConfidence * 100).toFixed(0)}%)` : "—"}
        />
        <StatRow
          icon={Fingerprint}
          label="Palm X, Y"
          value={
            primaryHand
              ? `${primaryHand.landmarks[9].x.toFixed(2)}, ${primaryHand.landmarks[9].y.toFixed(2)}`
              : "—"
          }
        />
      </div>
    </div>
  );
}
