import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Badge, Button } from "@aetherstack/ui"

export interface LandingHeroCta {
  label: string
  href: string
}

export interface LandingHeroProps {
  eyebrow?: string
  headline: string
  subheading?: string
  primaryCta?: LandingHeroCta
  secondaryCta?: LandingHeroCta
  media?: React.ReactNode
  className?: string
}

export function LandingHero({
  eyebrow,
  headline,
  subheading,
  primaryCta,
  secondaryCta,
  media,
  className,
}: LandingHeroProps) {
  return (
    <section className={cn("w-full py-20 px-4 sm:py-28", className)}>
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && (
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
              {eyebrow}
            </Badge>
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {headline}
        </h1>

        {subheading && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {subheading}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {primaryCta && (
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg">
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        )}

        {media && (
          <div className="mt-14 overflow-hidden rounded-xl border border-border shadow-lg">
            {media}
          </div>
        )}
      </div>
    </section>
  )
}
