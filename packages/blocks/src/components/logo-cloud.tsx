import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface LogoCloudLogo {
  name: string
  src?: string
  icon?: React.ReactNode
  href?: string
}

export interface LogoCloudProps {
  headline?: string
  logos: LogoCloudLogo[]
  grayscale?: boolean
  className?: string
}

export function LogoCloud({
  headline,
  logos,
  grayscale = true,
  className,
}: LogoCloudProps) {
  return (
    <section className={cn("w-full py-12 px-4", className)}>
      {headline && (
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          {headline}
        </p>
      )}
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12">
        {logos.map((logo) => {
          const content = logo.src ? (
            <img
              src={logo.src}
              alt={logo.name}
              className={cn(
                "h-8 w-auto object-contain transition-all",
                grayscale && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
              )}
            />
          ) : logo.icon ? (
            <span
              className={cn(
                "flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-all",
                grayscale && "opacity-60 hover:opacity-100",
              )}
            >
              {logo.icon}
              {logo.name}
            </span>
          ) : (
            <span
              className={cn(
                "text-sm font-semibold text-muted-foreground transition-all",
                grayscale && "opacity-60 hover:opacity-100",
              )}
            >
              {logo.name}
            </span>
          )

          return logo.href ? (
            <a
              key={logo.name}
              href={logo.href}
              aria-label={logo.name}
              className="flex items-center"
            >
              {content}
            </a>
          ) : (
            <div key={logo.name} className="flex items-center">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
