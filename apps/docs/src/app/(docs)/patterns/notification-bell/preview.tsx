"use client"

import * as React from "react"
import { NotificationBell } from "@aetherstack/patterns"

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New comment on your post",
    description: 'Alice replied: "Great write-up!"',
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Deployment succeeded",
    description: "Production deploy v2.4.1 completed in 43 s.",
    timestamp: "30 minutes ago",
    read: false,
  },
  {
    id: "3",
    title: "Team invitation accepted",
    description: "Bob joined the Aetherstack workspace.",
    timestamp: "1 hour ago",
    read: true,
  },
]

export function NotificationBellPreview() {
  const [notifications, setNotifications] = React.useState(NOTIFICATIONS)
  const unread = notifications.filter((n) => !n.read).length

  function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function handleNotificationClick(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }

  return (
    <NotificationBell
      count={unread}
      notifications={notifications}
      onMarkAllRead={handleMarkAllRead}
      onNotificationClick={handleNotificationClick}
    />
  )
}
