"use client"

import { PatternPage } from "@/components/pattern-page"
import { ModelSelectorPreview } from "./preview"

export default function ModelSelectorPage() {
  return (
    <PatternPage
      name="Model Selector"
      description="A dropdown component for selecting an AI model from a list. Models are grouped by provider and can display optional capability badges (e.g. vision, tools). Works as a controlled component via value and onValueChange."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add model-selector"
      importCode={`import { ModelSelector } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { ModelSelector } from "@aetherstack/patterns"

const models = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", capabilities: ["vision", "tools"] },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", capabilities: ["vision", "tools"] },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", capabilities: ["vision"] },
]

export function MyModelPicker() {
  const [model, setModel] = React.useState("gpt-4o")
  return (
    <ModelSelector
      models={models}
      value={model}
      onValueChange={setModel}
    />
  )
}`}
      preview={<ModelSelectorPreview />}
      props={[
        { name: "models", type: "Model[]", required: true, description: "List of available models. Each item requires id, name, and provider; capabilities is optional." },
        { name: "value", type: "string", description: "Controlled selected model ID." },
        { name: "onValueChange", type: "(id: string) => void", description: "Called when the user selects a different model." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the trigger button." },
      ]}
      a11yNotes={[
        "Built on the Select primitive — uses a native-accessible listbox role.",
        "Models are grouped by provider using optgroup-equivalent ARIA group roles.",
        "Capability badges are decorative and include aria-hidden to avoid redundant announcements.",
        "Keyboard users can open the list with Enter or Space and navigate with arrow keys.",
      ]}
    />
  )
}
