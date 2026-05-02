import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Separator } from "@aetherstack/ui"

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterSocialLink {
  platform: string
  href: string
  icon?: React.ReactNode
}

export interface FooterLegalLink {
  label: string
  href: string
}

export interface FooterSectionProps {
  brand?: string
  tagline?: string
  columns?: FooterColumn[]
  socialLinks?: FooterSocialLink[]
  legalLinks?: FooterLegalLink[]
  copyright?: string
  className?: string
}

export function FooterSection({
  brand,
  tagline,
  columns = [],
  socialLinks = [],
  legalLinks = [],
  copyright,
  className,
}: FooterSectionProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={cn("w-full border-t border-border bg-background", className)}>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6">
        {/* Top grid */}
        <div
          className={cn(
            "grid gap-8",
            columns.length > 0
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid-cols-1",
          )}
        >
          {/* Brand column */}
          <div className="space-y-3">
            {brand && (
              <p className="text-base font-bold text-foreground">{brand}</p>
            )}
            {tagline && (
              <p className="text-sm text-muted-foreground">{tagline}</p>
            )}
            {socialLinks.length > 0 && (
              <ul className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.href}
                      aria-label={s.platform}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.icon ?? <span>{s.platform}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {copyright ?? `© ${year} ${brand ?? ""}. All rights reserved.`}
          </p>
          {legalLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
