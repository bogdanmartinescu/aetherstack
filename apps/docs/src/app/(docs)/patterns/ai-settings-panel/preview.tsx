"use client"

import * as React from "react"
import { AISettingsPanel } from "@aetherstack/patterns"

export function AISettingsPanelPreview() {
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(2048)
  const [systemPrompt, setSystemPrompt] = React.useState("You are a helpful assistant.")
  return (
    <AISettingsPanel
      temperature={temperature}
      onTemperatureChange={setTemperature}
      maxTokens={maxTokens}
      onMaxTokensChange={setMaxTokens}
      systemPrompt={systemPrompt}
      onSystemPromptChange={setSystemPrompt}
      className="w-full max-w-sm"
    />
  )
}
