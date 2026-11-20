import { cn } from "@aetherstack/utils"

const LABELS = {
  idle: "Idle",
  busy: "Busy",
  blocked: "Blocked",
  failed: "Failed",
  finished: "Finished",
} as const

const TONES = {
  idle: "bg-muted-foreground",
  busy: "bg-primary",
  blocked: "bg-amber-500",
  failed: "bg-destructive",
  finished: "bg-emerald-500",
} as const

export type StatusDotStatus = keyof typeof LABELS

export interface StatusDotProps {
  status: StatusDotStatus
  label?: string
  pulse?: boolean
  className?: string
}

export function StatusDot({ status, label, pulse, className }: StatusDotProps) {
  const text = label ?? LABELS[status]
  const shouldPulse = pulse ?? status === "busy"
  return (
    <span role="img" aria-label={text} className={cn("inline-flex", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full",
          TONES[status],
          shouldPulse && "motion-safe:animate-pulse",
        )}
      />
    </span>
  )
}