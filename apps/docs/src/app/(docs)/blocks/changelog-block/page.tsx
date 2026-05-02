import type { Metadata } from "next"
import { ChangelogBlock } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Changelog Block",
  description: "A release notes feed with version, date, title, tags, and grouped change lists.",
}

export default function ChangelogBlockPage() {
  return (
    <BlockPage
      name="Changelog Block"
      category="User & content"
      description="A release notes timeline with version badge, date, title, optional description, tags, and grouped change lists (added, changed, fixed, removed). Renders as a vertical timeline with connecting lines."
      cliInstall="npx aether-ui add changelog-block"
      previewScale={0.85}
      previewHeight="560px"
      importCode={`import { ChangelogBlock } from "@aetherstack/blocks"
import type { ChangelogEntry } from "@aetherstack/blocks"`}
      usageCode={`import { ChangelogBlock } from "@aetherstack/blocks"

const entries = [
  {
    id: "v0.2.0",
    version: "0.2.0",
    date: "May 2026",
    title: "AI-native UI components",
    tags: ["major"],
    changes: [
      {
        type: "added" as const,
        items: ["StreamingText", "PromptInput", "ChatBubble", "CodeBlock"],
      },
    ],
  },
]

export default function ChangelogPage() {
  return <ChangelogBlock entries={entries} />
}`}
      preview={
        <ChangelogBlock
          entries={[
            {
              id: "v0.2.0",
              version: "0.2.0",
              date: "May 2026",
              title: "AI-native UI components",
              description: "Introducing 33 new AI-native UI components across primitives, patterns, and blocks.",
              tags: ["major"],
              changes: [
                {
                  type: "added",
                  items: [
                    "StreamingText — token-by-token text renderer with blinking cursor",
                    "PromptInput — auto-growing textarea with send button and file slot",
                    "ChatBubble — user and assistant message bubbles with avatar",
                    "ConversationThread — scrollable message list with streaming support",
                  ],
                },
              ],
            },
            {
              id: "v0.1.1",
              version: "0.1.1",
              date: "April 2026",
              title: "Marketing block improvements",
              tags: ["patch"],
              changes: [
                {
                  type: "fixed",
                  items: [
                    "CTASection primary variant contrast ratio now meets WCAG AA",
                    "FooterSection mobile grid overflow on narrow viewports",
                  ],
                },
                {
                  type: "changed",
                  items: [
                    "LandingHero eyebrow now uses Badge component for consistency",
                  ],
                },
              ],
            },
          ]}
        />
      }
      props={[
        { name: "entries", type: "ChangelogEntry[]", required: true, description: "Array of changelog entries. Each has id, date, and title. Optional: version, description, tags, changes." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Dates are wrapped in a <time> element.",
        "Change type badges (Added, Fixed, etc.) are rendered as visible Badge components.",
        "The timeline is a visual aid — screen readers read entries in document order.",
      ]}
    />
  )
}
