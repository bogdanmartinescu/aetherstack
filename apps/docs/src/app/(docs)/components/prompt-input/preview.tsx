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
    <div className="flex flex-col gap-3 w-full max-w-md">
      {messages.map((m, i) => (
        <div
          key={i}
          className="rounded-lg bg-muted px-3 py-2 text-sm self-end max-w-[80%]"
        >
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
