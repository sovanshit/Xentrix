import { Link } from "react-router-dom";
import { Accordion } from "@/components/ui/Accordion";

const items = [
  {
    question: "Does Xentrix send my camera feed anywhere?",
    answer: "No. All video frames are processed locally in your browser using WebAssembly and, where available, your GPU. Nothing is uploaded to a server."
  },
  {
    question: "Which browsers are supported?",
    answer: "Any modern Chromium, Firefox, or Safari browser with WebRTC and WebAssembly support — see the Documentation page for details."
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation is required. Visit the site, grant camera permission, and the AI Playground loads the model directly in your tab."
  }
];

export function FAQPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="section-heading">Frequently asked</h2>
          <p className="mt-4 text-muted">
            A quick preview — see the full{" "}
            <Link to="/faq" className="text-accent hover:underline">
              FAQ page
            </Link>{" "}
            for more.
          </p>
        </div>
        <div className="mt-12">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
