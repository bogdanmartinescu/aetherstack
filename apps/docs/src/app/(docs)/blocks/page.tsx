"use client"

import { useState } from "react"
import { DashboardShell } from "@aetherstack/blocks"
import { LoginBlock } from "@aetherstack/blocks"
import { SignupBlock } from "@aetherstack/blocks"
import { MetricCard } from "@aetherstack/patterns"
import { Badge } from "@aetherstack/ui"
import { CodeBlock } from "@/components/code-block"
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// ── Dashboard demo content ────────────────────────────────────────────────────

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard label="Revenue" value="$48,295" change="+12.5%" trend="up" icon={<DollarSign className="h-5 w-5" />} />
        <MetricCard label="Users" value="2,841" change="+8.1%" trend="up" icon={<Users className="h-5 w-5" />} />
        <MetricCard label="Conversion" value="3.24%" change="-0.4%" trend="down" icon={<TrendingUp className="h-5 w-5" />} />
        <MetricCard label="Uptime" value="99.9%" change="0%" trend="neutral" icon={<Activity className="h-5 w-5" />} />
      </div>
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-medium text-foreground">Recent Users</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { name: "Alex Johnson", email: "alex@example.com", plan: "Pro", status: "Active" },
            { name: "Maria Garcia", email: "maria@example.com", plan: "Starter", status: "Active" },
            { name: "Sam Chen", email: "sam@example.com", plan: "Pro", status: "Trialing" },
            { name: "Jordan Lee", email: "jordan@example.com", plan: "Enterprise", status: "Active" },
          ].map((row) => (
            <div key={row.email} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {row.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{row.name}</p>
                <p className="truncate text-xs text-muted-foreground">{row.email}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">{row.plan}</Badge>
              <Badge variant={row.status === "Active" ? "default" : "secondary"} className="text-[10px]">
                {row.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Block entry ───────────────────────────────────────────────────────────────

const DASHBOARD_CODE = `import { DashboardShell } from "@aetherstack/blocks"

export default function DashboardPage() {
  return (
    <DashboardShell
      appName="Acme"
      pageTitle="Dashboard"
    >
      {/* Your page content */}
    </DashboardShell>
  )
}`

const LOGIN_CODE = `import { LoginBlock } from "@aetherstack/blocks"

export default function LoginPage() {
  return (
    <LoginBlock
      appName="Acme"
      tagline="Welcome back — sign in to continue."
      onSubmit={({ email, password }) => {
        // handle sign-in
      }}
    />
  )
}`

const SIGNUP_CODE = `import { SignupBlock } from "@aetherstack/blocks"

export default function SignupPage() {
  return (
    <SignupBlock
      appName="Acme"
      tagline="Create your account to get started."
      onSubmit={({ name, email, password }) => {
        // handle sign-up
      }}
    />
  )
}`

const BLOCKS = [
  {
    id: "dashboard-01",
    title: "Dashboard Shell",
    description: "Full-page SaaS dashboard layout with collapsible sidebar, topbar with search and notifications, and a content slot.",
    category: "Dashboard",
    cliInstall: "npx aether-ui add dashboard-shell",
    code: DASHBOARD_CODE,
    preview: (
      <div className="relative h-[460px] w-full overflow-hidden rounded-md border border-border bg-background">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
        >
          <DashboardShell pageTitle="Dashboard">
            <DashboardContent />
          </DashboardShell>
        </div>
      </div>
    ),
  },
  {
    id: "login-01",
    title: "Login",
    description: "Centered login card with email, password, remember-me checkbox, and forgot-password link. Includes form validation.",
    category: "Auth",
    cliInstall: "npx aether-ui add login-block",
    code: LOGIN_CODE,
    preview: (
      <div className="h-[420px] w-full overflow-hidden rounded-md border border-border bg-muted/20">
        <LoginBlock
          appName="Acme"
          tagline="Welcome back — sign in to continue."
        />
      </div>
    ),
  },
  {
    id: "signup-01",
    title: "Sign Up",
    description: "Sign-up form with name, email, and password fields. Inline validation with error messages and terms/privacy links.",
    category: "Auth",
    cliInstall: "npx aether-ui add signup-block",
    code: SIGNUP_CODE,
    preview: (
      <div className="h-[480px] w-full overflow-hidden rounded-md border border-border bg-muted/20">
        <SignupBlock appName="Acme" />
      </div>
    ),
  },
]

const CATEGORIES = ["All", "Dashboard", "Auth"]

// ── Block card ────────────────────────────────────────────────────────────────

function BlockCard({ block }: { block: (typeof BLOCKS)[number] }) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [codeOpen, setCodeOpen] = useState(false)

  return (
    <section className="space-y-0">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">{block.title}</h2>
            <Badge variant="outline" className="text-[10px]">{block.category}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{block.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-3 w-3" />
            Open
          </a>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mb-2 flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5 w-fit">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded px-3 py-1 text-xs font-medium capitalize transition-colors ${
              tab === t
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Preview / Code */}
      {tab === "preview" ? (
        block.preview
      ) : (
        <div className="space-y-3">
          <CodeBlock code={block.cliInstall} filename="terminal" />
          <CodeBlock code={block.code} filename="page.tsx" />
        </div>
      )}

      {/* Collapsible source toggle */}
      {tab === "preview" && (
        <div className="mt-2">
          <button
            onClick={() => setCodeOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {codeOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {codeOpen ? "Hide" : "View"} source
          </button>
          {codeOpen && (
            <div className="mt-2 space-y-2">
              <CodeBlock code={block.cliInstall} filename="terminal" />
              <CodeBlock code={block.code} filename="page.tsx" />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All"
      ? BLOCKS
      : BLOCKS.filter((b) => b.category === activeCategory)

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 border-b border-border pb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          Building Blocks for the Web
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Pre-built, full-section layouts built on{" "}
          <span className="text-foreground font-medium">@aetherstack/patterns</span> and{" "}
          <span className="text-foreground font-medium">@aetherstack/ui</span>. Copy the source into
          your project or install via the CLI — you own the code.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { value: "3", label: "Blocks" },
            { value: "2", label: "Categories" },
            { value: "@aetherstack/blocks", label: "Package" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-muted/30 px-4 py-3">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-8 flex items-center gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Block list */}
      <div className="space-y-14">
        {filtered.map((block) => (
          <BlockCard key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
