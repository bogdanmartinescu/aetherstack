"use client"

import * as React from "react"
import { PromptBuilder } from "@aetherstack/patterns"

type Turn = { role: "system" | "user" | "assistant"; content: string }

export function PromptBuilderPreview() {
  const [turns, setTurns] = React.useState<Turn[]>([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" },
  ])
  return <PromptBuilder turns={turns} onTurnsChange={setTurns} className="w-full max-w-lg" />
}
