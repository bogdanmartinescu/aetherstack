"use client"

import * as React from "react"
import { StreamingText } from "@aetherstack/ui"
import { Button } from "@aetherstack/ui"

export function StreamingTextPreview() {
  const [key, setKey] = React.useState(0)
  const [stream, setStream] = React.useState<AsyncIterable<string> | null>(null)

  async function* makeStream() {
    const words = "The quick brown fox jumps over the lazy dog.".split(" ")
    for (const word of words) {
      await new Promise((r) => setTimeout(r, 120))
      yield word + " "
    }
  }

  function start() {
    setKey((k) => k + 1)
    setStream(makeStream())
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="min-h-[60px] max-w-sm text-sm">
        {stream ? (
          <StreamingText key={key} content={stream} />
        ) : (
          <span className="text-muted-foreground">Click to start streaming…</span>
        )}
      </div>
      <Button size="sm" onClick={start}>
        Stream text
      </Button>
    </div>
  )
}
