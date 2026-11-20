"use client"

import * as React from "react"
import { AIErrorState } from "@aetherstack/patterns"

export function AIErrorStatePreview() {
  const [type, setType] = React.useState<
    "rate-limit" | "context-length" | "provider-outage" | "network" | "generic"
  >("generic")
  const types = ["rate-limit", "context-length", "provider-outage", "network", "generic"] as const
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${type === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <AIErrorState type={type} onRetry={() => {}} />
    </div>
  )
}
