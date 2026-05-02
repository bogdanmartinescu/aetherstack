"use client"

import * as React from "react"
import { PromptLibrary } from "@aetherstack/patterns"

const PROMPTS = [
  { id: "1", title: "Code Review", description: "Review code for issues", content: "Please review this code for bugs and improvements:", category: "Development", tags: ["code"] },
  { id: "2", title: "Explain Code", description: "Get an explanation", content: "Explain this code step by step:", category: "Development", tags: ["code", "learning"] },
  { id: "3", title: "Write Tests", description: "Generate unit tests", content: "Write comprehensive unit tests for:", category: "Development", tags: ["testing"] },
  { id: "4", title: "Summarize", description: "Summarize content", content: "Please summarize the following in 3 bullet points:", category: "Writing", tags: ["summary"] },
  { id: "5", title: "Translate", description: "Translate text", content: "Translate the following text to Spanish:", category: "Writing", tags: ["translation"] },
]

export function PromptLibraryPreview() {
  const [inserted, setInserted] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <PromptLibrary
        prompts={PROMPTS}
        categories={["Development", "Writing"]}
        onInsert={setInserted}
        onCopy={() => {}}
      />
      {inserted && <p className="text-xs text-muted-foreground truncate">Inserted: {inserted}</p>}
    </div>
  )
}
