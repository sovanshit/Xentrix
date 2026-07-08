const milestones = [
  { quarter: "Shipped", title: "Core hand tracking + 11-gesture recognition engine" },
  { quarter: "Shipped", title: "Air Drawing module with export and undo/redo" },
  { quarter: "In Progress", title: "Two-hand gesture combinations and custom gesture training" },
  { quarter: "Planned", title: "WebGPU-accelerated model for lower-power devices" },
  { quarter: "Planned", title: "Gesture-based accessibility control layer" }
];

export function Roadmap() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Roadmap</h2>
          <p className="mt-4 text-muted">Where Xentrix is headed next.</p>
        </div>
        <ol className="mt-16 space-y-8 border-l border-white/10 pl-8">
          {milestones.map((m) => (
            <li key={m.title} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {m.quarter}
              </span>
              <p className="mt-1 font-medium text-white/90">{m.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
