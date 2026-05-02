import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { FeedbackButtonsPreview } from "./preview"

export const metadata: Metadata = {
  title: "FeedbackButtons",
  description: "Thumbs up / thumbs down buttons for collecting inline feedback on AI responses.",
}

export default function FeedbackButtonsPage() {
  return (
    <PatternPage
      name="FeedbackButtons"
      description="Thumbs up / thumbs down buttons for collecting inline feedback on AI responses."
      packageName="@aetherstack/ui"
      preview={<FeedbackButtonsPreview />}
      importCode={`import { FeedbackButtons } from "@aetherstack/ui"`}
      usageCode={`<FeedbackButtons
  onThumbsUp={() => submitFeedback("positive")}
  onThumbsDown={() => submitFeedback("negative")}
/>`}
      cliInstall="npx aether-ui add feedback-buttons"
      props={[
        {
          name: "onThumbsUp",
          type: "() => void",
          description: "Called when the thumbs up button is clicked.",
        },
        {
          name: "onThumbsDown",
          type: "() => void",
          description: "Called when the thumbs down button is clicked.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Each button has an aria-label ('Thumbs up' / 'Thumbs down') for screen reader clarity.",
        "Active state is communicated via aria-pressed so assistive technology reflects the selection.",
      ]}
    />
  )
}
