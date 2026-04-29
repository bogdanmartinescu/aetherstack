import { cn } from "@aetherstack/utils"
import { Button, Badge } from "@aetherstack/ui"

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: PricingFeature[]
  cta: string
  ctaHref?: string
  highlighted?: boolean
  badge?: string
}

export interface PricingSectionProps {
  title?: string
  description?: string
  tiers: PricingTier[]
  className?: string
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-primary"
    aria-hidden
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-muted-foreground/40"
    aria-hidden
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-7 shadow-sm transition-shadow",
        tier.highlighted
          ? "border-primary ring-2 ring-primary shadow-lg"
          : "border-border hover:shadow-md",
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="shadow-sm">{tier.badge}</Badge>
        </div>
      )}

      {/* Tier header */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">{tier.name}</h3>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {tier.price}
          </span>
          {tier.period && (
            <span className="mb-1 text-sm text-muted-foreground">
              / {tier.period}
            </span>
          )}
        </div>
        {tier.description && (
          <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
        )}
      </div>

      {/* CTA */}
      <Button
        asChild={Boolean(tier.ctaHref)}
        variant={tier.highlighted ? "default" : "outline"}
        className="w-full"
      >
        {tier.ctaHref ? (
          <a href={tier.ctaHref}>{tier.cta}</a>
        ) : (
          <span>{tier.cta}</span>
        )}
      </Button>

      {/* Features */}
      {tier.features.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              {feature.included ? <CheckIcon /> : <XIcon />}
              <span
                className={cn(
                  "text-sm",
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground/50 line-through",
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function PricingSection({
  title = "Simple, transparent pricing",
  description = "Choose the plan that works best for you. Upgrade or downgrade at any time.",
  tiers,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn("w-full py-16 px-4", className)}>
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Tier grid */}
      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-6",
          tiers.length === 1 && "max-w-sm grid-cols-1",
          tiers.length === 2 && "grid-cols-1 sm:grid-cols-2",
          tiers.length === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          tiers.length >= 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  )
}
