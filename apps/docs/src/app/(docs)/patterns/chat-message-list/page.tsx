import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ChatMessageList } from "@aetherstack/patterns"

export const metadata: Metadata = {
  title: "Chat Message List",
  description: "A chat message list with user and assistant bubbles, avatars, and timestamps.",
}

const MESSAGES = [
  {
    id: "1",
    role: "user" as const,
    content: "Can you explain how the token system works in Aether UI?",
    timestamp: "9:00 AM",
    name: "Alice",
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "Sure! Tokens are design primitives — colours, spacing, radii — defined as CSS variables. Components reference these variables instead of hardcoded values, which is what makes theming work.",
    timestamp: "9:01 AM",
    name: "Aether AI",
  },
  {
    id: "3",
    role: "user" as const,
    content: "How do I override a token in my project?",
    timestamp: "9:02 AM",
    name: "Alice",
  },
  {
    id: "4",
    role: "assistant" as const,
    content: "Add a CSS rule in your global stylesheet that redefines the variable under the :root selector (or under .dark for dark-mode overrides). For example: --color-primary: oklch(55% 0.22 270);",
    timestamp: "9:03 AM",
    name: "Aether AI",
  },
]

export default function ChatMessageListPage() {
  return (
    <PatternPage
      name="Chat Message List"
      description="A chat message list with user and assistant bubbles, avatars, and timestamps. Alternates alignment based on the role field — user messages are right-aligned, assistant messages left."
      cliInstall="npx aether-ui add chat-message-list"
      importCode={`import { ChatMessageList } from "@aetherstack/patterns"`}
      usageCode={`import { ChatMessageList } from "@aetherstack/patterns"

const messages = [
  {
    id: "1",
    role: "user" as const,
    content: "What is Aether UI?",
    timestamp: new Date(),
    name: "Alice",
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "Aether UI is a premium open-code design system built on shadcn/ui primitives.",
    timestamp: new Date(),
    name: "Assistant",
  },
]

export function MyChatView() {
  return <ChatMessageList messages={messages} />
}`}
      preview={
        <div className="w-full max-w-lg">
          <ChatMessageList messages={MESSAGES} />
        </div>
      }
      props={[
        { name: "messages", type: "ChatMessage[]", required: true, description: "Array of message objects. Each has id, role (\"user\" | \"assistant\"), content, timestamp, and optional name and avatarUrl." },
        { name: "className", type: "string", description: "Additional classes on the list container." },
      ]}
      a11yNotes={[
        "The list renders as a <ul> with each message as a <li> in document order.",
        "Avatars use role=\"img\" with an aria-label of the sender's name.",
        "Timestamps use <time datetime> with a machine-readable ISO string.",
        "Message content is plain text; for markdown, pipe it through MarkdownRenderer.",
      ]}
    />
  )
}
