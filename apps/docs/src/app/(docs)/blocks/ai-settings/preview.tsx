"use client"

import * as React from "react"
import { AISettings } from "@aetherstack/blocks"

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
]

export function AISettingsPreview() {
  const [apiKey, setApiKey] = React.useState("")
  const [model, setModel] = React.useState("gpt-4o")
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(2048)
  const [systemPrompt, setSystemPrompt] = React.useState(
    "You are a helpful AI assistant.",
  )

  return (
    <div className="overflow-y-auto h-full p-4">
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
    </div>
  )
}
