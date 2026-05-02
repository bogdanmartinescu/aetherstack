"use client"

import * as React from "react"
import { AIOnboarding } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"

export function AIOnboardingPreview() {
  const [done, setDone] = React.useState(false)

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">Onboarding complete!</p>
        <Button variant="outline" size="sm" onClick={() => setDone(false)}>
          Restart
        </Button>
      </div>
    )
  }

  return (
    <AIOnboarding
      onComplete={() => setDone(true)}
      className="px-4"
    />
  )
}
