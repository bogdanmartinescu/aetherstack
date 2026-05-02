"use client"

import * as React from "react"
import { Copy, Plus } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Button, Badge, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@aetherstack/ui"

interface Prompt {
  id: string
  title: string
  description?: string
  content: string
  category?: string
  tags?: string[]
}

interface PromptLibraryProps {
  prompts: Prompt[]
  categories?: string[]
  onInsert?: (content: string) => void
  onCopy?: (content: string) => void
  className?: string
}

function PromptLibrary({ prompts, categories = [], onInsert, onCopy, className }: PromptLibraryProps) {
  const [search, setSearch] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  const filtered = prompts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchesCategory = activeCategory === null || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const allCategories = categories.length > 0
    ? categories
    : Array.from(new Set(prompts.map((p) => p.category).filter(Boolean))) as string[]

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Search prompts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {allCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                activeCategory === null
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-accent",
              )}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">No prompts found</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.title}</CardTitle>
                {p.description && (
                  <CardDescription>{p.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-3 mt-auto">
                {p.tags && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {onInsert && (
                    <Button size="sm" onClick={() => onInsert(p.content)}>
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Insert
                    </Button>
                  )}
                  {onCopy && (
                    <Button variant="outline" size="sm" onClick={() => onCopy(p.content)}>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      Copy
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export { PromptLibrary }
export type { Prompt }
