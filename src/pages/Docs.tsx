import { SEO } from "@/components/SEO";
import { GlassCard } from "@/components/ui/GlassCard";

const sections = [
  {
    title: "How the AI works",
    body:
      "Xentrix uses MediaPipe's HandLandmarker task, a machine-learning model that runs via WebAssembly and WebGL/WebGPU directly in your browser. For each video frame, the model outputs 21 (x, y, z) landmarks per detected hand. A lightweight geometric classifier then compares landmark angles and distances against known gesture patterns to identify Open Palm, Fist, Peace, and the rest of the supported gesture set."
  },
  {
    title: "MediaPipe",
    body:
      "MediaPipe Tasks Vision is Google's on-device machine learning framework. Xentrix loads the HandLandmarker task bundle from a CDN once, caches it, and reuses it for every frame — no server round-trip per prediction."
  },
  {
    title: "Browser Camera API",
    body:
      "Camera access uses the standard navigator.mediaDevices.getUserMedia() Web API. The browser handles the permission prompt; Xentrix never has direct access to your camera outside of what the browser API returns, and the video stream stays inside the page."
  },
  {
    title: "Hand landmarks",
    body:
      "Each hand is represented by 21 landmarks: the wrist, and four joints per finger (thumb, index, middle, ring, pinky). Both 2D image-space landmarks and 3D world-space landmarks are available for more advanced spatial reasoning."
  },
  {
    title: "Gesture recognition",
    body:
      "Gestures are classified using rules built on relative distances (e.g., thumb-to-index tip distance for Pinch/OK) and relative joint positions (e.g., tip further from the wrist than the middle joint for an extended finger). This keeps recognition fast, explainable, and fully client-side."
  },
  {
    title: "Privacy",
    body:
      "No video frame, image, or landmark data is ever uploaded to a server. Everything — capture, inference, and rendering — happens in your browser's memory for the duration of your session."
  },
  {
    title: "Browser compatibility",
    body:
      "Xentrix requires a browser with WebAssembly and WebRTC support: recent versions of Chrome, Edge, Firefox, and Safari all work. A webcam and hardware acceleration are recommended for the smoothest experience."
  }
];

export default function Docs() {
  return (
    <>
      <SEO
        title="Documentation"
        description="Learn how Xentrix's browser-based hand gesture AI works, from MediaPipe hand landmarks to on-device gesture classification and privacy."
        path="/docs"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="section-heading">Documentation</h1>
            <p className="mt-4 text-muted">Understand the technology behind Xentrix.</p>
          </div>
          <div className="mt-14 space-y-6">
            {sections.map((section, i) => (
              <GlassCard key={section.title} delay={i * 0.05}>
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{section.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
