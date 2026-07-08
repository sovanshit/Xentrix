import { GlassCard } from "@/components/ui/GlassCard";
import { Camera, ScanFace, Brain, Sparkles } from "lucide-react";

const steps = [
  { icon: Camera, title: "Capture", desc: "Your browser requests camera access using the standard WebRTC getUserMedia API." },
  { icon: ScanFace, title: "Detect", desc: "MediaPipe's HandLandmarker model locates 21 landmarks per hand, per frame, on-device." },
  { icon: Brain, title: "Classify", desc: "Geometric rules analyze landmark angles and distances to identify the active gesture." },
  { icon: Sparkles, title: "Respond", desc: "The UI reacts instantly — drawing strokes, moving cursors, or updating dashboards." }
];

export function Workflow() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">How it works</h2>
          <p className="mt-4 text-muted">Four steps, all inside a single browser tab.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <GlassCard key={step.title} delay={i * 0.08} className="relative">
              <span className="absolute right-6 top-6 font-display text-3xl font-bold text-white/10">
                0{i + 1}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <step.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
