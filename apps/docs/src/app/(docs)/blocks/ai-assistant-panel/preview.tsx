"use client"

import * as React from "react"
import { AIAssistantPanel } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"

export function AIAssistantPanelPreview() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex h-full items-center justify-center">
      <Button onClick={() => setOpen(true)}>Open AI Assistant</Button>
      <AIAssistantPanel
        open={open}
        onOpenChange={setOpen}
        title="AI Assistant"
        footer={
          <div className="rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground">
            Ask me anything…
          </div>
        }
      >
        <div className="flex flex-col gap-3 p-4">
          <div className="rounded-lg bg-muted px-4 py-3 text-sm">
            Hello! I&apos;m your AI assistant. How can I help you today?
          </div>
          <div className="self-end rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground">
            What can you help me with?
          </div>
          <div className="rounded-lg bg-muted px-4 py-3 text-sm">
            I can help you write code, answer questions, summarize documents, and much more!
          </div>
        </div>
      </AIAssistantPanel>
    </div>
  )
}
