import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { TimelineFeed } from "@aetherstack/patterns"
import { Rocket, GitMerge, Tag, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Timeline Feed",
  description: "A vertical timeline with date markers and event entries.",
}

const ITEMS = [
  {
    id: "1",
    title: "v0.2.0 released",
    description: "Added 12 new patterns and AI-native UI primitives.",
    timestamp: "Mar 15, 2024",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Phase 7 merged",
    description: "Public registry hardened; all packages published to npm.",
    timestamp: "Mar 14, 2024",
    icon: <GitMerge className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "1,000 stars on GitHub",
    description: "Thank you to everyone who starred the repository!",
    timestamp: "Mar 10, 2024",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "4",
    title: "Initial launch",
    description: "Aether UI publicly launched with 16 primitives and 12 patterns.",
    timestamp: "Feb 28, 2024",
    icon: <Rocket className="h-4 w-4" />,
  },
]

export default function TimelineFeedPage() {
  return (
    <PatternPage
      name="Timeline Feed"
      description="A vertical timeline with date markers and event entries. Items are grouped by date automatically; each entry renders an icon, title, description, and relative timestamp."
      cliInstall="npx aether-ui add timeline-feed"
      importCode={`import { TimelineFeed } from "@aetherstack/patterns"`}
      usageCode={`import { TimelineFeed } from "@aetherstack/patterns"
import { Rocket } from "lucide-react"

const items = [
  {
    id: "1",
    title: "Initial launch",
    description: "Aether UI publicly launched.",
    timestamp: new Date(2024, 1, 28, 12, 0),
    icon: <Rocket className="h-4 w-4" />,
  },
]

export function MyTimeline() {
  return <TimelineFeed items={items} />
}`}
      preview={
        <div className="w-full max-w-md">
          <TimelineFeed items={ITEMS} />
        </div>
      }
      props={[
        { name: "items", type: "TimelineItem[]", required: true, description: "Array of timeline entries. Each has id, title, description, timestamp, and an optional icon ReactNode." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Rendered as a <ol> (ordered list) since timeline events have inherent chronological order.",
        "Date markers use <time datetime> with machine-readable ISO strings.",
        "Icons are aria-hidden — event titles are the primary accessible label for each entry.",
        "Relative timestamps (\"2 days ago\") include a visually-hidden absolute date for screen readers.",
      ]}
    />
  )
}
