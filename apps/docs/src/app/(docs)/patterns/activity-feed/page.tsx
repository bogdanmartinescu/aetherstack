import type { Metadata } from "next"
import { ActivityFeed } from "@aetherstack/patterns"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Activity Feed",
  description: "Chronological activity timeline with user avatars, actions, and timestamps.",
}

const SAMPLE_ITEMS = [
  {
    id: "1",
    user: "Alice Martin",
    action: "deployed",
    target: "production v2.4.0",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "2",
    user: "Bob Chen",
    action: "opened pull request",
    target: "#142 Add dark mode",
    timestamp: new Date(Date.now() - 38 * 60 * 1000),
  },
  {
    id: "3",
    user: "Carol Kim",
    action: "closed issue",
    target: "#118 Login timeout bug",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "4",
    action: "Scheduled maintenance window",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
]

export default function ActivityFeedPage() {
  return (
    <PatternPage
      name="Activity Feed"
      description="A chronological timeline of events with user attribution, action descriptions, and relative timestamps. Renders an avatar (initials or custom icon) per entry."
      cliInstall="npx aether-ui add activity-feed"
      importCode={`import { ActivityFeed, ActivityItem } from "@aetherstack/patterns"`}
      usageCode={`import { ActivityFeed } from "@aetherstack/patterns"

const items = [
  {
    id: "1",
    user: "Alice Martin",
    action: "deployed",
    target: "production v2.4.0",
    timestamp: new Date(),
  },
  {
    id: "2",
    user: "Bob Chen",
    action: "opened pull request",
    target: "#142 Add dark mode",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
]

<ActivityFeed items={items} />`}
      preview={
        <div className="w-full max-w-md">
          <ActivityFeed items={SAMPLE_ITEMS} />
        </div>
      }
      props={[
        { name: "items", type: "ActivityEntry[]", required: true, description: "List of activity entries to render." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Rendered as a <ul role=\"list\"> with an aria-label for screen readers.",
        "Decorative connecting line and avatars are aria-hidden.",
        "Timestamps use human-readable relative text (e.g. \"5 minutes ago\").",
      ]}
    />
  )
}
