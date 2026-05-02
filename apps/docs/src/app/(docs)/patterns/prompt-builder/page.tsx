"use client"

import { PatternPage } from "@/components/pattern-page"
import { PromptBuilderPreview } from "./preview"

export default function PromptBuilderPage() {
  return (
    <PatternPage
      name="Prompt Builder"
      description="An interactive multi-turn prompt editor that lets users construct system, user, and assistant conversation turns. Each turn can be added, edited, reordered, or removed. Useful for prompt engineering workflows and chat playground UIs."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add prompt-builder"
      importCode={`import { PromptBuilder } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { PromptBuilder } from "@aetherstack/patterns"

export function MyPromptEditor() {
  const [turns, setTurns] = React.useState([
    { role: "system" as const, content: "You are a helpful assistant." },
    { role: "user" as const, content: "Hello!" },
  ])

  return (
    <PromptBuilder
      turns={turns}
      onTurnsChange={setTurns}
      className="max-w-lg"
    />
  )
}`}
      preview={<PromptBuilderPreview />}
      props={[
        { name: "turns", type: "Turn[]", default: '[{role:"system",content:""}]', description: "Array of conversation turns. Each turn has a role and content string." },
        { name: "onTurnsChange", type: "(turns: Turn[]) => void", description: "Called whenever the user adds, edits, reorders, or removes a turn." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the root container." },
      ]}
      a11yNotes={[
        "Each turn row includes a labelled role selector and a textarea with a descriptive aria-label.",
        "Add and remove buttons include aria-label attributes describing their action.",
        "Keyboard users can tab through all turn controls in logical document order.",
      ]}
    />
  )
}
