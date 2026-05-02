"use client"

import * as React from "react"
import { PromptLibraryPage } from "@aetherstack/blocks"

const INITIAL_PROMPTS = [
  {
    id: "1",
    title: "Explain like I'm 5",
    description: "Simplify complex topics",
    content: "Explain the following concept in simple terms, as if explaining to a 5-year-old: {{topic}}",
    category: "Education",
    tags: ["simple", "explain"],
  },
  {
    id: "2",
    title: "Code review checklist",
    description: "Review code for quality and issues",
    content: "Review the following code and provide feedback on: readability, performance, security, and potential bugs.\n\n{{code}}",
    category: "Development",
    tags: ["code", "review"],
  },
  {
    id: "3",
    title: "Blog post outline",
    description: "Create a structured blog post",
    content: "Create a detailed blog post outline for the topic: {{topic}}. Include an introduction, 5 main sections with subpoints, and a conclusion.",
    category: "Writing",
    tags: ["blog", "content"],
  },
  {
    id: "4",
    title: "Email draft",
    description: "Write professional emails",
    content: "Write a professional email about: {{subject}}. Tone: {{tone}}. Keep it concise and clear.",
    category: "Writing",
    tags: ["email", "professional"],
  },
  {
    id: "5",
    title: "SQL query helper",
    description: "Generate SQL queries",
    content: "Write an optimized SQL query to: {{requirement}}. Use {{database}} syntax.",
    category: "Development",
    tags: ["sql", "database"],
  },
]

export function PromptLibraryPagePreview() {
  const [prompts, setPrompts] = React.useState(INITIAL_PROMPTS)

  return (
    <div className="h-full overflow-hidden">
      <PromptLibraryPage
        prompts={prompts}
        categories={["Education", "Development", "Writing"]}
        onInsert={(content) => void navigator.clipboard.writeText(content)}
        onSave={(newPrompt) =>
          setPrompts((prev) => [
            ...prev,
            {
              ...newPrompt,
              id: String(Date.now()),
              description: newPrompt.description ?? "",
              category: newPrompt.category ?? "",
              tags: newPrompt.tags ?? [],
            },
          ])
        }
        onDelete={(id) =>
          setPrompts((prev) => prev.filter((p) => p.id !== id))
        }
      />
    </div>
  )
}
