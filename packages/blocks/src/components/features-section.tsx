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
    <section className={cn("w-full py-16 px-4", className)}>
      {(eyebrow || headline || subheading) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {headline}
            </h2>
          )}
          {subheading && (
            <p className="mt-4 text-base text-muted-foreground">{subheading}</p>
          )}
        </div>
      )}

      {layout === "grid" ? (
        <div className={cn("mx-auto grid max-w-6xl gap-6", colsMap[cols])}>
          {features.map((feature, i) => (
            <Card key={i} className="border-border bg-card">
              <CardContent className="pt-6">
                {feature.icon && (
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                )}
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
