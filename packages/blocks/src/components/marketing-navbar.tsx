"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Sheet, SheetContent, SheetTrigger } from "@aetherstack/ui"

export interface MarketingNavbarNavItem {
  label: string
  href: string
}

export interface MarketingNavbarCta {
  label: string
  href: string
  variant?: "default" | "outline"
}

export interface MarketingNavbarProps {
  logo?: React.ReactNode
  brand?: string
  navItems?: MarketingNavbarNavItem[]
  cta?: MarketingNavbarCta
  className?: string
}

export function MarketingNavbar({
  logo,
  brand,
  navItems = [],
  cta,
  className,
}: MarketingNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-2">
          {logo}
          {brand && (
            <span className="text-base font-bold text-foreground">{brand}</span>
          )}
        </div>

        {/* Desktop nav */}
        {navItems.length > 0 && (
          <nav className="hidden flex-1 justify-center md:flex" aria-label="Marketing navigation">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Button asChild variant="ghost" size="sm" className="text-muted-foreground text-sm">
                    <a href={item.href}>{item.label}</a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {cta && (
            <Button asChild variant={cta.variant ?? "default"} size="sm">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex items-center gap-2 pb-6">
                {logo}
                {brand && <span className="text-base font-bold text-foreground">{brand}</span>}
              </div>
              <nav aria-label="Mobile marketing navigation">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="flex w-full items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {cta && (
                <div className="mt-6">
                  <Button asChild variant={cta.variant ?? "default"} className="w-full">
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
