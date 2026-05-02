"use client"

import { PatternPage } from "@/components/pattern-page"
import { AISettingsPanelPreview } from "./preview"

export default function AISettingsPanelPage() {
  return (
    <PatternPage
      name="AI Settings Panel"
      description="A settings panel for controlling AI generation parameters. Provides sliders and inputs for temperature (0–2), max output tokens, and a system prompt textarea. All fields are fully controlled — wire them to your AI SDK configuration."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add ai-settings-panel"
      importCode={`import { AISettingsPanel } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { AISettingsPanel } from "@aetherstack/patterns"

export function MySettings() {
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(2048)
  const [systemPrompt, setSystemPrompt] = React.useState(
    "You are a helpful assistant."
  )

  return (
    <AISettingsPanel
      temperature={temperature}
      onTemperatureChange={setTemperature}
      maxTokens={maxTokens}
      onMaxTokensChange={setMaxTokens}
      systemPrompt={systemPrompt}
      onSystemPromptChange={setSystemPrompt}
    />
  )
}`}
      preview={<AISettingsPanelPreview />}
      props={[
        { name: "temperature", type: "number", default: "0.7", description: "Sampling temperature between 0 and 2. Lower values produce more deterministic output." },
        { name: "onTemperatureChange", type: "(v: number) => void", description: "Called with the new temperature value when the slider changes." },
        { name: "maxTokens", type: "number", default: "2048", description: "Maximum number of output tokens to generate." },
        { name: "onMaxTokensChange", type: "(v: number) => void", description: "Called with the new max tokens value when the input changes." },
        { name: "systemPrompt", type: "string", default: '""', description: "System prompt text shown in the textarea." },
        { name: "onSystemPromptChange", type: "(v: string) => void", description: "Called with the updated system prompt string on every keystroke." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the panel container." },
      ]}
      a11yNotes={[
        "Each control has an associated <label> with a for/id pairing.",
        "Temperature slider includes aria-valuemin, aria-valuemax, and aria-valuenow attributes.",
        "The system prompt textarea has a descriptive placeholder and aria-describedby linking to a helper hint.",
      ]}
    />
  )
}
