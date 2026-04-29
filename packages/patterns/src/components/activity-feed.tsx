import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ActivityEntry {
  id: string
  user?: string
  action: string
  target?: string
  timestamp: Date | string
  icon?: React.ReactNode
}

export interface ActivityItemProps {
  item: ActivityEntry
  className?: string
}

export interface ActivityFeedProps {
  items: ActivityEntry[]
  className?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatRelativeTime(timestamp: Date | string): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
  const now = Date.now()
  const diffMs = now - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return "just now"
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
}

// ── ActivityItem ──────────────────────────────────────────────────────────────

export function ActivityItem({ item, className }: ActivityItemProps) {
  return (
    <li className={cn("relative flex gap-3 pl-8 pb-6 last:pb-0", className)}>
      {/* Avatar / icon */}
      <div className="absolute left-0 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-background">
        {item.icon ? (
          item.icon
        ) : item.user ? (
          getInitials(item.user)
        ) : (
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          {item.user && (
            <span className="font-medium">{item.user} </span>
          )}
          <span>{item.action}</span>
          {item.target && (
            <span className="font-medium"> {item.target}</span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatRelativeTime(item.timestamp)}
        </p>
      </div>
    </li>
  )
}

// ── ActivityFeed ──────────────────────────────────────────────────────────────

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical connecting line */}
      <div
        className="absolute left-3.5 top-0 h-full w-px bg-border"
        aria-hidden="true"
      />
      <ul className="space-y-0" role="list" aria-label="Activity feed">
        {items.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}
