import { cn } from "@aetherstack/utils"

const LABELS = {
  none: "No priority",
  low: "Low priority",
  medium: "Medium priority",
  high: "High priority",
  urgent: "Urgent priority",
} as const

const FILLED_COUNT = {
  none: 0,
  low: 1,
  medium: 2,
  high: 3,
  urgent: 0,
} as const

export type PriorityBarsPriority = keyof typeof LABELS

export interface PriorityBarsProps {
  priority: PriorityBarsPriority
  decorative?: boolean
  className?: string
}

export function PriorityBars({ priority, decorative, className }: PriorityBarsProps) {
  const label = LABELS[priority]
  const isUrgent = priority === "urgent"
  const filled = FILLED_COUNT[priority]

  return (
    <span
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": label })}
      {...(isUrgent ? { "data-urgent": "true" } : {})}
      className={cn("inline-flex items-end gap-0.5", className)}
    >
      {isUrgent ? (
        <span
          aria-hidden="true"
          className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-destructive text-[10px] font-bold leading-none text-destructive-foreground"
        >
          !
        </span>
      ) : (
        (["h-2", "h-2.5", "h-3"] as const).map((height, index) => (
          <span
            key={index}
            aria-hidden="true"
            data-filled={index < filled ? "true" : "false"}
            className={cn(
              "w-1 rounded-sm",
              height,
              index < filled ? "bg-primary" : "bg-muted",
            )}
          />
        ))
      )}
    </span>
  )
}