import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Badge, Button } from "@aetherstack/ui"

export interface ComparisonTier {
  id: string
  name: string
  price?: string
  period?: string
  highlight?: boolean
  cta?: { label: string; href: string }
}

export interface ComparisonFeature {
  category?: string
  label: string
  tiers: Record<string, boolean | string | React.ReactNode>
}

export interface PricingComparisonProps {
  tiers: ComparisonTier[]
  features: ComparisonFeature[]
  className?: string
}

function FeatureValue({ value }: { value: boolean | string | React.ReactNode }) {
  if (value === true) {
    return (
      <span className="flex justify-center" aria-label="Included">
        <Check className="text-primary h-4 w-4" aria-hidden />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="flex justify-center" aria-label="Not included">
        <Minus className="text-muted-foreground/40 h-4 w-4" aria-hidden />
      </span>
    )
  }
  return <span className="text-foreground text-center text-sm">{value as React.ReactNode}</span>
}

export function PricingComparison({ tiers, features, className }: PricingComparisonProps) {
  const categoryGroups = features.reduce<
    { category: string | undefined; items: ComparisonFeature[] }[]
  >((acc, feature) => {
    const last = acc[acc.length - 1]
    if (last && last.category === feature.category) {
      last.items.push(feature)
    } else {
      acc.push({ category: feature.category, items: [feature] })
    }
    return acc
  }, [])

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[640px] border-collapse">
        {/* Header */}
        <thead>
          <tr>
            <th className="text-muted-foreground w-48 pb-4 text-left text-sm font-medium" />
            {tiers.map((tier) => (
              <th
                key={tier.id}
                className={cn("pb-4 text-center", tier.highlight && "bg-primary/5 rounded-t-lg")}
              >
                <div
                  className={cn(
                    "flex flex-col items-center gap-2 px-4 pb-2 pt-4",
                    tier.highlight && "border-primary rounded-t-lg border-x border-t",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-foreground text-sm font-semibold">{tier.name}</span>
                    {tier.highlight && <Badge className="text-xs">Popular</Badge>}
                  </div>
                  {tier.price && (
                    <div className="flex items-end gap-1">
                      <span className="text-foreground text-2xl font-bold tracking-tight">
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-muted-foreground mb-0.5 text-xs">
                          / {tier.period}
                        </span>
                      )}
                    </div>
                  )}
                  {tier.cta && (
                    <Button
                      asChild
                      size="sm"
                      variant={tier.highlight ? "default" : "outline"}
                      className="w-full"
                    >
                      <a href={tier.cta.href}>{tier.cta.label}</a>
                    </Button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {categoryGroups.map((group, gi) => (
            <React.Fragment key={gi}>
              {group.category && (
                <tr>
                  <td
                    colSpan={tiers.length + 1}
                    className="border-border text-muted-foreground border-t pb-2 pt-6 text-xs font-semibold uppercase tracking-wider"
                  >
                    {group.category}
                  </td>
                </tr>
              )}
              {group.items.map((feature, fi) => (
                <tr key={fi} className="border-border/50 group border-t">
                  <td className="text-foreground py-3 pr-4 text-sm">{feature.label}</td>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn(
                        "px-4 py-3 text-center",
                        tier.highlight && "bg-primary/5 border-primary/30 border-x",
                      )}
                    >
                      <FeatureValue value={feature.tiers[tier.id] ?? false} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* Bottom border for highlighted column */}
          <tr>
            <td />
            {tiers.map((tier) => (
              <td
                key={tier.id}
                className={cn(tier.highlight && "border-primary rounded-b-lg border-x border-b")}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
