import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Icons",
  description: "Aether UI ships with Lucide React as the default icon library — lightweight, consistent, and tree-shakeable.",
}

const ICON_GROUPS = [
  {
    label: "Navigation & actions",
    icons: [
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
      "ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown",
      "ChevronsUpDown", "Menu", "X", "Plus", "Minus",
      "MoreHorizontal", "MoreVertical", "ExternalLink",
    ],
  },
  {
    label: "Status & feedback",
    icons: [
      "Check", "CheckCircle", "CheckCircle2", "AlertCircle", "AlertTriangle",
      "Info", "XCircle", "Loader2", "RefreshCw", "RotateCcw",
      "Clock", "Timer", "Hourglass",
    ],
  },
  {
    label: "Objects & UI",
    icons: [
      "Search", "Settings", "Settings2", "Filter", "SlidersHorizontal",
      "Bell", "BellOff", "Star", "Bookmark", "Heart",
      "Share2", "Link", "Copy", "Clipboard", "Download", "Upload",
    ],
  },
  {
    label: "Files & data",
    icons: [
      "File", "FileText", "FilePlus", "FileX", "Folder", "FolderOpen",
      "Database", "Table2", "BarChart", "BarChart2", "LineChart", "PieChart",
    ],
  },
  {
    label: "Users & auth",
    icons: [
      "User", "Users", "UserPlus", "UserX", "UserCheck",
      "Lock", "Unlock", "Key", "Shield", "ShieldCheck", "LogIn", "LogOut",
    ],
  },
  {
    label: "Communication",
    icons: [
      "Mail", "MessageSquare", "MessageCircle", "Phone", "Send",
      "Inbox", "Archive", "Trash", "Trash2", "Edit", "Edit2", "Edit3",
    ],
  },
]

export default function IconsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Icons</h1>
        <p className="text-lg text-muted-foreground">
          Aether UI ships <strong className="text-foreground">Lucide React</strong> as its default icon library — 
          a community-maintained set of beautifully consistent, MIT-licensed SVG icons. 
          Over 1,500 icons, all tree-shakeable.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse all icons →
          </a>
          <a
            href="https://github.com/lucide-icons/lucide"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub →
          </a>
        </div>
      </div>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Lucide React is included automatically when you use the CLI to add any Aether UI component. 
          To install it manually:
        </p>
        <CodeBlock
          code={`npm install lucide-react
# or
pnpm add lucide-react
# or
yarn add lucide-react`}
          filename="terminal"
        />
      </section>

      {/* Basic usage */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Basic usage</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Import any icon by name from <code className="rounded bg-muted px-1 font-mono text-xs">lucide-react</code>. 
          Icons are React components that render a 24×24 SVG by default.
        </p>
        <CodeBlock
          code={`import { Search, Settings, ArrowRight } from "lucide-react"

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Search className="h-4 w-4" />
      <Settings className="h-5 w-5 text-muted-foreground" />
      <ArrowRight className="h-4 w-4 text-primary" />
    </div>
  )
}`}
          filename="example.tsx"
        />
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground mb-1">Icon sizing</p>
          <p className="text-sm text-muted-foreground">
            Use Tailwind&apos;s <code className="rounded bg-muted px-1 font-mono text-xs">h-*</code> and{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">w-*</code> classes — or the shorthand{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">size-*</code> — to control icon dimensions. 
            Common sizes: <code className="rounded bg-muted px-1 font-mono text-xs">size-3.5</code> (14px), {" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">size-4</code> (16px), {" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">size-5</code> (20px).
          </p>
        </div>
      </section>

      {/* Usage with Button */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Icons in buttons</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The <code className="rounded bg-muted px-1 font-mono text-xs">Button</code> component includes 
          built-in SVG handling — icons are automatically sized to 16px and never intercept pointer events. 
          No extra classes needed.
        </p>

        <div className="mb-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Button with leading icon</p>
          <CodeBlock
            code={`import { Plus, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Leading icon — just place it before the label
<Button>
  <Plus />
  New item
</Button>

// Trailing icon — place after the label
<Button variant="outline">
  Export
  <Download />
</Button>

// Loading state
<Button disabled>
  <Loader2 className="animate-spin" />
  Saving…
</Button>`}
            filename="button-with-icons.tsx"
          />
        </div>

        <div className="mb-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Icon-only button</p>
          <p className="text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1 font-mono text-xs">size=&quot;icon&quot;</code> for a square button. 
            Always include <code className="rounded bg-muted px-1 font-mono text-xs">aria-label</code> for accessibility.
          </p>
          <CodeBlock
            code={`import { Search, Settings, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

<Button size="icon" aria-label="Search">
  <Search />
</Button>

<Button size="icon" variant="ghost" aria-label="Notifications">
  <Bell />
</Button>

<Button size="icon" variant="outline" aria-label="Settings">
  <Settings />
</Button>

<Button size="icon" variant="destructive" aria-label="Remove">
  <X />
</Button>`}
            filename="icon-button.tsx"
          />
        </div>
      </section>

      {/* Usage with other components */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Icons in other components</h2>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Input with icon</p>
            <CodeBlock
              code={`import { Search } from "lucide-react"

// Wrap input in a relative container, position icon absolutely
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search…" />
</div>`}
              filename="input-with-icon.tsx"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Badge with icon</p>
            <CodeBlock
              code={`import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

<Badge className="gap-1">
  <CheckCircle2 className="h-3 w-3" />
  Approved
</Badge>

<Badge variant="secondary" className="gap-1">
  <Clock className="h-3 w-3" />
  Pending
</Badge>

<Badge variant="destructive" className="gap-1">
  <XCircle className="h-3 w-3" />
  Failed
</Badge>`}
              filename="badge-with-icon.tsx"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Select trigger with icon</p>
            <CodeBlock
              code={`import { Globe } from "lucide-react"

// Custom SelectTrigger with a leading icon
<SelectTrigger className="w-[180px]">
  <Globe className="h-4 w-4 text-muted-foreground" />
  <SelectValue placeholder="Language" />
</SelectTrigger>`}
              filename="select-with-icon.tsx"
            />
          </div>
        </div>
      </section>

      {/* Icon reference */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Common icons reference</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          A curated set of frequently used icons. All available from{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">lucide-react</code>.
          Browse the complete set at{" "}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            lucide.dev/icons
          </a>.
        </p>

        <div className="space-y-8">
          {ICON_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {group.icons.map((icon) => (
                    <code
                      key={icon}
                      className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground hover:text-foreground cursor-default transition-colors"
                    >
                      {icon}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stroke width */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Customization</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          All Lucide icons accept <code className="rounded bg-muted px-1 font-mono text-xs">size</code>, {" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">strokeWidth</code>, and {" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">color</code> props, 
          plus all standard SVG attributes.
        </p>
        <CodeBlock
          code={`import { Star } from "lucide-react"

// Default (size=24, strokeWidth=2)
<Star />

// Smaller, thinner
<Star size={16} strokeWidth={1.5} />

// Using Tailwind for colour
<Star className="text-yellow-500" />

// Filled (set fill to currentColor)
<Star className="fill-yellow-400 text-yellow-400" />`}
          filename="icon-customization.tsx"
        />
      </section>

      {/* A11y */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="space-y-2">
          {[
            "Decorative icons (next to visible text) should be hidden from screen readers with aria-hidden=\"true\".",
            "Icon-only interactive elements (buttons, links) must have an aria-label describing the action.",
            "Avoid using icons as the sole means of conveying status — pair with visible text or a tooltip.",
            "Lucide icons render aria-hidden=\"true\" by default when used inside a labelled element.",
          ].map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 shrink-0 text-primary">→</span>
              {note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
