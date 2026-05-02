import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface TimelineEntry {
  id: string
  title: string
  description?: string
  timestamp: string
  icon?: React.ReactNode
  iconClassName?: string
}

export interface TimelineItemProps {
  item: TimelineEntry
  isLast?: boolean
  className?: string
}

export function TimelineItem({ item, isLast = false, className }: TimelineItemProps) {
  return (
    <li className={cn("relative flex gap-4", !isLast && "pb-6", className)}>
      {!isLast && (
        <div
          className="absolute bottom-0 left-3.5 top-7 w-px bg-border"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background",
          item.iconClassName,
        )}
        aria-hidden="true"
      >
        {item.icon ?? <div className="h-2 w-2 rounded-full bg-primary" />}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          <time className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</time>
        </div>
        {item.description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </li>
  )
}

export interface TimelineFeedProps {
  items: TimelineEntry[]
  className?: string
}

export function TimelineFeed({ items, className }: TimelineFeedProps) {
  return (
    <ol aria-label="Timeline" className={cn("relative", className)}>
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} isLast={index === items.length - 1} />
      ))}
    </ol>
  )
}
