"use client"

import { BlockPage } from "@/components/block-page"
import { AISettingsPreview } from "./preview"

export default function AISettingsPage() {
  return (
    <BlockPage
      name="AI Settings"
      category="AI"
      description="A fully controlled settings panel with three cards: API Configuration (key with show/hide toggle and model selector), Generation Parameters (temperature and max-tokens sliders), and System Prompt (resizable textarea). All values are controlled via callback props."
      cliInstall="npx aether-ui add ai-settings"
      previewHeight="400px"
      importCode={`import { AISettings } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { AISettings } from "@aetherstack/blocks"

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
]

export function SettingsPage() {
  const [apiKey, setApiKey] = React.useState("")
  const [model, setModel] = React.useState("gpt-4o")
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(2048)
  const [systemPrompt, setSystemPrompt] = React.useState("You are a helpful assistant.")

  return (
    <AISettings
      apiKey={apiKey}
      onApiKeyChange={setApiKey}
      model={model}
      onModelChange={setModel}
      models={MODELS}
      temperature={temperature}
      onTemperatureChange={setTemperature}
      maxTokens={maxTokens}
      onMaxTokensChange={setMaxTokens}
      systemPrompt={systemPrompt}
      onSystemPromptChange={setSystemPrompt}
    />
  )
}`}
      preview={<AISettingsPreview />}
      props={[
        { name: "apiKey", type: "string", default: '""', description: "Current API key value." },
        { name: "onApiKeyChange", type: "(value: string) => void", description: "Called when the API key input changes." },
        { name: "model", type: "string", description: "Currently selected model ID." },
        { name: "onModelChange", type: "(value: string) => void", description: "Called when a different model is selected." },
        { name: "models", type: "Model[]", default: "[]", description: "Available models to show in the selector. Each has id, name, and provider." },
        { name: "temperature", type: "number", default: "0.7", description: "Current temperature value (0–2)." },
        { name: "onTemperatureChange", type: "(value: number) => void", description: "Called when the temperature slider changes." },
        { name: "maxTokens", type: "number", default: "2048", description: "Current max tokens value (256–8192)." },
        { name: "onMaxTokensChange", type: "(value: number) => void", description: "Called when the max tokens slider changes." },
        { name: "systemPrompt", type: "string", default: '""', description: "Current system prompt text." },
        { name: "onSystemPromptChange", type: "(value: string) => void", description: "Called when the system prompt textarea changes." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "All form fields are associated with a <Label> element.",
        "The API key visibility toggle includes aria-label='Show API key' or 'Hide API key'.",
        "Sliders use the Slider primitive which renders an accessible range input.",
        "The model selector uses the Select primitive with proper keyboard navigation.",
      ]}
    />
  )
}
