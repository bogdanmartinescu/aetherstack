import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Check, LayoutTemplate } from "lucide-react"
import { Badge, Button, CodeBlock, Switch } from "@aetherstack/ui"
import { MetricCard } from "@aetherstack/patterns"
import { GitHubIcon } from "@/components/docs-sidebar"
import { ThemeToggle } from "@/components/theme-font-controls"
import { HeroChatDemo } from "@/components/landing/hero-chat-demo"
import { InstallCommand } from "@/components/landing/install-command"
import { REGISTRY_BLOCKS, REGISTRY_STATS } from "@/lib/registry-stats"

export const metadata: Metadata = {
  title: { absolute: "Aether UI — React components for SaaS and AI products" },
  description:
    "An open-code design system for React and Tailwind. Install accessible, token-themed primitives, patterns, blocks and AI chat components as source you own.",
}

const GITHUB_URL = "https://github.com/bogdanmartinescu/aetherstack"
const AI_PRIMITIVE_COUNT = 14

const NAV_LINKS = [
  { label: "Docs", href: "/introduction" },
  { label: "Components", href: "/components" },
  { label: "Patterns", href: "/patterns" },
  { label: "Blocks", href: "/blocks" },
  { label: "AI & MCP", href: "/llms" },
] as const

const SWATCHES = [
  { label: "primary", className: "bg-primary" },
  { label: "secondary", className: "bg-secondary" },
  { label: "accent", className: "bg-accent" },
  { label: "muted", className: "bg-muted" },
  { label: "destructive", className: "bg-destructive" },
] as const

const INSTALLED_FILE = `import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SaveBar({ saving }: { saving: boolean }) {
  return (
    <Button loading={saving} iconRight={<ArrowRight />}>
      Save changes
    </Button>
  )
}`

const MCP_CONFIG = `{
  "mcpServers": {
    "aether-ui": {
      "command": "npx",
      "args": ["-y", "@aetherstack/mcp-server"]
    }
  }
}`

const MCP_TOOLS = [
  "list_components",
  "get_component",
  "install_component",
  "compose_block",
] as const

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Layers />
        <InstallSection />
        <AiSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────

function SiteHeader() {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden="true"
            className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold"
          >
            A
          </span>
          Aether UI
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-5 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={GITHUB_URL} aria-label="Aether UI on GitHub">
              <GitHubIcon className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" asChild className="ml-2">
            <Link href="/introduction">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const facts = [
    `${REGISTRY_STATS.primitives} primitives`,
    `${REGISTRY_STATS.patterns} patterns`,
    `${REGISTRY_STATS.blocks} blocks`,
    `${AI_PRIMITIVE_COUNT} AI components`,
    "MIT licensed",
  ]

  return (
    <section className="border-border relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:py-24">
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
          <Link
            href="/llms"
            className="border-border bg-muted/60 text-muted-foreground hover:text-foreground group mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
          >
            <span className="bg-primary h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            MCP server for AI coding agents
            <ArrowRight
              className="h-3 w-3 transition-transform motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            UI for SaaS and AI products, installed as code you own.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg">
            Aether UI is an open-code design system for React and Tailwind. One command copies
            accessible, token-themed components into your repo as plain TypeScript, ready to edit
            and easy for your AI agent to read.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild iconRight={<ArrowRight />}>
              <Link href="/components">Browse components</Link>
            </Button>
            <InstallCommand command="npx @aetherstack/cli init" />
          </div>
          <ul className="text-muted-foreground mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {facts.map((fact) => (
              <li key={fact} className="flex items-center gap-1.5">
                <Check className="text-primary h-3.5 w-3.5" aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
          <HeroChatDemo />
        </div>
      </div>
    </section>
  )
}

// ── Layers ────────────────────────────────────────────────────────────────────

function Layers() {
  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Architecture"
          title="One system, four layers. Use as much as you need."
          description="Every layer builds only on the ones below it, so you can drop in a single button or a whole settings page without pulling in the rest."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LayerCard
            step="01"
            title="Tokens"
            description="Colour, radius and type as CSS variables. Swap a theme without touching components."
            href="/tokens"
            linkLabel="View tokens"
          >
            <div className="flex gap-1.5">
              {SWATCHES.map((swatch) => (
                <span
                  key={swatch.label}
                  title={swatch.label}
                  className={`border-border h-8 flex-1 rounded-md border ${swatch.className}`}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-1.5">
              {["rounded-sm", "rounded-md", "rounded-lg", "rounded-full"].map((radius) => (
                <span
                  key={radius}
                  className={`border-border bg-muted h-6 flex-1 border ${radius}`}
                />
              ))}
            </div>
          </LayerCard>

          <LayerCard
            step="02"
            title="Primitives"
            description={`${REGISTRY_STATS.primitives} accessible building blocks on Radix, with every state handled.`}
            href="/components"
            linkLabel="Browse primitives"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Button size="xs">Save</Button>
              <Button size="xs" variant="outline">
                Cancel
              </Button>
              <Button size="xs" variant="secondary" loading>
                Saving
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Switch defaultChecked aria-label="Example switch" />
              <Badge variant="secondary">Beta</Badge>
            </div>
          </LayerCard>

          <LayerCard
            step="03"
            title="Patterns"
            description={`${REGISTRY_STATS.patterns} product-level pieces such as data tables, steppers and metric cards.`}
            href="/patterns"
            linkLabel="Browse patterns"
          >
            <MetricCard
              label="MRR"
              value="$48.2k"
              change="+12.4%"
              trend="up"
              className="shadow-none"
            />
          </LayerCard>

          <LayerCard
            step="04"
            title="Blocks"
            description={`${REGISTRY_STATS.blocks} full sections: dashboards, auth, billing and settings pages.`}
            href="/blocks"
            linkLabel="Browse blocks"
          >
            <ul className="space-y-1.5 text-xs">
              {REGISTRY_BLOCKS.slice(0, 4).map((block) => (
                <li key={block.name}>
                  <Link
                    href={`/blocks/${block.name}`}
                    className="border-border bg-background text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-md border px-2 py-1.5 transition-colors"
                  >
                    <LayoutTemplate className="h-3.5 w-3.5" aria-hidden="true" />
                    {block.title}
                  </Link>
                </li>
              ))}
            </ul>
          </LayerCard>
        </div>
      </div>
    </section>
  )
}

function LayerCard({
  step,
  title,
  description,
  href,
  linkLabel,
  children,
}: {
  step: string
  title: string
  description: string
  href: string
  linkLabel: string
  children: ReactNode
}) {
  return (
    <div className="border-border bg-card flex flex-col rounded-xl border p-5">
      <div className="border-border bg-muted/30 mb-5 min-h-[88px] rounded-lg border p-3">
        {children}
      </div>
      <span className="text-muted-foreground font-mono text-xs">{step}</span>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1.5 flex-1 text-sm">{description}</p>
      <Link
        href={href}
        className="text-primary group mt-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        {linkLabel}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}

// ── Install ───────────────────────────────────────────────────────────────────

function InstallSection() {
  const steps = [
    {
      command: "npx aether-ui init",
      description: "Adds the theme tokens, Tailwind preset and the cn() helper to your project.",
    },
    {
      command: "npx aether-ui add button prompt-input",
      description: "Copies each component and its dependencies into components/ui.",
    },
    {
      command: "git diff",
      description:
        "It is your code now. Change the styles, the API, anything. There is no runtime package to upgrade.",
    },
  ]

  return (
    <section className="border-border border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Open code"
            title="Copy the source, not a dependency."
            description="Works with Next.js, Vite, Remix, Astro and TanStack Start. The registry format follows the shadcn/ui convention."
          />
          <ol className="mt-10 space-y-6">
            {steps.map((step, index) => (
              <li key={step.command} className="flex gap-4">
                <span className="border-border text-muted-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <code className="font-mono text-sm font-medium">{step.command}</code>
                  <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <CodeBlock
          code={INSTALLED_FILE}
          language="tsx"
          filename="components/save-bar.tsx"
          highlightLines={[6]}
          className="min-w-0"
        />
      </div>
    </section>
  )
}

// ── AI ────────────────────────────────────────────────────────────────────────

function AiSection() {
  const points = [
    {
      title: `${AI_PRIMITIVE_COUNT} AI interface components`,
      description:
        "Streaming text, prompt input, tool calls, reasoning, sources and feedback. They take strings or AsyncIterable<string>, so they work with any AI SDK.",
      href: "/components",
    },
    {
      title: "An MCP server for your editor",
      description: `Cursor and Claude can list, read and install components through ${MCP_TOOLS.length} tools: ${MCP_TOOLS.join(", ")}.`,
      href: "/llms",
    },
    {
      title: "llms.txt and prompt-to-page",
      description:
        "Every registry item ships AI metadata. aether-ui generate turns a description into installs and a starter page.",
      href: "/cli",
    },
  ]

  return (
    <section className="border-border bg-muted/30 border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div className="order-2 min-w-0 lg:order-1">
          <CodeBlock code={MCP_CONFIG} language="json" filename=".cursor/mcp.json" />
          <div className="mt-3">
            <CodeBlock
              code={`npx aether-ui generate "a billing page with usage meters and an invoice table"`}
              language="bash"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="AI-native"
            title="Built for AI products, and for the agents that build them."
          />
          <ul className="mt-10 space-y-6">
            {points.map((point) => (
              <li key={point.title}>
                <Link href={point.href} className="group block">
                  <h3 className="flex items-center gap-1.5 font-semibold">
                    {point.title}
                    <ArrowRight
                      className="text-muted-foreground h-3.5 w-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">{point.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ── Closing CTA ───────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start with one component.
          </h2>
          <p className="text-muted-foreground mt-2">
            Add a button today and the rest of the system when you need it.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <InstallCommand command="npx aether-ui add button" />
          <Button size="lg" variant="outline" asChild>
            <Link href="/installation">Installation guide</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function SiteFooter() {
  const columns = [
    {
      heading: "Docs",
      links: [
        { label: "Introduction", href: "/introduction" },
        { label: "Installation", href: "/installation" },
        { label: "CLI", href: "/cli" },
        { label: "Tokens", href: "/tokens" },
      ],
    },
    {
      heading: "Library",
      links: [
        { label: "Components", href: "/components" },
        { label: "Patterns", href: "/patterns" },
        { label: "Charts", href: "/charts" },
        { label: "Blocks", href: "/blocks" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "AI & MCP", href: "/llms" },
        { label: "Pricing", href: "/pricing" },
        { label: "GitHub", href: GITHUB_URL },
      ],
    },
  ]

  return (
    <footer className="border-border border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto_auto_auto] md:gap-16">
        <div>
          <span className="font-semibold">Aether UI</span>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm">
            An open-code design system by Aetherstack. MIT licensed.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-medium">{column.heading}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

// ── Shared ────────────────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-primary text-sm font-medium">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground mt-4">{description}</p>}
    </div>
  )
}
