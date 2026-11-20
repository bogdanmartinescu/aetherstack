import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Card, CardContent } from "@aetherstack/ui"

export interface Feature {
  icon?: React.ReactNode
  title: string
  description: string
}

export interface FeaturesSectionProps {
  eyebrow?: string
  headline?: string
  subheading?: string
  features: Feature[]
  cols?: 2 | 3 | 4
  layout?: "grid" | "list"
  className?: string
}

const colsMap: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

export function FeaturesSection({
  eyebrow,
  headline,
  subheading,
  features,
  cols = 3,
  layout = "grid",
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn("w-full px-4 py-16", className)}>
      {(eyebrow || headline || subheading) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              {headline}
            </h2>
          )}
          {subheading && <p className="text-muted-foreground mt-4 text-base">{subheading}</p>}
        </div>
      )}

      {layout === "grid" ? (
        <div className={cn("mx-auto grid max-w-6xl gap-6", colsMap[cols])}>
          {features.map((feature, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="pt-6">
                {feature.icon && (
                  <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-foreground mb-2 text-base font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-4xl space-y-10">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col gap-6 sm:flex-row",
                i % 2 !== 0 && "lg:flex-row-reverse",
              )}
            >
              {feature.icon && (
                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  {feature.icon}
                </div>
              )}
              <div>
                <h3 className="text-foreground text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
