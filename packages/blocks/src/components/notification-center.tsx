"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button, Badge } from "@aetherstack/ui"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface NotificationEntry {
  id: string
  title: string
  description?: string
  timestamp: Date | string
  read?: boolean
  icon?: React.ReactNode
  type?: NotificationType
}

export interface NotificationCenterProps {
  notifications?: NotificationEntry[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onDismiss?: (id: string) => void
  className?: string
}

function relativeTime(timestamp: Date | string): string {
  const now = Date.now()
  const ts = typeof timestamp === "string" ? new Date(timestamp).getTime() : timestamp.getTime()
  const diffMs = now - ts
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  if (diffSec < 60) return "just now"
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHr < 24) return `${diffHr} hr ago`
  return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`
}

const TYPE_ICONS: Record<NotificationType, React.ReactNode> = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500" aria-hidden>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />
    </svg>
  ),
}

/** A single notification row, exported for external composition */
export function NotificationItem({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: NotificationEntry
  onMarkRead?: (id: string) => void
  onDismiss?: (id: string) => void
}) {
  const typeIcon = notification.icon ?? (notification.type ? TYPE_ICONS[notification.type] : TYPE_ICONS.info)

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors",
        !notification.read && "bg-primary/5",
        "hover:bg-muted/50",
      )}
    >
      {/* Type icon */}
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
        {typeIcon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-snug",
            notification.read ? "font-normal text-muted-foreground" : "font-medium text-foreground",
          )}
        >
          {notification.title}
        </p>
        {notification.description && (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {notification.description}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground/60">
          {relativeTime(notification.timestamp)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!notification.read && onMarkRead && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground focus-visible:outline-none"
            aria-label="Mark as read"
            title="Mark as read"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={() => onDismiss(notification.id)}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-destructive focus-visible:outline-none"
            aria-label="Dismiss notification"
            title="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export function NotificationCenter({
  notifications = [],
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs tabular-nums">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && onMarkAllRead && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={onMarkAllRead}
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-muted-foreground/40" aria-hidden>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p className="text-sm font-medium text-muted-foreground">All caught up</p>
          <p className="mt-1 text-xs text-muted-foreground/60">No new notifications.</p>
        </div>
      ) : (
        <div className="divide-y divide-border/50 p-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              {...(onMarkRead && { onMarkRead })}
              {...(onDismiss && { onDismiss })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
