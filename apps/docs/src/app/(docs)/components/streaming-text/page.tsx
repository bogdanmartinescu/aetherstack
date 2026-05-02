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
          description: "Called when the stream finishes.",
        },
      ]}
      a11yNotes={[
        "Streamed content is rendered in a live region so screen readers announce updates.",
        "Use onComplete to signal when streaming has ended so assistive technology can summarise.",
      ]}
    />
  )
}
