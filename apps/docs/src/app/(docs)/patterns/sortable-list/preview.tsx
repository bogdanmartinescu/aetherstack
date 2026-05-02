"use client"

import * as React from "react"
import { SortableList, type SortableListItem } from "@aetherstack/patterns"

const INITIAL_ITEMS: SortableListItem[] = [
  { id: "1", label: "Design system tokens" },
  { id: "2", label: "Primitive components" },
  { id: "3", label: "Pattern compositions" },
  { id: "4", label: "Block layouts" },
]

export function SortableListPreview() {
  const [items, setItems] = React.useState<SortableListItem[]>(INITIAL_ITEMS)

  return (
    <div className="w-full max-w-sm space-y-3">
      <SortableList
        items={items}
        onReorder={setItems}
        renderItem={(item) => (
          <span className="text-sm text-foreground">{String(item.label ?? "")}</span>
        )}
      />
      <p className="text-xs text-muted-foreground text-center">
        Order: {items.map((i) => String(i.label ?? "").split(" ")[0]).join(" → ")}
      </p>
    </div>
  )
}
