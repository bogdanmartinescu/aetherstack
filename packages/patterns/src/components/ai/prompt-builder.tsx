"use client"

import { Plus, Trash2 } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@aetherstack/ui"

type Role = "system" | "user" | "assistant"

interface Turn {
  role: Role
  content: string
}

interface PromptBuilderProps {
  turns?: Turn[]
  onTurnsChange?: (turns: Turn[]) => void
  className?: string
}

const DEFAULT_TURNS: Turn[] = [{ role: "system", content: "" }]

function PromptBuilder({ turns = DEFAULT_TURNS, onTurnsChange, className }: PromptBuilderProps) {
  function updateTurn(index: number, patch: Partial<Turn>) {
    const next = turns.map((t, i) => (i === index ? { ...t, ...patch } : t))
    onTurnsChange?.(next)
  }

  function addTurn() {
    onTurnsChange?.([...turns, { role: "user", content: "" }])
  }

  function removeTurn(index: number) {
    onTurnsChange?.(turns.filter((_, i) => i !== index))
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {turns.map((turn, i) => (
        <Card key={i}>
          <CardContent className="pt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Select
                value={turn.role}
                onValueChange={(v) => updateTurn(i, { role: v as Role })}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {turn.content.length} chars
                </span>
                {turns.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTurn(i)}
                    aria-label="Remove turn"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              value={turn.content}
              onChange={(e) => updateTurn(i, { content: e.target.value })}
              placeholder={`Enter ${turn.role} message…`}
              rows={3}
              className="resize-y"
            />
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={addTurn} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add turn
      </Button>
    </div>
  )
}

export { PromptBuilder }
