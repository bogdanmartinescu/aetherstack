"use client"

import { PatternPage } from "@/components/pattern-page"
import { PromptSuggestionPreview } from "./preview"

export default function PromptSuggestionPage() {
  return (
    <PatternPage
      name="PromptSuggestion"
      description="A pill-shaped suggestion chip that populates the prompt input when clicked — ideal for empty-state starter prompts."
      packageName="@aetherstack/ui"
      preview={<PromptSuggestionPreview />}
      importCode={`import { PromptSuggestion } from "@aetherstack/ui"`}
      usageCode={`import { Sparkles } from "lucide-react"

<PromptSuggestion
  label="Brainstorm ideas"
  icon={<Sparkles className="h-3.5 w-3.5" />}
  onClick={() => setValue("Brainstorm ideas for my project")}
/>`}
      cliInstall="npx aether-ui add prompt-suggestion"
      props={[
        {
          name: "label",
          type: "string",
          description: "Button label text.",
          required: true,
        },
        {
          name: "icon",
          type: "React.ReactNode",
          description: "Optional icon rendered before the label.",
        },
        {
          name: "onClick",
          type: "() => void",
          description: "Click handler — typically sets the prompt input value.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
    />
  )
}
