import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { StreamingTextPreview } from "./preview"

export const metadata: Metadata = {
  title: "StreamingText",
  description: "Renders a string or async token stream character by character, ideal for AI response streaming.",
}

export default function StreamingTextPage() {
  return (
    <PatternPage
      name="StreamingText"
      description="Renders a string or async token stream character by character, ideal for AI response streaming."
      packageName="@aetherstack/ui"
      preview={<StreamingTextPreview />}
      importCode={`import { StreamingText } from "@aetherstack/ui"`}
      usageCode={`async function* makeStream() {
  const tokens = ["Hello", ", ", "world", "!"]
  for (const token of tokens) {
    await new Promise(r => setTimeout(r, 100))
    yield token
  }
}

<StreamingText content={makeStream()} onComplete={() => console.log("done")} />`}
      cliInstall="npx aether-ui add streaming-text"
      props={[
        {
          name: "content",
          type: "string | AsyncIterable<string>",
          description: "The text or stream to render.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
        {
          name: "onComplete",
          type: "() => void",
          description: "Called once when an AsyncIterable finishes. Safe to pass an inline function.",
        },
        {
          name: "onError",
          type: "(error: unknown) => void",
          description: "Called if the AsyncIterable throws. Text received so far is kept.",
        },
        {
          name: "showCursor",
          type: "boolean",
          default: "true",
          description: "Shows the blinking caret while streaming.",
        },
      ]}
      a11yNotes={[
        "The element is marked aria-busy while streaming; the caret is aria-hidden.",
        "Token-by-token updates are deliberately not a live region. Announce the finished message from onComplete if needed.",
        "The caret animation is disabled when the user prefers reduced motion.",
      ]}
    />
  )
}
