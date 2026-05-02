"use client"

import * as React from "react"
import { InlineEdit } from "@aetherstack/patterns"

export function InlineEditPreview() {
  const [value, setValue] = React.useState("Untitled project")

  return (
    <div className="w-full max-w-sm space-y-3">
      <InlineEdit
        value={value}
        onValueChange={setValue}
        placeholder="Enter a title…"
      />
      <p className="text-xs text-muted-foreground text-center">
        Saved value: <strong>{value}</strong>
      </p>
    </div>
  )
}
