import { motion, AnimatePresence } from "framer-motion";
import type { DetectedHand } from "@/types";
import { GESTURE_LIBRARY } from "@/constants/gestures";

interface GestureDisplayProps {
  hands: DetectedHand[];
}

export function GestureDisplay({ hands }: GestureDisplayProps) {
  const primary = hands[0];
  const def = primary ? GESTURE_LIBRARY.find((g) => g.name === primary.gesture) : undefined;

  return (
    <div className="glass-card flex flex-col items-center p-8 text-center">
      <h3 className="font-display text-lg font-semibold">Gesture Recognition</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={primary?.gesture ?? "none"}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          className="mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-6xl"
        >
          {def?.emoji ?? "🤖"}
        </motion.div>
      </AnimatePresence>
      <p className="mt-6 font-display text-2xl font-semibold">
        {primary ? primary.gesture : "No hand detected"}
      </p>
      {primary && (
        <div className="mt-2 w-full max-w-xs">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-200"
              style={{ width: `${Math.min(100, primary.gestureConfidence * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted">
            Confidence: {(primary.gestureConfidence * 100).toFixed(0)}%
          </p>
        </div>
      )}
      {def && <p className="mt-4 max-w-sm text-sm text-muted">{def.description}</p>}
    </div>
  );
}
