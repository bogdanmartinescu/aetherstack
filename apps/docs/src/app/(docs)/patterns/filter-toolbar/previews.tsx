"use client"

import { useState } from "react"
import { FilterToolbar } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"
import { SlidersHorizontal } from "lucide-react"

const INITIAL_FILTERS = [
  { id: "status", label: "Status: Active" },
  { id: "role", label: "Role: Admin" },
  { id: "dept", label: "Dept: Engineering" },
]

export function FilterToolbarPreview() {
  const [active, setActive] = useState(INITIAL_FILTERS)

  function remove(id: string) {
    setActive((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FilterToolbar
      activeFilters={active.map((f) => ({
        ...f,
        onRemove: () => remove(f.id),
      }))}
      onClearAll={() => setActive([])}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => setActive(INITIAL_FILTERS)}
      >
        <SlidersHorizontal />
        Filter
      </Button>
    </FilterToolbar>
  )
}
