"use client"

import { PatternPage } from "@/components/pattern-page"
import { SearchInputPreview } from "./preview"

export default function SearchInputPage() {
  return (
    <PatternPage
      name="Search Input"
      description="An enhanced search field with a clear button, loading spinner, and optional keyboard shortcut hint. The shortcut badge is decorative — wire your own keyboard handler to open/focus the field."
      cliInstall="npx aether-ui add search-input"
      importCode={`import { SearchInput } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { SearchInput } from "@aetherstack/patterns"

export function MySearch() {
  const [value, setValue] = React.useState("")
  return (
    <SearchInput
      value={value}
      onValueChange={setValue}
      placeholder="Search…"
      shortcut="⌘K"
    />
  )
}`}
      preview={<SearchInputPreview />}
      props={[
        { name: "value", type: "string", required: true, description: "Controlled input value." },
        { name: "onValueChange", type: "(value: string) => void", required: true, description: "Callback fired on every keystroke and on clear." },
        { name: "placeholder", type: "string", default: '"Search…"', description: "Input placeholder text." },
        { name: "shortcut", type: "string", description: "Keyboard shortcut badge text shown on the right (e.g. \"⌘K\")." },
        { name: "loading", type: "boolean", default: "false", description: "Replaces the search icon with a spinner when true." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
        { name: "className", type: "string", description: "Additional classes on the input wrapper." },
      ]}
      a11yNotes={[
        "Input has role=\"searchbox\" and an accessible label via aria-label or a paired <label> element.",
        "The clear button carries aria-label=\"Clear search\" and is only rendered when value is non-empty.",
        "The shortcut badge is aria-hidden — it is a visual hint only.",
        "Loading spinner is aria-hidden; live search results should use an aria-live region separately.",
      ]}
    />
  )
}
