import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { KanbanPreview } from "./preview"

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Drag-and-drop Kanban board with columns, cards, badges, and drop-zone highlighting.",
}

export default function KanbanPage() {
  return (
    <PatternPage
      name="Kanban Board"
      description="A composable drag-and-drop Kanban board. Cards are draggable across columns using the native HTML5 drag API. Columns highlight on drag-over and call onDrop to let you update state externally."
      cliInstall="npx aether-ui add kanban"
      importCode={`import { KanbanBoard, KanbanColumn, KanbanCard } from "@aetherstack/patterns"
import type { KanbanItem } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { KanbanBoard } from "@aetherstack/patterns"
import type { KanbanItem } from "@aetherstack/patterns"

const INITIAL_COLUMNS = [
  {
    title: "Backlog",
    items: [
      { id: "1", title: "Design system audit", badge: "Design" },
    ],
  },
  { title: "In Progress", items: [] },
  { title: "Done",        items: [] },
]

export function MyKanban() {
  const [columns, setColumns] = React.useState(INITIAL_COLUMNS)

  function handleDrop(item: KanbanItem, targetTitle: string) {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.items.some((i) => i.id === item.id)) {
          return { ...col, items: col.items.filter((i) => i.id !== item.id) }
        }
        if (col.title === targetTitle) {
          return { ...col, items: [...col.items, item] }
        }
        return col
      })
    )
  }

  return (
    <KanbanBoard
      columns={columns.map((col) => ({
        ...col,
        onDrop: handleDrop,
      }))}
    />
  )
}`}
      preview={<KanbanPreview />}
      props={[
        { name: "columns", type: "KanbanColumnProps[]", required: true, description: "Column definitions with title, items array, and optional onDrop callback." },
        { name: "className", type: "string", description: "Additional classes on the board wrapper." },
      ]}
      a11yNotes={[
        "The board wrapper has role=\"region\" aria-label=\"Kanban board\".",
        "Cards are draggable — keyboard drag-and-drop is not supported by the native HTML5 drag API; add a separate accessible reorder mechanism for keyboard users in production.",
        "Card titles are text; badges use the Badge primitive with semantic variant.",
        "Empty column drop targets are visually indicated with a dashed border.",
      ]}
    />
  )
}
