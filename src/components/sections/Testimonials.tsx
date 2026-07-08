import { GlassCard } from "@/components/ui/GlassCard";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We integrated Xentrix into a kiosk prototype in an afternoon. No backend to deploy was a huge win.",
    name: "Priya Sharma",
    role: "Frontend Lead, RetailFlow"
  },
  {
    quote: "The gesture accuracy in low light surprised our whole team. It just works out of the box.",
    name: "Daniel Osei",
    role: "Creative Technologist"
  },
  {
    quote: "Air Drawing is a fantastic teaching tool for our computer vision workshops.",
    name: "Mei Lin",
    role: "University Lecturer"
  }
];

export function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Loved by builders</h2>
          <p className="mt-4 text-muted">A few words from people experimenting with Xentrix.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.08}>
              <Quote className="h-6 w-6 text-accent/60" aria-hidden="true" />
              <p className="mt-4 text-sm text-white/90">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
