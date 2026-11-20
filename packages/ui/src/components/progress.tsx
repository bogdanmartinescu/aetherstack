"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@aetherstack/utils"

export interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, indicatorClassName, value, max = 100, ...props }, ref) => {
    const safeMax = max > 0 ? max : 100
    const clamped = value == null ? null : Math.min(Math.max(value, 0), safeMax)
    const percent = clamped == null ? 0 : (clamped / safeMax) * 100

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={clamped}
        max={safeMax}
        className={cn("bg-secondary relative h-2 w-full overflow-hidden rounded-full", className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "bg-primary h-full w-full flex-1 transition-transform duration-300 ease-out motion-reduce:transition-none",
            indicatorClassName,
          )}
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  },
)
Progress.displayName = "Progress"

export interface ProgressRingProps {
  value?: number
  max?: number
  indeterminate?: boolean
  "aria-label": string
  className?: string
}

const RING_RADIUS = 15.9155
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ProgressRing({
  value,
  max,
  indeterminate,
  "aria-label": ariaLabel,
  className,
}: ProgressRingProps) {
  const safeMax = max == null || max <= 0 ? 100 : max
  const clamped =
    indeterminate || typeof value !== "number" ? null : Math.min(Math.max(value, 0), safeMax)
  const percent = clamped == null ? 0 : (clamped / safeMax) * 100
  const dashOffset = RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE

  const ariaNow =
    indeterminate !== true && typeof value === "number"
      ? Math.min(Math.max(value, 0), safeMax)
      : undefined

  return (
    <svg
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      {...(ariaNow !== undefined ? { "aria-valuenow": ariaNow } : {})}
      viewBox="0 0 36 36"
      className={cn("h-10 w-10", indeterminate && "motion-safe:animate-spin", className)}
    >
      <circle className="stroke-muted fill-none" cx="18" cy="18" r={RING_RADIUS} strokeWidth="3" />
      <circle
        className="stroke-primary fill-none"
        cx="18"
        cy="18"
        r={RING_RADIUS}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={
          indeterminate
            ? `${RING_CIRCUMFERENCE * 0.25} ${RING_CIRCUMFERENCE}`
            : String(RING_CIRCUMFERENCE)
        }
        strokeDashoffset={indeterminate ? 0 : dashOffset}
        transform="rotate(-90 18 18)"
      />
    </svg>
  )
}

export { Progress, ProgressRing }
