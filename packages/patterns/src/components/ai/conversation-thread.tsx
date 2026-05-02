"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
  avatarUrl?: string
  name?: string
  isStreaming?: boolean
  sources?: { title: string; url: string }[]
}

interface ConversationThreadProps {
  messages: Message[]
  isThinking?: boolean
  renderMessage?: (msg: Message) => React.ReactNode
  className?: string
}

function DefaultMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user"

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {!isUser && (
        <div className="flex-shrink-0">
          {msg.avatarUrl ? (
            <img
              src={msg.avatarUrl}
              alt={msg.name ?? "assistant"}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {msg.name ? msg.name[0]?.toUpperCase() : "AI"}
            </div>
          )}
        </div>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        {(msg.name ?? msg.timestamp) && (
          <div
            className={cn(
              "flex items-center gap-2 text-xs text-muted-foreground",
              isUser && "flex-row-reverse",
            )}
          >
            {msg.name && <span className="font-medium">{msg.name}</span>}
            {msg.timestamp && <span>{msg.timestamp}</span>}
          </div>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted text-foreground",
          )}
        >
          {msg.isStreaming ? (
            <span>
              {msg.content}
              <span className="animate-pulse inline-block w-0.5 h-4 bg-current align-middle ml-0.5" />
            </span>
          ) : (
            msg.content
          )}
        </div>
        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-1 flex flex-col gap-1 w-full">
            {msg.sources.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-xs text-primary underline underline-offset-2 hover:opacity-80"
              >
                {src.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ConversationThread({
  messages,
  isThinking = false,
  renderMessage,
  className,
}: ConversationThreadProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  return (
    <div className={cn("flex flex-col gap-4 overflow-y-auto py-4", className)}>
      {messages.map((msg) =>
        renderMessage ? (
          <div key={msg.id}>{renderMessage(msg)}</div>
        ) : (
          <DefaultMessage key={msg.id} msg={msg} />
        ),
      )}
      {isThinking && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm px-4">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
          <span>Thinking…</span>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export { ConversationThread }
export type { Message }
