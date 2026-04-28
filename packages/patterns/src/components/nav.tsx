"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── NavItem ───────────────────────────────────────────────────────────────────

export interface NavItemProps {
  label: string
  href: string
  icon?: React.ReactNode
  /** Badge/count shown on the right */
  badge?: string | number
  active?: boolean
  disabled?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function NavItem({
  label,
  href,
  icon,
  badge,
  active,
  disabled,
  className,
  onClick,
}: NavItemProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      {icon && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
    </a>
  )
}

// ── NavGroup ──────────────────────────────────────────────────────────────────

export interface NavGroupProps {
  label?: string
  children: React.ReactNode
  className?: string
  /** Whether items are initially collapsed (requires collapsible=true) */
  defaultCollapsed?: boolean
  collapsible?: boolean
}

export function NavGroup({
  label,
  children,
  className,
  defaultCollapsed = false,
  collapsible = false,
}: NavGroupProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <div className={cn("space-y-0.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          {collapsible ? (
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="flex w-full items-center justify-between px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={!collapsed}
            >
              {label}
              <svg
                className={cn(
                  "h-3 w-3 transition-transform",
                  collapsed && "-rotate-90",
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          ) : (
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
          )}
        </div>
      )}
      {!collapsed && <div className="space-y-0.5">{children}</div>}
    </div>
  )
}

// ── SidebarNav ────────────────────────────────────────────────────────────────

export interface SidebarNavProps {
  children: React.ReactNode
  className?: string
}

export function SidebarNav({ children, className }: SidebarNavProps) {
  return (
    <nav
      aria-label="Sidebar navigation"
      className={cn("space-y-4", className)}
    >
      {children}
    </nav>
  )
}
