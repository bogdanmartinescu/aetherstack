"use client"

import * as React from "react"
import { TokenCounter } from "@aetherstack/ui"
import { Slider } from "@aetherstack/ui"

export function TokenCounterPreview() {
  const [used, setUsed] = React.useState(12400)
  const MAX = 128000

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <TokenCounter used={used} max={MAX} />
      <Slider
        min={0}
        max={MAX}
        step={1000}
        value={[used]}
        onValueChange={([v]) => v !== undefined && setUsed(v)}
      />
    </div>
  )
}
