import * as React from "react"
import { cn } from "@aetherstack/utils"

interface ChatBubbleProps {
  role: "user" | "assistant" | "system"
  content: React.ReactNode
  avatarUrl?: string
  name?: string
  timestamp?: string
  actions?: React.ReactNode
  className?: string
}

function ChatBubble({
  role,
  content,
  avatarUrl,
  name,
  timestamp,
  actions,
  className,
}: ChatBubbleProps) {
  if (role === "system") {
    return (
      <div
        data-role="system"
        className={cn("flex justify-center px-4", className)}
      >
        <div className="max-w-[80%] rounded-full bg-muted px-3 py-1 text-center text-xs text-muted-foreground [overflow-wrap:anywhere]">
          {content}
          {timestamp && <span className="ml-2 opacity-70">{timestamp}</span>}
        </div>
      </div>
    )
  }

  const isUser = role === "user"

  return (
    <div
      data-role={role}
      className={cn("group flex gap-3", isUser ? "flex-row-reverse" : "flex-row", className)}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name ? "" : "Assistant"}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground"
            >
              {name ? name[0]?.toUpperCase() : "AI"}
            </div>
          )}
        </div>
      )}

      <div className={cn("flex min-w-0 max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        {(name ?? timestamp) && (
          <div
            className={cn(
              "flex items-center gap-2 text-xs text-muted-foreground",
              isUser && "flex-row-reverse",
            )}
          >
            {name && <span className="font-medium">{name}</span>}
            {timestamp && <span>{timestamp}</span>}
          </div>
        )}

        <div
          className={cn(
            "max-w-full rounded-2xl px-4 py-2.5 text-sm [overflow-wrap:anywhere]",
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm bg-muted text-foreground",
          )}
        >
          {content}
        </div>

        {actions && (
          <div className={cn("flex items-center gap-1", isUser && "flex-row-reverse")}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export { ChatBubble }
export type { ChatBubbleProps }
