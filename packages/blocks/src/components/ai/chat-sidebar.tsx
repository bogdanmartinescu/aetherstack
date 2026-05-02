"use client"

import * as React from "react"
import { Plus, Search, Trash2, Pencil, MoreHorizontal, Check, X } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@aetherstack/ui"

interface Conversation {
  id: string
  title: string
  timestamp?: string
  active?: boolean
}

interface ChatSidebarProps {
  conversations?: Conversation[]
  onNewChat?: () => void
  onConversationClick?: (id: string) => void
  onConversationDelete?: (id: string) => void
  onConversationRename?: (id: string, title: string) => void
  className?: string
}

function ChatSidebar({
  conversations = [],
  onNewChat,
  onConversationClick,
  onConversationDelete,
  onConversationRename,
  className,
}: ChatSidebarProps) {
  const [search, setSearch] = React.useState("")
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editValue, setEditValue] = React.useState("")

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  )

  function startEdit(conv: Conversation) {
    setEditingId(conv.id)
    setEditValue(conv.title)
  }

  function commitEdit(id: string) {
    if (editValue.trim()) {
      onConversationRename?.(id, editValue.trim())
    }
    setEditingId(null)
  }

  return (
    <div className={cn("flex h-full flex-col gap-2 p-3", className)}>
      <Button className="w-full justify-start gap-2" variant="outline" onClick={onNewChat}>
        <Plus className="h-4 w-4" />
        New chat
      </Button>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search chats…"
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        {filtered.map((conv) => (
          <div
            key={conv.id}
            className={cn(
              "group flex items-center gap-1 rounded-md px-2 py-1.5",
              conv.active ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
            )}
          >
            {editingId === conv.id ? (
              <div className="flex flex-1 items-center gap-1">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit(conv.id)
                    if (e.key === "Escape") setEditingId(null)
                  }}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <button onClick={() => commitEdit(conv.id)} aria-label="Save">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </button>
                <button onClick={() => setEditingId(null)} aria-label="Cancel">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <button
                className="flex-1 truncate text-left text-sm"
                onClick={() => onConversationClick?.(conv.id)}
              >
                {conv.title}
              </button>
            )}

            {editingId !== conv.id && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => startEdit(conv)}>
                    <Pencil className="h-3.5 w-3.5 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onConversationDelete?.(conv.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChatSidebar }
