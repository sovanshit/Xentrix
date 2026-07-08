import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="How Xentrix handles your data — in short, it doesn't leave your browser." path="/privacy" />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl prose-invert">
          <h1 className="section-heading">Privacy Policy</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <p>
              Xentrix is designed around a simple principle: your camera feed is
              yours. All video processing — capture, hand landmark detection, and gesture
              classification — happens locally inside your browser tab using WebAssembly.
              No video frame, image, or derived landmark data is transmitted to any server
              operated by Xentrix.
            </p>
            <p>
              The only exception is the Contact page, where information you voluntarily
              submit (name, email, message) is sent via a third-party email delivery
              service to reach our team.
            </p>
            <p>
              We do not use tracking cookies for advertising purposes. Standard web server
              logs (IP address, browser type, page requested) may be collected by our
              hosting provider for security and reliability purposes.
            </p>
            <p>Last updated: {new Date().getFullYear()}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
