import { SEO } from "@/components/SEO";
import { Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const tiers = [
  {
    name: "Community",
    price: "Free",
    features: ["Full AI Playground access", "All 11 gestures", "Air Drawing & Virtual Mouse", "Community support"]
  },
  {
    name: "Pro",
    price: "Coming Soon",
    features: ["Custom gesture training", "Team workspaces", "Priority support", "Usage analytics"]
  },
  {
    name: "Enterprise",
    price: "Coming Soon",
    features: ["On-premise deployment guidance", "SLA & dedicated support", "Custom integrations", "Security review"]
  }
];

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Xentrix pricing — free Community tier today, with Pro and Enterprise tiers coming soon."
        path="/pricing"
      />
      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="section-heading">Simple, transparent pricing</h1>
            <p className="mt-4 text-muted">Start free. Upgrade when your team needs more.</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <GlassCard key={tier.name} delay={i * 0.06} className="flex flex-col">
                <h2 className="font-display text-xl font-semibold">{tier.name}</h2>
                <p className="mt-2 font-display text-3xl font-bold gradient-text">{tier.price}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
