"use client"

import { PatternPage } from "@/components/pattern-page"
import { ConversationThreadPreview } from "./preview"

export default function ConversationThreadPage() {
  return (
    <PatternPage
      name="Conversation Thread"
      description="A scrollable message thread that renders user and assistant messages. Supports an animated thinking indicator while the assistant is generating a response, and accepts a custom message renderer for full control over individual message appearance."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add conversation-thread"
      importCode={`import { ConversationThread } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { ConversationThread } from "@aetherstack/patterns"
import type { Message } from "@aetherstack/patterns"

const messages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What is React?",
    name: "You",
    timestamp: "2:40 PM",
  },
  {
    id: "2",
    role: "assistant",
    content: "React is a JavaScript library for building user interfaces.",
    name: "AI",
    timestamp: "2:40 PM",
  },
]

export function MyThread() {
  const [isThinking, setIsThinking] = React.useState(false)
  return (
    <ConversationThread messages={messages} isThinking={isThinking} />
  )
}`}
      preview={<ConversationThreadPreview />}
      props={[
        { name: "messages", type: "Message[]", required: true, description: "Array of message objects to display in the thread." },
        { name: "isThinking", type: "boolean", default: "false", description: "Shows an animated thinking indicator after the last message." },
        { name: "renderMessage", type: "(msg: Message) => ReactNode", description: "Custom renderer for individual message bubbles." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the thread container." },
      ]}
      a11yNotes={[
        "Messages are rendered as an ordered list so screen readers announce count and position.",
        "The thinking indicator uses aria-live='polite' to announce state changes without interrupting reading.",
        "Timestamps are wrapped in <time> elements with machine-readable datetime attributes.",
        "Avatar images include descriptive alt text derived from the message sender's name.",
      ]}
    />
  )
}
