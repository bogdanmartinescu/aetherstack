"use client"

import * as React from "react"
import { KanbanBoard } from "@aetherstack/patterns"
import type { KanbanItem } from "@aetherstack/patterns"

type ColumnState = { title: string; items: KanbanItem[] }

const INITIAL: ColumnState[] = [
  {
    title: "Backlog",
    items: [
      { id: "1", title: "Design system audit", description: "Review token usage across all components.", badge: "Design" },
      { id: "2", title: "Performance profiling", description: "Identify bundle size regressions.", badge: "Eng" },
    ],
  },
  {
    title: "In Progress",
    items: [
      { id: "3", title: "Dark mode tokens", description: "Update semantic colour tokens for dark theme.", badge: "Design" },
    ],
  },
  {
    title: "Done",
    items: [
      { id: "4", title: "Accessibility audit", description: "All components pass WCAG 2.1 AA.", badge: "QA" },
    ],
  },
]

export function KanbanPreview() {
  const [columns, setColumns] = React.useState<ColumnState[]>(INITIAL)

  function handleDrop(item: KanbanItem, targetTitle: string) {
    setColumns((prev) => {
      const source = prev.find((c) => c.items.some((i) => i.id === item.id))
      if (!source || source.title === targetTitle) return prev
      return prev.map((col) => {
        if (col.title === source.title) {
          return { ...col, items: col.items.filter((i) => i.id !== item.id) }
        }
        if (col.title === targetTitle) {
          return { ...col, items: [...col.items, item] }
        }
        return col
      })
    })
  }

  const columnsWithHandler = columns.map((col) => ({
    ...col,
    onDrop: (item: KanbanItem, targetTitle: string) => handleDrop(item, targetTitle),
  }))

  return <KanbanBoard columns={columnsWithHandler} />
}
