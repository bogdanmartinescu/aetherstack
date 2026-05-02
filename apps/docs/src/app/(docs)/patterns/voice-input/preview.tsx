"use client"

import * as React from "react"
import { VoiceInput } from "@aetherstack/patterns"

export function VoiceInputPreview() {
  const [transcript, setTranscript] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-4">
      <VoiceInput onTranscript={setTranscript} />
      {transcript && (
        <p className="text-sm text-muted-foreground max-w-xs text-center">
          Transcript: <span className="text-foreground">{transcript}</span>
        </p>
      )}
      {!transcript && (
        <p className="text-xs text-muted-foreground">Click the mic to start recording</p>
      )}
    </div>
  )
}
