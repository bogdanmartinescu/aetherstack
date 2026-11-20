"use client"

import * as React from "react"
import { PromptInput } from "@aetherstack/ui"

export function PromptInputPreview() {
  const [value, setValue] = React.useState("")
  const [messages, setMessages] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(v: string) {
    setLoading(true)
    setMessages((m) => [...m, v])
    setValue("")
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {messages.map((m, i) => (
        <div key={i} className="bg-muted max-w-[80%] self-end rounded-lg px-3 py-2 text-sm">
          {m}
        </div>
      ))}
      <PromptInput
        value={value}
        onValueChange={setValue}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  )
}
