import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── StatItem ──────────────────────────────────────────────────────────────────

export interface StatItemProps {
  label: string
  value: string | number
  /** Positive = green, negative = red */
  delta?: number
  icon?: React.ReactNode
  className?: string
}

export function StatItem({ label, value, delta, icon, className }: StatItemProps) {
  const hasDelta = delta !== undefined

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {hasDelta && (
            <p
              className={cn(
                "mt-1.5 text-xs font-medium",
                delta > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400",
              )}
            >
              {delta > 0 ? "+" : ""}
              {delta}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

// ── StatGroup ─────────────────────────────────────────────────────────────────

export interface StatGroupProps {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}

const colsMap: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

export function StatGroup({ children, cols = 3, className }: StatGroupProps) {
  return (
    <div className={cn("grid gap-4", colsMap[cols], className)}>
      {children}
    </div>
  )
}
