"use client"

import * as React from "react"
import { ModelSelector } from "@aetherstack/patterns"

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", capabilities: ["vision", "tools"] },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", capabilities: ["tools"] },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", capabilities: ["vision", "tools"] },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", capabilities: ["vision"] },
]

export function ModelSelectorPreview() {
  const [value, setValue] = React.useState("gpt-4o")
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs">
      <ModelSelector models={MODELS} value={value} onValueChange={setValue} />
      <p className="text-xs text-muted-foreground">Selected: {value}</p>
    </div>
  )
}
