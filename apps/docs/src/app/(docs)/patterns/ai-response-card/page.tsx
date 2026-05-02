import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { AIResponseCardPreview } from "./preview"

export const metadata: Metadata = {
  title: "AI Response Card",
  description: "A card component that displays an AI-generated response with copy, regenerate, and feedback actions.",
}

export default function AIResponseCardPage() {
  return (
    <PatternPage
      name="AI Response Card"
      description="A self-contained card that displays an AI-generated response. Includes a header with optional model badge and timestamp, action buttons for copying and regenerating, and thumbs up/down feedback. Supports a streaming cursor when isStreaming is true."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add ai-response-card"
      importCode={`import { AIResponseCard } from "@aetherstack/patterns"`}
      usageCode={`import { AIResponseCard } from "@aetherstack/patterns"

export function MyResponseCard() {
  return (
    <AIResponseCard
      content="React is a JavaScript library for building user interfaces."
      model="gpt-4o"
      timestamp="2:41 PM"
      onCopy={() => navigator.clipboard.writeText(content)}
      onRegenerate={() => regenerate()}
      feedbackProps={{
        onThumbsUp: () => submitFeedback("up"),
        onThumbsDown: () => submitFeedback("down"),
      }}
    />
  )
}`}
      preview={<AIResponseCardPreview />}
      props={[
        { name: "content", type: "string", required: true, description: "The response text content rendered inside the card." },
        { name: "isStreaming", type: "boolean", default: "false", description: "Shows an animated streaming cursor at the end of the content." },
        { name: "model", type: "string", description: "Model name shown as a badge in the card header." },
        { name: "timestamp", type: "string", description: "Timestamp string displayed in the card header." },
        { name: "onCopy", type: "() => void", description: "Callback for the copy button. When omitted, the button is not rendered." },
        { name: "onRegenerate", type: "() => void", description: "Callback for the regenerate button. When omitted, the button is not rendered." },
        { name: "feedbackProps", type: "{ onThumbsUp?: () => void; onThumbsDown?: () => void }", description: "Thumbs up/down feedback handlers. Buttons are rendered when handlers are provided." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the card root." },
      ]}
      a11yNotes={[
        "Copy and regenerate buttons include descriptive aria-label attributes.",
        "Feedback buttons use aria-pressed to convey toggled state to screen readers.",
        "The streaming cursor is hidden from assistive technology with aria-hidden.",
      ]}
    />
  )
}
