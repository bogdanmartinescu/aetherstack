"use client"

import * as React from "react"
import { PromptSuggestion } from "@aetherstack/ui"
import { Sparkles, Code, FileText } from "lucide-react"

export function PromptSuggestionPreview() {
  const [clicked, setClicked] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap gap-2 justify-center">
        <PromptSuggestion
          label="Explain this code"
          icon={<Code className="h-3.5 w-3.5" />}
          onClick={() => setClicked("Explain this code")}
        />
        <PromptSuggestion
          label="Write a summary"
          icon={<FileText className="h-3.5 w-3.5" />}
          onClick={() => setClicked("Write a summary")}
        />
        <PromptSuggestion
          label="Brainstorm ideas"
          icon={<Sparkles className="h-3.5 w-3.5" />}
          onClick={() => setClicked("Brainstorm ideas")}
        />
      </div>
      {clicked && (
        <p className="text-xs text-muted-foreground">Clicked: {clicked}</p>
      )}
    </div>
  )
}
