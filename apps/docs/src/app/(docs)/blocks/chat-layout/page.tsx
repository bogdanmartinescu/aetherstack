"use client"

import { BlockPage } from "@/components/block-page"
import { ChatLayoutPreview } from "./preview"

export default function ChatLayoutPage() {
  return (
    <BlockPage
      name="Chat Layout"
      category="AI Layout"
      description="A full-page chat shell that composes a persistent desktop sidebar, a sticky header bar, a scrollable main content area, and an optional footer slot. On mobile the sidebar collapses into a Sheet drawer controlled by the built-in menu toggle."
      cliInstall="npx aether-ui add chat-layout"
      previewHeight="420px"
      importCode={`import { ChatLayout } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { ChatLayout } from "@aetherstack/blocks"
import { ChatSidebar } from "@aetherstack/blocks"
import { PromptInput } from "@aetherstack/ui"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <ChatLayout
      sidebar={
        <ChatSidebar
          conversations={[
            { id: "1", title: "React hooks deep-dive", active: true },
            { id: "2", title: "TypeScript generics" },
          ]}
          onNewChat={() => {}}
          onConversationClick={() => {}}
        />
      }
      header={<span className="font-medium">React hooks deep-dive</span>}
      footer={
        <PromptInput
          value=""
          onChange={() => {}}
          onSubmit={() => {}}
          placeholder="Type a message…"
        />
      }
      sidebarOpen={sidebarOpen}
      onSidebarToggle={setSidebarOpen}
    >
      {/* render messages here */}
    </ChatLayout>
  )
}`}
      preview={<ChatLayoutPreview />}
      props={[
        { name: "children", type: "ReactNode", required: true, description: "Main scrollable content area — typically the message list." },
        { name: "sidebar", type: "ReactNode", description: "Sidebar content. Hidden on mobile; exposed via a Sheet when sidebarOpen is true." },
        { name: "header", type: "ReactNode", description: "Content rendered inside the sticky 56 px header bar." },
        { name: "footer", type: "ReactNode", description: "Content rendered in a fixed footer panel — typically a prompt input." },
        { name: "sidebarOpen", type: "boolean", default: "false", description: "Controls the mobile Sheet sidebar open state." },
        { name: "onSidebarToggle", type: "(open: boolean) => void", description: "Called when the mobile menu button or Sheet overlay is interacted with." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Sidebar is wrapped in an <aside> landmark on desktop.",
        "Main content area is wrapped in a <main> element.",
        "Mobile menu toggle button includes aria-label='Toggle sidebar'.",
        "The Sheet sidebar uses a visually-hidden SheetTitle for screen reader context.",
      ]}
    />
  )
}
