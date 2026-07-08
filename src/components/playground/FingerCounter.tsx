import type { DetectedHand } from "@/types";

interface FingerCounterProps {
  hands: DetectedHand[];
}

const FINGER_LABELS = ["Thumb", "Index", "Middle", "Ring", "Pinky"] as const;

export function FingerCounter({ hands }: FingerCounterProps) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-lg font-semibold">Finger Counter</h3>
      <p className="mt-1 text-sm text-muted">Total extended fingers per detected hand.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {hands.length === 0 && (
          <p className="text-sm text-muted">Show a hand to the camera to see the count.</p>
        )}
        {hands.map((hand, idx) => (
          <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{hand.handedness} Hand</span>
              <span className="font-display text-3xl font-bold gradient-text">
                {hand.fingerCount}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              {FINGER_LABELS.map((label) => {
                const key = label.toLowerCase() as keyof typeof hand.fingerState;
                const active = hand.fingerState[key];
                return (
                  <div
                    key={label}
                    className={`flex-1 rounded-lg py-2 text-center text-[10px] font-medium uppercase ${
                      active ? "bg-gradient-to-b from-primary to-accent text-white" : "bg-white/5 text-muted"
                    }`}
                  >
                    {label.slice(0, 3)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
