"use client"

import { cn } from "@aetherstack/utils"
import { Button, Progress } from "@aetherstack/ui"

export interface BillingPlan {
  name: string
  price: string
  period: string
  features: string[]
}

export interface UsageMetric {
  label: string
  used: number
  limit: number
  unit?: string
}

export interface BillingOverviewProps {
  plan?: BillingPlan
  usage?: UsageMetric[]
  nextBillingDate?: string
  onUpgrade?: () => void
  onManageBilling?: () => void
  className?: string
}

const DEFAULT_PLAN: BillingPlan = {
  name: "Free",
  price: "$0",
  period: "month",
  features: ["Up to 3 projects", "1 team member", "Community support"],
}

export function BillingOverview({
  plan = DEFAULT_PLAN,
  usage = [],
  nextBillingDate,
  onUpgrade,
  onManageBilling,
  className,
}: BillingOverviewProps) {
  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Current plan card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current plan
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">
              {plan.name}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              <span className="text-xl font-semibold text-foreground">
                {plan.price}
              </span>
              &nbsp;/ {plan.period}
            </p>
          </div>
          {onUpgrade && (
            <Button size="sm" onClick={onUpgrade} className="shrink-0">
              Upgrade plan
            </Button>
          )}
        </div>

        {/* Features */}
        {plan.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary shrink-0"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Usage meters */}
      {usage.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Usage</h3>
          <div className="space-y-4">
            {usage.map((metric) => {
              const pct = metric.limit > 0
                ? Math.min(100, Math.round((metric.used / metric.limit) * 100))
                : 0
              const isNearLimit = pct >= 80
              return (
                <div key={metric.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {metric.label}
                    </span>
                    <span className={cn("text-muted-foreground", isNearLimit && "text-destructive font-medium")}>
                      {metric.used.toLocaleString()}
                      {metric.unit ? ` ${metric.unit}` : ""} /{" "}
                      {metric.limit.toLocaleString()}
                      {metric.unit ? ` ${metric.unit}` : ""}
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    className={cn("h-2", isNearLimit && "[&>div]:bg-destructive")}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer: next billing + manage button */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-4 shadow-sm">
        {nextBillingDate ? (
          <p className="text-sm text-muted-foreground">
            Next billing date:{" "}
            <span className="font-medium text-foreground">{nextBillingDate}</span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming charges.</p>
        )}
        {onManageBilling && (
          <Button variant="outline" size="sm" onClick={onManageBilling}>
            Manage billing
          </Button>
        )}
      </div>
    </div>
  )
}
