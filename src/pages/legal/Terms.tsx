import { SEO } from "@/components/SEO";

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description="Terms governing use of Xentrix." path="/terms" />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">Terms of Service</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <p>
              By using Xentrix, you agree to use the application for lawful
              purposes only. The application is provided "as is" without warranties of
              any kind, express or implied, including fitness for a particular purpose.
            </p>
            <p>
              Xentrix performs all computation locally in your browser; we make
              no guarantees about detection accuracy for any specific use case, and the
              application should not be relied upon for safety-critical decisions.
            </p>
            <p>
              We may update these terms from time to time. Continued use of the
              application after changes constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
