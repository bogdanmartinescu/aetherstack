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
            <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
              {msg.name ? msg.name[0]?.toUpperCase() : "AI"}
            </div>
          )}
        </div>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        {(msg.name ?? msg.timestamp) && (
          <div
            className={cn(
              "text-muted-foreground flex items-center gap-2 text-xs",
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
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm",
          )}
        >
          {msg.isStreaming ? (
            <span>
              {msg.content}
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current align-middle" />
            </span>
          ) : (
            msg.content
          )}
        </div>
        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-1 flex w-full flex-col gap-1">
            {msg.sources.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary truncate text-xs underline underline-offset-2 hover:opacity-80"
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
        <div className="text-muted-foreground flex items-center gap-2 px-4 text-sm">
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style={{ animationDelay: "300ms" }}
            />
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
