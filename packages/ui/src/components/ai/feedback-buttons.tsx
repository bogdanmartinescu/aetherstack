"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@aetherstack/utils"

type FeedbackValue = "up" | "down" | null

interface FeedbackButtonsProps {
  /** Controlled selection. Omit to let the component manage its own state. */
  value?: FeedbackValue
  defaultValue?: FeedbackValue
  /** Fires on every change, including `null` when a selection is cleared. */
  onValueChange?: (value: FeedbackValue) => void
  /** Fires when thumbs up becomes selected. */
  onThumbsUp?: () => void
  /** Fires when thumbs down becomes selected. */
  onThumbsDown?: () => void
  disabled?: boolean
  className?: string
}

const feedbackButtonClassName = cn(
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
  "ring-offset-background hover:bg-accent hover:text-accent-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "disabled:pointer-events-none disabled:opacity-40",
)

function FeedbackButtons({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  onThumbsUp,
  onThumbsDown,
  disabled = false,
  className,
}: FeedbackButtonsProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState<FeedbackValue>(defaultValue)
  const selected = isControlled ? valueProp : internalValue

  function select(option: "up" | "down") {
    const next = selected === option ? null : option
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
    if (next === "up") onThumbsUp?.()
    if (next === "down") onThumbsDown?.()
  }

  return (
    <div role="group" aria-label="Response feedback" className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={() => select("up")}
        disabled={disabled}
        aria-label="Thumbs up"
        aria-pressed={selected === "up"}
        className={cn(feedbackButtonClassName, selected === "up" && "text-primary")}
      >
        <ThumbsUp
          className="h-4 w-4"
          fill={selected === "up" ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        onClick={() => select("down")}
        disabled={disabled}
        aria-label="Thumbs down"
        aria-pressed={selected === "down"}
        className={cn(feedbackButtonClassName, selected === "down" && "text-destructive")}
      >
        <ThumbsDown
          className="h-4 w-4"
          fill={selected === "down" ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export { FeedbackButtons }
export type { FeedbackButtonsProps, FeedbackValue }
