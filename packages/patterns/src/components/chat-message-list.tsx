"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface ChatMessageItem {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
  avatarUrl?: string
  name?: string
}

export interface ChatMessageProps {
  message: ChatMessageItem
  isGrouped?: boolean
  className?: string
}

function getInitials(name?: string, role?: ChatMessageItem["role"]): string {
  if (name) {
    return name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  if (role === "user") return "U"
  if (role === "assistant") return "AI"
  return "S"
}

export function ChatMessage({ message, isGrouped = false, className }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser && "flex-row-reverse",
        isGrouped ? "mt-0.5" : "mt-4 first:mt-0",
        className,
      )}
    >
      {!isGrouped ? (
        <Avatar className="h-7 w-7 shrink-0">
          {message.avatarUrl && (
            <AvatarImage src={message.avatarUrl} alt={message.name ?? message.role} />
          )}
          <AvatarFallback className="text-xs">
            {getInitials(message.name, message.role)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-7 w-7 shrink-0" aria-hidden="true" />
      )}

      <div className={cn("flex max-w-[75%] flex-col gap-1", isUser && "items-end")}>
        {!isGrouped && (
          <div className={cn("flex items-baseline gap-2", isUser && "flex-row-reverse")}>
            <span className="text-xs font-medium text-foreground">
              {message.name ??
                (isUser
                  ? "You"
                  : message.role === "assistant"
                    ? "Assistant"
                    : "System")}
            </span>
            {message.timestamp && (
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            )}
          </div>
        )}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted text-foreground",
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

export interface ChatMessageListProps {
  messages: ChatMessageItem[]
  className?: string
}

export function ChatMessageList({ messages, className }: ChatMessageListProps) {
  return (
    <div
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
      className={cn("flex flex-col px-4 py-4", className)}
    >
      {messages.map((message, index) => {
        const prev = messages[index - 1]
        const isGrouped = prev?.role === message.role
        return <ChatMessage key={message.id} message={message} isGrouped={isGrouped} />
      })}
    </div>
  )
}
