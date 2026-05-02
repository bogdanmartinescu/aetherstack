"use client"

import * as React from "react"
import { MultiSelect } from "@aetherstack/patterns"

const OPTIONS = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "prisma", label: "Prisma" },
]

export function MultiSelectPreview() {
  const [value, setValue] = React.useState<string[]>(["next", "typescript"])

  return (
    <div className="w-full max-w-sm space-y-3">
      <MultiSelect
        options={OPTIONS}
        value={value}
        onValueChange={setValue}
        placeholder="Select technologies…"
        maxSelected={4}
      />
      <p className="text-xs text-muted-foreground text-center">
        {value.length === 0 ? "Nothing selected" : `Selected: ${value.join(", ")}`}
      </p>
    </div>
  )
}
