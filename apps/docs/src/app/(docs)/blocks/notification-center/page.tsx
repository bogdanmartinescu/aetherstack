import type { Metadata } from "next"
import { NotificationCenter } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Notification Center",
  description: "Notification list with read/unread state, mark-all-read, and dismiss actions.",
}

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Deployment succeeded",
    description: "Production v2.4.0 is live.",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: "success" as const,
    read: false,
  },
  {
    id: "2",
    title: "High memory usage",
    description: "Server memory exceeded 80% for 5 minutes.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: "warning" as const,
    read: false,
  },
  {
    id: "3",
    title: "New team member",
    description: "Bob Chen joined the workspace.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: "info" as const,
    read: true,
  },
  {
    id: "4",
    title: "Payment failed",
    description: "Your card ending in 4242 was declined.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "error" as const,
    read: true,
  },
]

export default function NotificationCenterPage() {
  return (
    <BlockPage
      name="Notification Center"
      category="Feedback"
      description="A notification feed with read/unread state, per-type icons (info, success, warning, error), mark-as-read, mark-all-read, and dismiss actions."
      cliInstall="npx aether-ui add notification-center"
      previewHeight="480px"
      importCode={`import { NotificationCenter } from "@aetherstack/blocks"`}
      usageCode={`import { NotificationCenter } from "@aetherstack/blocks"
import type { NotificationEntry } from "@aetherstack/blocks"

const notifications: NotificationEntry[] = [
  {
    id: "1",
    title: "Deployment succeeded",
    description: "Production v2.4.0 is live.",
    timestamp: new Date(),
    type: "success",
    read: false,
  },
]

export default function NotificationsPage() {
  return (
    <NotificationCenter
      notifications={notifications}
      onMarkRead={(id) => markRead(id)}
      onMarkAllRead={() => markAllRead()}
      onDismiss={(id) => dismiss(id)}
    />
  )
}`}
      preview={
        <div className="p-6">
          <NotificationCenter notifications={NOTIFICATIONS} />
        </div>
      }
      props={[
        { name: "notifications", type: "NotificationEntry[]", description: "List of notifications. Each has id, title, optional description, timestamp, read state, and type." },
        { name: "onMarkRead", type: "(id: string) => void", description: "Called when the user marks a single notification as read." },
        { name: "onMarkAllRead", type: "() => void", description: "Called when the user clicks 'Mark all read'." },
        { name: "onDismiss", type: "(id: string) => void", description: "Called when the user dismisses a notification." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Unread notifications are visually distinguished with a dot indicator and background tint.",
        "Each action button (mark read, dismiss) has an aria-label describing its target notification.",
        "Timestamps use human-readable relative text (e.g. \"3 min ago\").",
      ]}
    />
  )
}
