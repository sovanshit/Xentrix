import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-8xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The page you&apos;re looking for might have been moved or doesn&apos;t exist.
        </p>
        <Link to="/" className="mt-8">
          <Button>Back to Home</Button>
        </Link>
      </section>
    </>
  );
}
