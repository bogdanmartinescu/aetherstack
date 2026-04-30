"use client"

import * as React from "react"
import { ColorPicker } from "@aetherstack/patterns"

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#ffffff", "#64748b", "#1e293b", "#000000",
]

export function ColorPickerPreview() {
  const [color, setColor] = React.useState("#3b82f6")
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker value={color} onChange={setColor} presets={PRESETS} />
      <p className="text-xs text-muted-foreground font-mono">Selected: {color}</p>
    </div>
  )
}
