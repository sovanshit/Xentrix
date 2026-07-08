import { SEO } from "@/components/SEO";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Cpu, Layers, Milestone } from "lucide-react";

const blocks = [
  {
    icon: Target,
    title: "Mission",
    body: "Make computer-vision-powered interaction accessible to anyone with a browser and a webcam — no installs, accounts, or cloud dependency required."
  },
  {
    icon: Cpu,
    title: "Technology",
    body: "Built on MediaPipe Tasks Vision for on-device hand landmark detection, paired with a geometric gesture classifier written in TypeScript, and a React 19 + Vite frontend."
  },
  {
    icon: Layers,
    title: "Architecture",
    body: "A single-page application with lazy-loaded routes, a dedicated camera/AI hook, and modular gesture components — deployable as static files to Firebase Hosting."
  },
  {
    icon: Milestone,
    title: "Roadmap",
    body: "Ongoing work includes two-hand gesture combinations, custom gesture training, and a WebGPU-accelerated inference path for lower-power devices."
  }
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Xentrix's mission, technology, and architecture — a fully browser-based hand gesture recognition platform."
        path="/about"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="section-heading">About Xentrix</h1>
            <p className="mt-4 text-muted">
              A project built to prove that powerful, real-time computer vision doesn&apos;t
              need a backend.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {blocks.map((block, i) => (
              <GlassCard key={block.title} delay={i * 0.06}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  <block.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold">{block.title}</h2>
                <p className="mt-2 text-sm text-muted">{block.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
