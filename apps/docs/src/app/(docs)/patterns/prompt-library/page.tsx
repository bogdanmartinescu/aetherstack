import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { PromptLibraryPreview } from "./preview"

export const metadata: Metadata = {
  title: "Prompt Library",
  description: "A searchable, filterable library of reusable prompts with insert and copy actions.",
}

export default function PromptLibraryPage() {
  return (
    <PatternPage
      name="Prompt Library"
      description="A searchable, filterable library of reusable prompts. Each prompt shows a title, optional description, and category tags. Users can insert a prompt into the active input or copy it to the clipboard. Supports category filter buttons for quick browsing."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add prompt-library"
      importCode={`import { PromptLibrary } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { PromptLibrary } from "@aetherstack/patterns"

const prompts = [
  {
    id: "1",
    title: "Code Review",
    description: "Review code for bugs and improvements",
    content: "Please review this code for bugs and improvements:",
    category: "Development",
    tags: ["code"],
  },
  {
    id: "2",
    title: "Summarize",
    description: "Summarize content into bullet points",
    content: "Please summarize the following in 3 bullet points:",
    category: "Writing",
    tags: ["summary"],
  },
]

export function MyPromptLibrary() {
  return (
    <PromptLibrary
      prompts={prompts}
      categories={["Development", "Writing"]}
      onInsert={(content) => setInputValue(content)}
      onCopy={(content) => navigator.clipboard.writeText(content)}
    />
  )
}`}
      preview={<PromptLibraryPreview />}
      props={[
        { name: "prompts", type: "Prompt[]", required: true, description: "Array of prompt items to display. Each item requires id, title, and content." },
        { name: "categories", type: "string[]", description: "Category names rendered as filter buttons above the prompt list." },
        { name: "onInsert", type: "(content: string) => void", description: "Called with the prompt content when the user clicks Insert." },
        { name: "onCopy", type: "(content: string) => void", description: "Called with the prompt content when the user clicks Copy." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the root container." },
      ]}
      a11yNotes={[
        "Category filter buttons use aria-pressed to indicate the active filter state.",
        "The search input includes an aria-label for screen reader context.",
        "Insert and Copy buttons include the prompt title in their aria-label for unambiguous identification.",
      ]}
    />
  )
}
