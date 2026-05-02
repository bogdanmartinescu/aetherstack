"use client"

import * as React from "react"
import { ConversationStarter } from "@aetherstack/patterns"
import { Code, FileText, Sparkles, Search } from "lucide-react"

export function ConversationStarterPreview() {
  const [clicked, setClicked] = React.useState<string | null>(null)
  return (
    <div className="w-full max-w-lg">
      <ConversationStarter
        title="How can I help you today?"
        description="Choose a suggestion below or type your own message."
        suggestions={[
          { label: "Explain a concept", icon: <Sparkles className="h-4 w-4" />, prompt: "Explain how React hooks work" },
          { label: "Review my code", icon: <Code className="h-4 w-4" />, prompt: "Review this code for issues" },
          { label: "Write documentation", icon: <FileText className="h-4 w-4" />, prompt: "Write docs for this function" },
          { label: "Search the web", icon: <Search className="h-4 w-4" />, prompt: "Search for the latest React news" },
        ]}
        onSuggestionClick={setClicked}
      />
      {clicked && <p className="text-xs text-center text-muted-foreground mt-2">Prompt: {clicked}</p>}
    </div>
  )
}
