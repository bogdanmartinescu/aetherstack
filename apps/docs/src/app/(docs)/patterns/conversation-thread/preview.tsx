"use client"

import * as React from "react"
import { ConversationThread } from "@aetherstack/patterns"
import type { Message } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

const INITIAL: Message[] = [
  { id: "1", role: "user", content: "What is React?", name: "You", timestamp: "2:40 PM" },
  { id: "2", role: "assistant", content: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.", name: "AI", timestamp: "2:40 PM" },
]

export function ConversationThreadPreview() {
  const [messages, setMessages] = React.useState<Message[]>(INITIAL)
  const [thinking, setThinking] = React.useState(false)

  function addMessage() {
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      setMessages((m) => [
        ...m,
        { id: String(Date.now() - 1), role: "user", content: "Can you give an example?", name: "You", timestamp: "2:41 PM" },
        { id: String(Date.now()), role: "assistant", content: "Sure! Here's a simple component:\n\nfunction Hello({ name }) {\n  return <h1>Hello, {name}!</h1>\n}", name: "AI", timestamp: "2:41 PM" },
      ])
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <div className="max-h-64 overflow-y-auto">
        <ConversationThread messages={messages} isThinking={thinking} />
      </div>
      <Button size="sm" variant="outline" onClick={addMessage} disabled={thinking}>
        Continue conversation
      </Button>
    </div>
  )
}
