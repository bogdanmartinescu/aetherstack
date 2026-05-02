"use client"

import * as React from "react"
import { Plus, Copy, Trash2, Pencil, Search } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Badge,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Label,
  Textarea,
} from "@aetherstack/ui"

interface Prompt {
  id: string
  title: string
  description?: string
  content: string
  category?: string
  tags?: string[]
}

type NewPrompt = Omit<Prompt, "id">

interface PromptLibraryPageProps {
  prompts: Prompt[]
  categories?: string[]
  onInsert?: (content: string) => void
  onSave?: (prompt: NewPrompt) => void
  onDelete?: (id: string) => void
  className?: string
}

const EMPTY_FORM: NewPrompt = { title: "", content: "", description: "", category: "", tags: [] }

function PromptLibraryPage({
  prompts,
  categories = [],
  onInsert,
  onSave,
  onDelete,
  className,
}: PromptLibraryPageProps) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editingPrompt, setEditingPrompt] = React.useState<Prompt | null>(null)
  const [form, setForm] = React.useState<NewPrompt>(EMPTY_FORM)

  const allCategories =
    categories.length > 0
      ? categories
      : Array.from(new Set(prompts.map((p) => p.category).filter(Boolean))) as string[]

  const filtered = prompts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
    const matchesCategory = activeCategory === null || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  function openCreate() {
    setEditingPrompt(null)
    setForm(EMPTY_FORM)
    setDialogOpen(true)
  }

  function openEdit(p: Prompt) {
    setEditingPrompt(p)
    setForm({ title: p.title, content: p.content, description: p.description ?? "", category: p.category ?? "", tags: p.tags ?? [] })
    setDialogOpen(true)
  }

  function handleSave() {
    onSave?.(form)
    setDialogOpen(false)
  }

  return (
    <div className={cn("flex h-full gap-0", className)}>
      <aside className="hidden md:flex w-48 shrink-0 flex-col border-r border-border p-3 gap-1">
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Categories
        </p>
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-md px-2 py-1.5 text-sm text-left transition-colors",
            activeCategory === null ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
          )}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            className={cn(
              "rounded-md px-2 py-1.5 text-sm text-left transition-colors",
              activeCategory === cat ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
            )}
          >
            {cat}
          </button>
        ))}
      </aside>

      <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {onSave && (
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" />
              New prompt
            </Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-12">No prompts found</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card key={p.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{p.title}</CardTitle>
                  {p.description && <CardDescription className="text-xs">{p.description}</CardDescription>}
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
                  <div className="flex items-center gap-1 flex-wrap">
                    {onInsert && (
                      <Button size="sm" onClick={() => onInsert(p.content)}>Insert</Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => void navigator.clipboard.writeText(p.content)}
                      aria-label="Copy"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    {onSave && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)} aria-label="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => onDelete(p.id)}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingPrompt ? "Edit prompt" : "New prompt"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Give it a name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Description</Label>
              <Input
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description (optional)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Input
                value={form.category ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Writing"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Prompt</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Write your prompt here…"
                rows={6}
                className="resize-y"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title.trim() || !form.content.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { PromptLibraryPage }
export type { Prompt as PromptItem }
