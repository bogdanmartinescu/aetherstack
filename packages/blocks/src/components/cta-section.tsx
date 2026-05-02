import { cn } from "@aetherstack/utils"
import { Button } from "@aetherstack/ui"

export interface CTASectionCta {
  label: string
  href: string
}

export interface CTASectionProps {
  headline: string
  subheading?: string
  primaryCta?: CTASectionCta
  secondaryCta?: CTASectionCta
  variant?: "default" | "muted" | "primary"
  className?: string
}

export function CTASection({
  headline,
  subheading,
  primaryCta,
  secondaryCta,
  variant = "default",
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "w-full py-16 px-4",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "muted" && "bg-muted",
        variant === "default" && "border-y border-border bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl",
            variant === "primary" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {headline}
        </h2>
        {subheading && (
          <p
            className={cn(
              "mt-4 text-base",
              variant === "primary"
                ? "text-primary-foreground/80"
                : "text-muted-foreground",
            )}
          >
            {subheading}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {primaryCta && (
              <Button
                asChild
                size="lg"
                variant={variant === "primary" ? "secondary" : "default"}
              >
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
            )}
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant={variant === "primary" ? "ghost" : "outline"}
                className={cn(
                  variant === "primary" &&
                    "text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10",
                )}
              >
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
