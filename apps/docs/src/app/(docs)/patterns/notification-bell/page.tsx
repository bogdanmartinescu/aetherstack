"use client"

import { PatternPage } from "@/components/pattern-page"
import { NotificationBellPreview } from "./preview"

export default function NotificationBellPage() {
  return (
    <PatternPage
      name="Notification Bell"
      description="A bell icon with an unread count badge and a dropdown notification panel. Each entry shows a title, description, and relative timestamp. A mark-all-read action clears the badge."
      cliInstall="npx aether-ui add notification-bell"
      importCode={`import { NotificationBell } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { NotificationBell } from "@aetherstack/patterns"

const notifications = [
  {
    id: "1",
    title: "Deployment succeeded",
    description: "Production deploy v2.4.1 completed.",
    timestamp: new Date(),
    read: false,
  },
]

export function AppBell() {
  const [items, setItems] = React.useState(notifications)
  const unread = items.filter((n) => !n.read).length

  return (
    <NotificationBell
      count={unread}
      notifications={items}
      onMarkAllRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
      onNotificationClick={(id) =>
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      }
    />
  )
}`}
      preview={<NotificationBellPreview />}
      props={[
        { name: "count", type: "number", required: true, description: "Number shown in the badge. Hidden when 0." },
        { name: "notifications", type: "Notification[]", required: true, description: "Array of notification objects to render in the panel." },
        { name: "onMarkAllRead", type: "() => void", description: "Called when the user clicks \"Mark all as read\"." },
        { name: "onNotificationClick", type: "(id: string) => void", description: "Called when the user clicks an individual notification row." },
        { name: "className", type: "string", description: "Additional classes on the bell button." },
      ]}
      a11yNotes={[
        "Bell button uses aria-label=\"Notifications\" with aria-haspopup=\"true\".",
        "The unread badge is aria-hidden; the count is conveyed through the button's accessible label.",
        "Dropdown panel uses role=\"menu\"; each notification row has role=\"menuitem\".",
        "Escape closes the panel and returns focus to the trigger button.",
      ]}
    />
  )
}
