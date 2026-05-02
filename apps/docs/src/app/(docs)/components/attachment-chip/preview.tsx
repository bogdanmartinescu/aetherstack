"use client"

import * as React from "react"
import { AttachmentChip } from "@aetherstack/ui"

export function AttachmentChipPreview() {
  const [chips, setChips] = React.useState([
    { id: 1, name: "document.pdf", size: 245000 },
    { id: 2, name: "screenshot.png", size: 1200000 },
    { id: 3, name: "data.csv", size: 8400 },
  ])

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <AttachmentChip
          key={c.id}
          name={c.name}
          size={c.size}
          onRemove={() => setChips((prev) => prev.filter((x) => x.id !== c.id))}
        />
      ))}
    </div>
  )
}
