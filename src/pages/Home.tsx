import { SEO } from "@/components/SEO";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { CompaniesStrip } from "@/components/sections/CompaniesStrip";
import { Features } from "@/components/sections/Features";
import { Workflow } from "@/components/sections/Workflow";
import { Testimonials } from "@/components/sections/Testimonials";
import { Roadmap } from "@/components/sections/Roadmap";
import { FAQPreview } from "@/components/sections/FAQPreview";

export default function Home() {
  return (
    <>
      <SEO
        title="Real-Time AI Hand Gesture Recognition"
        description="Xentrix recognizes hand gestures in real time, entirely inside your browser. No backend, no install — powered by MediaPipe and TensorFlow.js."
        path="/"
      />
      <Hero />
      <Stats />
      <CompaniesStrip />
      <Features />
      <Workflow />
      <Testimonials />
      <Roadmap />
      <FAQPreview />
    </>
  );
}
