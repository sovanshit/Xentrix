import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 21, suffix: "", label: "Hand Landmarks Tracked" },
  { value: 11, suffix: "", label: "Recognized Gestures" },
  { value: 60, suffix: "fps", label: "Real-Time Detection" },
  { value: 0, suffix: "ms", label: "Server Round-Trips" }
];

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
