"use client"

import { PatternPage } from "@/components/pattern-page"
import { SortableListPreview } from "./preview"

export default function SortableListPage() {
  return (
    <PatternPage
      name="Sortable List"
      description="A drag-and-drop sortable list with keyboard accessibility powered by dnd-kit. Each row renders via a renderItem render-prop, keeping item presentation fully customisable."
      cliInstall="npx aether-ui add sortable-list"
      importCode={`import { SortableList } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { SortableList } from "@aetherstack/patterns"

const INITIAL = [
  { id: "1", label: "Design tokens" },
  { id: "2", label: "Primitives" },
  { id: "3", label: "Patterns" },
]

export function MySortableList() {
  const [items, setItems] = React.useState(INITIAL)
  return (
    <SortableList
      items={items}
      onReorder={setItems}
      renderItem={(item) => <span>{item.label}</span>}
    />
  )
}`}
      preview={<SortableListPreview />}
      props={[
        { name: "items", type: "{ id: string; [key: string]: unknown }[]", required: true, description: "Array of items to render. Each must have a unique id." },
        { name: "onReorder", type: "(items: T[]) => void", required: true, description: "Called with the reordered array after a drag or keyboard move." },
        { name: "renderItem", type: "(item: T) => ReactNode", required: true, description: "Render function for each list item's content." },
        { name: "className", type: "string", description: "Additional classes on the list container." },
      ]}
      a11yNotes={[
        "Built on @dnd-kit/sortable — each row receives a drag handle with aria-roledescription=\"sortable\" and live position announcements.",
        "Keyboard users can lift an item with Space, move it with arrow keys, and drop with Space or cancel with Escape.",
        "A visually-hidden aria-live region announces position changes as items are reordered.",
        "Drag handles carry an aria-label describing the current item.",
      ]}
    />
  )
}
