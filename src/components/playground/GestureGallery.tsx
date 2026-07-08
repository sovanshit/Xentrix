import { GlassCard } from "@/components/ui/GlassCard";
import { GESTURE_LIBRARY } from "@/constants/gestures";

export function GestureGallery() {
  return (
    <div id="gesture-lab">
      <div className="mb-6 text-center">
        <h3 className="font-display text-2xl font-semibold">Gesture Gallery</h3>
        <p className="mt-2 text-sm text-muted">All 11 gestures Xentrix recognizes out of the box.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GESTURE_LIBRARY.map((gesture, i) => (
          <GlassCard key={gesture.name} delay={i * 0.04} className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-4xl animate-float">
              {gesture.emoji}
            </div>
            <h4 className="mt-4 font-display font-semibold">{gesture.name}</h4>
            <p className="mt-2 text-xs uppercase tracking-wide text-accent">{gesture.fingerHint}</p>
            <p className="mt-3 text-sm text-muted">{gesture.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
