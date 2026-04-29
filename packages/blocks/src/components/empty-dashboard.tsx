"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface EmptyDashboardProps {
  title?: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function EmptyDashboard({
  title = "Welcome to your dashboard",
  description = "You haven't set anything up yet. Get started by creating your first project.",
  actions,
  className,
}: EmptyDashboardProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-background p-12",
        className,
      )}
    >
      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Illustration placeholder */}
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-2xl border border-border bg-muted/50 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground/50"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <path d="M7 6h.01" />
          <path d="M11 6h.01" />
        </svg>
        {/* Corner accent dots */}
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-primary/30" />
        <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full bg-primary/20" />
      </div>

      {/* Text */}
      <h2 className="relative text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="relative mt-2 max-w-sm text-center text-sm text-muted-foreground">
        {description}
      </p>

      {/* Actions slot */}
      {actions && (
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}
