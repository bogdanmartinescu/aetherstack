"use client"

import * as React from "react"
import { SearchInput } from "@aetherstack/patterns"

export function SearchInputPreview() {
  const [value, setValue] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  function handleValueChange(next: string) {
    setValue(next)
    setLoading(next.length > 0)
    if (next.length > 0) {
      setTimeout(() => setLoading(false), 800)
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <SearchInput
        value={value}
        onValueChange={handleValueChange}
        placeholder="Search components…"
        shortcut="⌘K"
        loading={loading}
      />
      {value && (
        <p className="text-xs text-muted-foreground text-center">
          Searching for: <strong>{value}</strong>
        </p>
      )}
    </div>
  )
}
