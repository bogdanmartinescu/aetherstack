"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface FeedbackButtonsProps {
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  className?: string
}

function FeedbackButtons({ onThumbsUp, onThumbsDown, className }: FeedbackButtonsProps) {
  const [selected, setSelected] = React.useState<"up" | "down" | null>(null)

  function handleUp() {
    setSelected("up")
    onThumbsUp?.()
  }

  function handleDown() {
    setSelected("down")
    onThumbsDown?.()
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={handleUp}
        disabled={selected === "down"}
        aria-label="Thumbs up"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
          selected === "up" && "text-primary",
        )}
      >
        <ThumbsUp className="h-4 w-4" fill={selected === "up" ? "currentColor" : "none"} />
      </button>
      <button
        onClick={handleDown}
        disabled={selected === "up"}
        aria-label="Thumbs down"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40",
          selected === "down" && "text-destructive",
        )}
      >
        <ThumbsDown className="h-4 w-4" fill={selected === "down" ? "currentColor" : "none"} />
      </button>
    </div>
  )
}

export { FeedbackButtons }
