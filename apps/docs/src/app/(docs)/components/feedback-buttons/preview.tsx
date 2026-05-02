"use client"

import * as React from "react"
import { FeedbackButtons } from "@aetherstack/ui"

export function FeedbackButtonsPreview() {
  const [feedback, setFeedback] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <FeedbackButtons
        onThumbsUp={() => setFeedback("positive")}
        onThumbsDown={() => setFeedback("negative")}
      />
      {feedback && (
        <p className="text-xs text-muted-foreground">Feedback: {feedback}</p>
      )}
    </div>
  )
}
