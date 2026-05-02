"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Sheet, SheetContent, SheetTrigger } from "@aetherstack/ui"

export interface AppHeaderNavItem {
  label: string
  href: string
  active?: boolean
}

export interface AppHeaderProps {
  logo?: React.ReactNode
  appName?: string
  navItems?: AppHeaderNavItem[]
  actions?: React.ReactNode
  className?: string
}

export function AppHeader({
  logo,
  appName = "App",
  navItems = [],
  actions,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4 sm:px-6">
        {/* Logo / brand */}
        <div className="flex shrink-0 items-center gap-2">
          {logo}
          {appName && (
            <span className="text-sm font-semibold text-foreground">{appName}</span>
          )}
        </div>

        {/* Desktop nav */}
        {navItems.length > 0 && (
          <nav className="hidden flex-1 md:flex" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-sm",
                      item.active
                        ? "text-foreground font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    <a href={item.href} aria-current={item.active ? "page" : undefined}>
                      {item.label}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Spacer when no nav */}
        {navItems.length === 0 && <div className="flex-1" />}

        {/* Desktop actions */}
        {actions && <div className="hidden md:flex items-center gap-2">{actions}</div>}

        {/* Mobile hamburger */}
        {navItems.length > 0 && (
          <div className="flex flex-1 justify-end md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center gap-2 pb-4">
                  {logo}
                  {appName && (
                    <span className="text-sm font-semibold text-foreground">{appName}</span>
                  )}
                </div>
                <nav aria-label="Mobile navigation">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={item.active ? "page" : undefined}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                            item.active
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                {actions && <div className="mt-4 flex flex-col gap-2">{actions}</div>}
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </header>
  )
}
