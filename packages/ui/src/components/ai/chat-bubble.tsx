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
  const isUser = role === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name ?? "assistant"}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {name ? name[0]?.toUpperCase() : "AI"}
            </div>
          )}
        </div>
      )}

      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
        {(name ?? timestamp) && (
          <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", isUser && "flex-row-reverse")}>
            {name && <span className="font-medium">{name}</span>}
            {timestamp && <span>{timestamp}</span>}
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
