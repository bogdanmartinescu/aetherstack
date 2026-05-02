"use client"

import { BlockPage } from "@/components/block-page"
import { ChatSidebarPreview } from "./preview"

export default function ChatSidebarPage() {
  return (
    <BlockPage
      name="Chat Sidebar"
      category="AI Layout"
      description="A conversation list sidebar with a new-chat button, live search filter, inline rename editing, and per-item delete via a dropdown menu. Designed to slot directly inside ChatLayout."
      cliInstall="npx aether-ui add chat-sidebar"
      previewHeight="360px"
      importCode={`import { ChatSidebar } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { ChatSidebar } from "@aetherstack/blocks"

export function MyChatSidebar() {
  const [conversations, setConversations] = React.useState([
    { id: "1", title: "React hooks deep-dive", active: true },
    { id: "2", title: "TypeScript generics" },
    { id: "3", title: "Tailwind best practices" },
  ])

  return (
    <ChatSidebar
      conversations={conversations}
      onNewChat={() =>
        setConversations((prev) => [
          { id: String(Date.now()), title: "New chat", active: true },
          ...prev.map((c) => ({ ...c, active: false })),
        ])
      }
      onConversationClick={(id) =>
        setConversations((prev) =>
          prev.map((c) => ({ ...c, active: c.id === id })),
        )
      }
      onConversationDelete={(id) =>
        setConversations((prev) => prev.filter((c) => c.id !== id))
      }
      onConversationRename={(id, title) =>
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, title } : c)),
        )
      }
    />
  )
}`}
      preview={<ChatSidebarPreview />}
      props={[
        { name: "conversations", type: "Conversation[]", default: "[]", description: "List of conversation objects to render." },
        { name: "onNewChat", type: "() => void", description: "Called when the 'New chat' button is clicked." },
        { name: "onConversationClick", type: "(id: string) => void", description: "Called when a conversation item is clicked." },
        { name: "onConversationDelete", type: "(id: string) => void", description: "Called when the delete action is triggered from the item dropdown." },
        { name: "onConversationRename", type: "(id: string, title: string) => void", description: "Called after an inline rename is committed (Enter key or checkmark)." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Search input has an implicit label via the visible placeholder; add an aria-label if the field is used in isolation.",
        "Rename confirm and cancel icon buttons include aria-label='Save' and aria-label='Cancel'.",
        "The per-item options button includes aria-label='More options'.",
        "Keyboard users can commit renames with Enter and cancel with Escape.",
      ]}
    />
  )
}
