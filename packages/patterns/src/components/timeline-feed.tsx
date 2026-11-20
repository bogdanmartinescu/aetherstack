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
        <div className="bg-border absolute bottom-0 left-3.5 top-7 w-px" aria-hidden="true" />
      )}

      <div
        className={cn(
          "border-border bg-background relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          item.iconClassName,
        )}
        aria-hidden="true"
      >
        {item.icon ?? <div className="bg-primary h-2 w-2 rounded-full" />}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5">
          <p className="text-foreground text-sm font-medium">{item.title}</p>
          <time className="text-muted-foreground shrink-0 text-xs">{item.timestamp}</time>
        </div>
        {item.description && (
          <p className="text-muted-foreground mt-0.5 text-sm">{item.description}</p>
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
