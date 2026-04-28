import * as React from "react"
import { Card, CardContent } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export type MetricTrend = "up" | "down" | "neutral"

export interface MetricCardProps {
  label: string
  value: string | number
  /** e.g. "+12.5%" */
  change?: string
  trend?: MetricTrend
  /** Icon to display in the top-right */
  icon?: React.ReactNode
  /** Optional sublabel below the value */
  sublabel?: string
  className?: string
}

function TrendArrow({ trend }: { trend: MetricTrend }) {
  if (trend === "neutral") return null
  return (
    <svg
      className={cn(
        "h-3 w-3",
        trend === "up" ? "rotate-0 text-emerald-500" : "rotate-180 text-destructive",
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  )
}

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  sublabel,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
            {sublabel && (
              <p className="mt-0.5 text-xs text-muted-foreground">{sublabel}</p>
            )}
            {change && (
              <div
                className={cn(
                  "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  trend === "up" && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                  trend === "down" && "bg-destructive/10 text-destructive",
                  trend === "neutral" && "bg-muted text-muted-foreground",
                )}
              >
                <TrendArrow trend={trend} />
                {change}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
