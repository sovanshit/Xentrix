import { SEO } from "@/components/SEO";

export default function License() {
  return (
    <>
      <SEO title="License" description="Licensing information for Xentrix and its open-source dependencies." path="/license" />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">License</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <p>
              Xentrix's application code is available under the MIT License unless
              otherwise noted. You are free to use, modify, and distribute it in
              accordance with that license.
            </p>
            <p>
              This project depends on open-source packages including React, Vite,
              Tailwind CSS, Framer Motion, MediaPipe Tasks Vision, and Chart.js, each
              distributed under their respective licenses (primarily MIT and Apache 2.0).
            </p>
            <p>For commercial licensing inquiries, please reach out via the Contact page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
