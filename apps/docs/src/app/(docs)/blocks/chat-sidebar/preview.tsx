"use client"

import * as React from "react"
import { ChatSidebar } from "@aetherstack/blocks"

const INITIAL_CONVS = [
  { id: "1", title: "How to use React hooks", active: true },
  { id: "2", title: "TypeScript generics explained" },
  { id: "3", title: "Tailwind CSS best practices" },
  { id: "4", title: "Next.js App Router overview" },
  { id: "5", title: "Deploying to Vercel" },
]

export function ChatSidebarPreview() {
  const [conversations, setConversations] = React.useState(INITIAL_CONVS)

  function handleClick(id: string) {
    setConversations((prev) =>
      prev.map((c) => ({ ...c, active: c.id === id })),
    )
  }

  function handleDelete(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id))
  }

  function handleRename(id: string, title: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title } : c)),
    )
  }

  return (
    <div className="h-full border-r border-border bg-card w-64">
      <ChatSidebar
        conversations={conversations}
        onNewChat={() =>
          setConversations((prev) => [
            { id: String(Date.now()), title: "New chat", active: true },
            ...prev.map((c) => ({ ...c, active: false })),
          ])
        }
        onConversationClick={handleClick}
        onConversationDelete={handleDelete}
        onConversationRename={handleRename}
      />
    </div>
  )
}
