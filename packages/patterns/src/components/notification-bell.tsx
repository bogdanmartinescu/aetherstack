"use client"

import { Bell } from "lucide-react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
} from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp?: string
  read?: boolean
}

export interface NotificationBellProps {
  count?: number
  notifications?: NotificationItem[]
  onMarkAllRead?: () => void
  onNotificationClick?: (id: string) => void
  className?: string
}

export function NotificationBell({
  count = 0,
  notifications = [],
  onMarkAllRead,
  onNotificationClick,
  className,
}: NotificationBellProps) {
  const displayCount = count > 99 ? "99+" : count > 0 ? String(count) : null
  const hasUnread = notifications.some((n) => !n.read)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={count > 0 ? `${count} unread notifications` : "Notifications"}
          className={cn("relative", className)}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {displayCount && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground"
            >
              {displayCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="p-0 font-semibold">Notifications</DropdownMenuLabel>
          {onMarkAllRead && hasUnread && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="rounded text-xs text-muted-foreground underline-offset-2 hover:underline focus:outline-none focus:ring-1 focus:ring-ring"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No notifications</p>
        ) : (
          <ScrollArea className="max-h-72">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => onNotificationClick?.(notification.id)}
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-0.5 px-3 py-2.5 focus:bg-accent",
                  !notification.read && "bg-accent/40",
                )}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-tight">{notification.title}</span>
                  {!notification.read && (
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
                    />
                  )}
                </div>
                {notification.description && (
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    {notification.description}
                  </span>
                )}
                {notification.timestamp && (
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                )}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
