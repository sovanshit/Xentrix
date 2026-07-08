import { SEO } from "@/components/SEO";
import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  { question: "Is Xentrix free to use?", answer: "Yes. The core AI Playground and all gesture modules are free — a paid tier is planned for team collaboration features, not core detection." },
  { question: "Does it work on mobile?", answer: "Yes, on modern mobile browsers with camera access, though performance depends on device hardware." },
  { question: "Can I use this commercially?", answer: "See the License page for terms. Reach out via Contact for commercial licensing questions." },
  { question: "Why does it need camera permission?", answer: "Hand tracking requires a live video feed. The permission prompt is handled entirely by your browser, and video never leaves your device." },
  { question: "What if my browser doesn't support WebAssembly?", answer: "Xentrix requires WebAssembly and WebRTC. Nearly all browsers released in the last several years support both — see Documentation for details." },
  { question: "Can I train custom gestures?", answer: "Custom gesture training is on our roadmap. Today, the 11 built-in gestures cover most common use cases." }
];

export default function FAQ() {
  return (
    <>
      <SEO
        title="FAQ"
        description="Answers to common questions about Xentrix's browser-based hand gesture recognition."
        path="/faq"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="section-heading">Frequently Asked Questions</h1>
          </div>
          <div className="mt-14">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
