import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { REGISTRY_STATS } from "@/lib/registry-stats"

export const metadata: Metadata = {
  title: "Introduction",
  description: "Aether UI — a premium open-code design system for SaaS dashboards and admin interfaces.",
}

function Principle({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export default function IntroductionPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Aether UI · v0.1.0
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">Introduction</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Aether UI is a <strong className="text-foreground">premium open-code design system</strong> for 
          building SaaS dashboards and admin interfaces. Components are installed directly into your project 
          via the CLI — you own the source, not a dependency.
        </p>
      </div>

      {/* What it is */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">What is Aether UI?</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Aether UI is <strong className="text-foreground">not a component library</strong> in the traditional 
          sense. You don&apos;t install it as a package and import components from it in your app. 
          Instead, the CLI copies component source files into your project — you get the full source code, 
          tailored to your path aliases and configuration.
        </p>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          This approach solves a common pain point: with traditional libraries you end up fighting the 
          library when you need to customize a component. With Aether UI you simply edit the file.
        </p>
        <div className="rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm">
          <span className="text-muted-foreground"># Install a component into your project</span>
          <br />
          <span className="text-foreground">npx aether-ui add button</span>
          <br />
          <br />
          <span className="text-muted-foreground"># The component now lives in your project</span>
          <br />
          <span className="text-foreground">src/components/ui/button.tsx</span>
        </div>
      </section>

      {/* Design principles */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Design principles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Principle title="Open code">
            Every component is plain, readable TypeScript and JSX. No magic, no wrappers, no black boxes. 
            What you see in the docs is what lives in your project.
          </Principle>
          <Principle title="Token-driven">
            All visual values — colors, radius, shadows, motion — are CSS variables backed by a design token 
            system. Theming is a single CSS override, not a rebuild.
          </Principle>
          <Principle title="Accessible by default">
            Built on Radix UI primitives — keyboard navigation, ARIA roles, focus management, and screen 
            reader support are built in, not bolted on.
          </Principle>
          <Principle title="Composable">
            Every component uses a consistent, composable API. Primitives compose into patterns, patterns 
            compose into blocks. Nothing is a one-off.
          </Principle>
          <Principle title="Registry-native">
            The component registry format is compatible with shadcn/ui — components can be distributed, 
            versioned, and diffed from any registry endpoint.
          </Principle>
          <Principle title="AI-ready">
            Plain source in your project means LLMs can read, understand, and improve your components 
            without library-specific knowledge.
          </Principle>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Architecture layers</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Aether UI is structured in four layers. Each layer may depend on the layers below it, never above.
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          {[
            {
              layer: "4 — Blocks",
              pkg: "@aetherstack/blocks",
              desc: `${REGISTRY_STATS.blocks} page-level compositions: dashboard shells, auth pages, full-page layouts.`,
            },
            {
              layer: "3 — Patterns",
              pkg: "@aetherstack/patterns",
              desc: `${REGISTRY_STATS.patterns} app-level compound components: Form Field, Page Header, Table Toolbar, etc.`,
            },
            {
              layer: "2 — Primitives",
              pkg: "@aetherstack/ui",
              desc: `${REGISTRY_STATS.primitives} foundational components: Button, Input, Dialog, Tabs, etc.`,
            },
            {
              layer: "1 — Tokens",
              pkg: "@aetherstack/tokens",
              desc: "Design tokens: colors, spacing, typography, radius, shadows, motion.",
            },
          ].map((row, i) => (
            <div
              key={row.layer}
              className={`flex items-start gap-4 px-4 py-3.5 ${i < 3 ? "border-b border-border" : ""}`}
            >
              <div className="w-28 shrink-0 text-xs font-medium text-muted-foreground">{row.layer}</div>
              <div className="min-w-0 flex-1">
                <code className="text-xs font-mono text-foreground">{row.pkg}</code>
                <p className="mt-0.5 text-xs text-muted-foreground">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Built with</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { name: "React 18+", desc: "Component model" },
            { name: "TypeScript", desc: "Strict typing throughout" },
            { name: "Tailwind CSS", desc: "Utility-first styling" },
            { name: "Radix UI", desc: "Accessible primitives" },
            { name: "Lucide React", desc: "Default icon library" },
            { name: "CVA", desc: "Variant management" },
          ].map((tech) => (
            <div key={tech.name} className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="text-sm font-medium text-foreground">{tech.name}</p>
              <p className="text-xs text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Quick start</h2>
        <CodeBlock
          code={`# 1. Initialize Aether UI in your project
npx aether-ui@latest init

# 2. Add components
npx aether-ui add button input label badge card

# 3. Import and use
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"`}
          filename="terminal"
        />
        <p className="mt-4 text-sm text-muted-foreground">
          For a complete walkthrough with framework-specific steps, see the{" "}
          <Link href="/installation" className="text-primary underline-offset-4 hover:underline">
            Installation guide
          </Link>.
        </p>
      </section>

      {/* Comparison */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
          How is this different from shadcn/ui?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Aether UI follows the same open-code philosophy as shadcn/ui and its registry format is compatible 
          with the shadcn/ui convention. The key differences:
        </p>
        <div className="overflow-hidden rounded-lg border border-border text-sm">
          <div className="grid grid-cols-3 gap-0 border-b border-border bg-muted/50 px-4 py-2.5 font-medium text-foreground">
            <span></span>
            <span>Aether UI</span>
            <span>shadcn/ui</span>
          </div>
          {[
            ["Focus", "SaaS dashboards, admin UI", "General purpose"],
            ["CLI", "aether-ui (own binary)", "shadcn@latest"],
            ["Token system", "Dedicated @aetherstack/tokens package", "CSS variables in globals.css"],
            ["Registry", "Self-hosted compatible", "ui.shadcn.com"],
            ["Component style", "Default + New York", "Default + New York"],
            ["Icons", "Lucide React (pre-wired)", "Lucide React"],
          ].map(([feature, ours, theirs]) => (
            <div key={feature as string} className="grid grid-cols-3 gap-0 border-b border-border px-4 py-2.5 last:border-0 hover:bg-muted/20 transition-colors">
              <span className="text-muted-foreground">{feature}</span>
              <span className="text-foreground">{ours}</span>
              <span className="text-muted-foreground">{theirs}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Next steps</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { href: "/installation", title: "Installation", desc: "Set up Aether UI in your framework" },
            { href: "/cli", title: "CLI reference", desc: "All commands and configuration options" },
            { href: "/components", title: "Components", desc: `Browse all ${REGISTRY_STATS.primitives} primitives` },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/40"
            >
              <p className="mb-1 text-sm font-semibold text-foreground">{link.title} →</p>
              <p className="text-xs text-muted-foreground">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
