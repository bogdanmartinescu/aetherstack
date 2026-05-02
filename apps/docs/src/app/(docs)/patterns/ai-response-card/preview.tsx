"use client"

import { AIResponseCard } from "@aetherstack/patterns"

export function AIResponseCardPreview() {
  return (
    <AIResponseCard
      content="React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage application state efficiently."
      model="gpt-4o"
      timestamp="2:41 PM"
      onCopy={() => {}}
      onRegenerate={() => {}}
      feedbackProps={{ onThumbsUp: () => {}, onThumbsDown: () => {} }}
      className="max-w-sm"
    />
  )
}
