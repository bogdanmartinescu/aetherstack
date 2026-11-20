import { cn } from "@aetherstack/utils"
import { Progress } from "../progress"

interface TokenCounterProps {
  used: number
  max: number
  label?: string
  /** Fraction of `max` (0–1) at which the counter turns to a warning colour. Defaults to 0.8. */
  warnAt?: number
  className?: string
}

function TokenCounter({
  used,
  max,
  label = "Context window",
  warnAt = 0.8,
  className,
}: TokenCounterProps) {
  const ratio = max > 0 ? used / max : 0
  const percentage = Math.min(Math.max(ratio * 100, 0), 100)
  const level = ratio >= 1 ? "critical" : ratio >= warnAt ? "warning" : "normal"

  return (
    <div data-level={level} className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={cn(
            "font-mono tabular-nums",
            level === "critical" && "text-destructive",
            level === "warning" && "text-amber-600 dark:text-amber-400",
            level === "normal" && "text-muted-foreground",
          )}
        >
          {used.toLocaleString()} / {max.toLocaleString()} tokens
        </span>
      </div>
      <Progress
        value={percentage}
        aria-label={label}
        getValueLabel={() => `${used.toLocaleString()} of ${max.toLocaleString()} tokens used`}
        className="h-1.5"
        indicatorClassName={cn(
          level === "critical" && "bg-destructive",
          level === "warning" && "bg-amber-500",
        )}
      />
    </div>
  )
}

export { TokenCounter }
export type { TokenCounterProps }
