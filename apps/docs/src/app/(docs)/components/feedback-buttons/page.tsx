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
      cliInstall="npx @aetherstack/cli add feedback-buttons"
      props={[
        {
          name: "value",
          type: '"up" | "down" | null',
          description: "Controlled selection. Omit to use the component uncontrolled.",
        },
        {
          name: "defaultValue",
          type: '"up" | "down" | null',
          default: "null",
          description: "Initial selection when uncontrolled.",
        },
        {
          name: "onValueChange",
          type: '(value: "up" | "down" | null) => void',
          description: "Called on every change, including null when the selection is cleared.",
        },
        {
          name: "onThumbsUp",
          type: "() => void",
          description: "Called when thumbs up becomes selected.",
        },
        {
          name: "onThumbsDown",
          type: "() => void",
          description: "Called when thumbs down becomes selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables both buttons.",
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
        "Users can switch their vote or click the selected button again to clear it.",
        "Buttons are wrapped in role='group' labelled 'Response feedback'.",
      ]}
    />
  )
}
