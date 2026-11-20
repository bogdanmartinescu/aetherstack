"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

export type UptimeStatus = "up" | "degraded" | "down" | "unknown"

export interface UptimeDay {
  id: string
  label: string
  status: UptimeStatus
}

export interface UptimeBarProps {
  days: readonly UptimeDay[]
  onSelect?: (id: string) => void
  className?: string
}

const TONES: Record<UptimeStatus, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-destructive",
  unknown: "bg-muted",
}

function uptimePercent(days: readonly UptimeDay[]): number {
  let known = 0
  let up = 0
  for (const day of days) {
    if (day.status === "unknown") continue
    known += 1
    if (day.status === "up") up += 1
  }
  if (known === 0) return 0
  return Math.round((up / known) * 100)
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function UptimeBar({ days, onSelect, className }: UptimeBarProps) {
  const [active, setActive] = React.useState(0)
  const optionRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const percent = uptimePercent(days)
  const tabStopIndex = days.length === 0 ? 0 : Math.min(active, days.length - 1)

  const focusOption = (index: number) => {
    optionRefs.current[index]?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (days.length === 0) return

    if (event.key === "ArrowRight") {
      event.preventDefault()
      const next = Math.min(index + 1, days.length - 1)
      if (next !== index) {
        setActive(next)
        focusOption(next)
      }
      return
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault()
      const next = Math.max(index - 1, 0)
      if (next !== index) {
        setActive(next)
        focusOption(next)
      }
      return
    }

    if (event.key === "Home") {
      event.preventDefault()
      setActive(0)
      focusOption(0)
      return
    }

    if (event.key === "End") {
      event.preventDefault()
      const last = days.length - 1
      setActive(last)
      focusOption(last)
      return
    }

    if ((event.key === "Enter" || event.key === " ") && onSelect) {
      event.preventDefault()
      const day = days[index]
      if (day) onSelect(day.id)
    }
  }

  return (
    <div
      role="listbox"
      aria-label={`${percent}% uptime`}
      className={cn(
        "border-border bg-background inline-flex w-full max-w-md gap-0.5 rounded-md border p-1",
        className,
      )}
    >
      {days.map((day, index) => (
        <button
          key={day.id}
          ref={(node) => {
            optionRefs.current[index] = node
          }}
          type="button"
          role="option"
          aria-label={`${day.label}, ${day.status}`}
          tabIndex={index === tabStopIndex ? 0 : -1}
          onFocus={() => setActive(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={cn(
            "h-8 min-w-0 flex-1 rounded-sm transition-colors",
            TONES[day.status],
            focusRing,
          )}
        />
      ))}
    </div>
  )
}
