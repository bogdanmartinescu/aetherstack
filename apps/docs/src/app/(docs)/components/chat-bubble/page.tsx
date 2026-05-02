import type { Metadata } from "next"
import { ChatBubble } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "ChatBubble",
  description: "A single message bubble for AI chat UIs, aligned left for assistant messages and right for user messages.",
}

export default function ChatBubblePage() {
  return (
    <PatternPage
      name="ChatBubble"
      description="A single message bubble for AI chat UIs, aligned left for assistant messages and right for user messages."
      packageName="@aetherstack/ui"
      preview={
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <ChatBubble
            role="user"
            content="How do I center a div in CSS?"
            name="You"
            timestamp="2:41 PM"
          />
          <ChatBubble
            role="assistant"
            content="You can use flexbox: set the parent to display: flex; justify-content: center; align-items: center."
            name="AI"
            timestamp="2:41 PM"
          />
        </div>
      }
      importCode={`import { ChatBubble } from "@aetherstack/ui"`}
      usageCode={`<ChatBubble
  role="user"
  content="How do I center a div?"
  name="You"
  timestamp="2:41 PM"
/>

<ChatBubble
  role="assistant"
  content="Use display: flex with justify-content and align-items set to center."
  name="AI"
  timestamp="2:41 PM"
/>`}
      cliInstall="npx aether-ui add chat-bubble"
      props={[
        {
          name: "role",
          type: '"user" | "assistant" | "system"',
          description: "Determines bubble alignment (user = right, assistant/system = left) and background color.",
          required: true,
        },
        {
          name: "content",
          type: "React.ReactNode",
          description: "Message content — can be a string, MarkdownRenderer, or any React node.",
          required: true,
        },
        {
          name: "avatarUrl",
          type: "string",
          description: "Custom avatar image URL shown beside the bubble.",
        },
        {
          name: "name",
          type: "string",
          description: "Sender name shown above the bubble.",
        },
        {
          name: "timestamp",
          type: "string",
          description: "Timestamp string shown beside the sender name.",
        },
        {
          name: "actions",
          type: "React.ReactNode",
          description: "Action buttons (e.g. FeedbackButtons, copy) rendered below the bubble.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Each bubble is wrapped in an article element with an appropriate aria-label containing the sender name.",
        "User and assistant bubbles are visually differentiated by alignment and color — not color alone.",
      ]}
    />
  )
}
