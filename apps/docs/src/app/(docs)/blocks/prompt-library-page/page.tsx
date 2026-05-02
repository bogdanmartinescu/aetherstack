"use client"

import { BlockPage } from "@/components/block-page"
import { PromptLibraryPagePreview } from "./preview"

export default function PromptLibraryPageDocPage() {
  return (
    <BlockPage
      name="Prompt Library Page"
      category="AI"
      description="A full-page layout for managing a prompt library. Features a category sidebar, live search filter, a responsive prompt card grid with insert, copy, edit, and delete actions, and a dialog for creating or editing prompts."
      cliInstall="npx aether-ui add prompt-library-page"
      previewHeight="420px"
      importCode={`import { PromptLibraryPage } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { PromptLibraryPage } from "@aetherstack/blocks"

const initialPrompts = [
  {
    id: "1",
    title: "Explain like I'm 5",
    description: "Simplify complex topics",
    content: "Explain the following in simple terms: {{topic}}",
    category: "Education",
    tags: ["explain"],
  },
  {
    id: "2",
    title: "Code review",
    description: "Review code for quality",
    content: "Review the following code: {{code}}",
    category: "Development",
    tags: ["code"],
  },
]

export function MyPromptLibrary() {
  const [prompts, setPrompts] = React.useState(initialPrompts)

  return (
    <PromptLibraryPage
      prompts={prompts}
      categories={["Education", "Development"]}
      onInsert={(content) => console.log("Insert:", content)}
      onSave={(newPrompt) =>
        setPrompts((prev) => [
          ...prev,
          { ...newPrompt, id: String(Date.now()), tags: newPrompt.tags ?? [] },
        ])
      }
      onDelete={(id) =>
        setPrompts((prev) => prev.filter((p) => p.id !== id))
      }
    />
  )
}`}
      preview={<PromptLibraryPagePreview />}
      props={[
        { name: "prompts", type: "Prompt[]", required: true, description: "Array of prompt objects to display in the grid." },
        { name: "categories", type: "string[]", default: "[]", description: "Explicit category list for the sidebar. If omitted, categories are inferred from the prompts." },
        { name: "onInsert", type: "(content: string) => void", description: "Called when the Insert button on a prompt card is clicked. Omit to hide the button." },
        { name: "onSave", type: "(prompt: NewPrompt) => void", description: "Called when the create/edit dialog is saved. Omit to hide the New prompt button and edit action." },
        { name: "onDelete", type: "(id: string) => void", description: "Called when the delete button on a card is clicked. Omit to hide the button." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Category sidebar buttons convey active state via background color and are keyboard-focusable.",
        "The search input has an accessible label provided by the Search icon's implicit visual context; add an aria-label for screen-reader-only scenarios.",
        "The create/edit dialog is built on the Dialog primitive with role='dialog' and a labelled title.",
        "Copy and delete icon buttons include aria-label attributes.",
      ]}
    />
  )
}
