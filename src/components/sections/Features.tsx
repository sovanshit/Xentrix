import { GlassCard } from "@/components/ui/GlassCard";
import { Hand, Sparkles, PenTool, MousePointer2, LayoutGrid, Gauge, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Hand,
    title: "Real-Time Hand Tracking",
    desc: "21-point landmark detection running at up to 60fps directly in your browser via MediaPipe."
  },
  {
    icon: Sparkles,
    title: "11 Recognized Gestures",
    desc: "From Open Palm to Rock and Call Me — a full gesture vocabulary recognized instantly."
  },
  {
    icon: PenTool,
    title: "Air Drawing Canvas",
    desc: "Draw in the air with your index finger. Adjust brush size, color, undo, redo, and export as PNG."
  },
  {
    icon: MousePointer2,
    title: "Virtual Mouse Demo",
    desc: "Move a cursor and trigger click animations using pinch gestures — an educational interaction demo."
  },
  {
    icon: LayoutGrid,
    title: "Gesture Gallery",
    desc: "Browse every supported gesture with animated previews and usage descriptions."
  },
  {
    icon: Gauge,
    title: "Performance Dashboard",
    desc: "Live FPS, detection latency, resolution, and estimated memory use — full transparency."
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design",
    desc: "Video frames are processed on-device and never uploaded anywhere. Nothing to leak."
  },
  {
    icon: Zap,
    title: "Zero Backend",
    desc: "No servers, no APIs, no infrastructure to maintain. Deploys as pure static hosting."
  }
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">
            Everything you need,{" "}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="mt-4 text-muted">
            A focused toolkit for real-time hand gesture AI — designed to feel instant,
            look premium, and run anywhere a browser does.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <GlassCard key={feature.title} delay={i * 0.05}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <feature.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
