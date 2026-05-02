"use client"

import * as React from "react"
import { ChatLayout } from "@aetherstack/blocks"
import { ChatSidebar } from "@aetherstack/blocks"

export function ChatLayoutPreview() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const sidebar = (
    <ChatSidebar
      conversations={[
        { id: "1", title: "How to use React hooks", active: true },
        { id: "2", title: "TypeScript generics explained" },
        { id: "3", title: "Tailwind CSS best practices" },
      ]}
      onNewChat={() => {}}
      onConversationClick={() => {}}
    />
  )

  return (
    <ChatLayout
      sidebar={sidebar}
      header={<span className="text-sm font-medium">How to use React hooks</span>}
      footer={
        <div className="rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground">
          Type a message…
        </div>
      }
      sidebarOpen={sidebarOpen}
      onSidebarToggle={setSidebarOpen}
      className="h-full"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Chat messages appear here</p>
      </div>
    </ChatLayout>
  )
}
