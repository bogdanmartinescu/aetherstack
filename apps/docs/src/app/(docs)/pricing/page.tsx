import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Aether UI is free for personal and open-source use. Pro unlocks commercial use, advanced components, page templates, vertical kits, premium themes, and more.",
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function Check({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      className={`mt-0.5 h-4 w-4 shrink-0 ${muted ? "text-muted-foreground/40" : "text-primary"}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Cross() {
  return (
    <svg
      className="text-muted-foreground/30 mt-0.5 h-4 w-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function FeatureRow({
  label,
  included,
  note,
  muted,
}: {
  label: string
  included: boolean
  note?: string
  muted?: boolean
}) {
  return (
    <li className="flex items-start gap-2.5 py-1.5">
      {included ? <Check muted={muted} /> : <Cross />}
      <span
        className={`text-sm ${included && !muted ? "text-foreground" : "text-muted-foreground/60"}`}
      >
        {label}
        {note && <span className="text-muted-foreground ml-1.5 text-xs">{note}</span>}
      </span>
    </li>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground/60 mb-2 mt-4 text-[11px] font-semibold uppercase tracking-widest first:mt-0">
      {children}
    </p>
  )
}

// ---------------------------------------------------------------------------
// Feature lists
// ---------------------------------------------------------------------------

const freeFeatures = [
  {
    group: "Components",
    items: [
      "16 UI primitives (Button, Input, Card, Dialog, Table…)",
      "12 patterns (FormField, MetricCard, TableToolbar, Nav…)",
      "3 starter blocks (Dashboard Shell, Login, Sign Up)",
    ],
  },
  {
    group: "Tooling",
    items: [
      "aether-ui CLI — init, add, list, generate",
      "MCP server for Cursor, Claude Desktop, and AI agents",
      "llms.txt + AI metadata on every component",
    ],
  },
  {
    group: "Customisation",
    items: [
      "Full component source — edit anything, own everything",
      "Light, dark, and system theme out of the box",
      "Token-driven design system (swap colours in CSS)",
    ],
  },
  { group: "Support", items: ["Community support via GitHub Discussions"] },
]

const proFeatures = [
  { group: "Licence", items: ["Commercial use — ship in any product or client project"] },
  {
    group: "Advanced components",
    note: "coming soon",
    items: [
      "DataTable — sortable, filterable, paginated data grid",
      "CommandPalette — ⌘K fuzzy-search command surface",
      "Calendar & DatePicker — date + date-range selection",
      "Combobox — autocomplete select with async search",
      "FileDropzone — drag-and-drop file upload with preview",
      "Toast & Notification system — queue, variants, actions",
      "Avatar & AvatarGroup — fallback initials, stacked groups",
      "Stepper / Wizard — multi-step form flow",
      "RichText editor integration (Tiptap-based)",
      "KanbanColumn — drag-and-drop board column",
      "ActivityFeed — timestamped event stream",
      "ColorPicker — hex, HSL, and alpha controls",
    ],
  },
  {
    group: "Page templates",
    note: "coming soon",
    items: [
      "SaaS landing page (hero, features, pricing, CTA)",
      "Marketing site sections (testimonials, logos, FAQ)",
      "Full settings page (profile, billing, notifications, team)",
      "User management page with roles and invites",
      "Analytics dashboard with charts and KPI grid",
      "Blog home + article layout",
      "Portfolio / agency site sections",
      "E-commerce product listing + detail + cart",
      "Waitlist + early-access page",
      "Changelog / release notes page",
    ],
  },
  {
    group: "Vertical kits",
    note: "coming soon",
    items: [
      "SaaS kit — landing, auth, dashboard, settings, billing",
      "Marketing kit — hero, features, pricing, blog, footer",
      "E-commerce kit — listing, detail, cart, checkout",
      "Analytics kit — multi-chart dashboard + reports",
      "CRM kit — contacts, deal pipeline, activity timeline",
    ],
  },
  {
    group: "Premium themes",
    note: "coming soon",
    items: [
      "Slate Pro — cool-gray, professional",
      "Indigo Pro — indigo accent, modern",
      "Onyx — deep dark, high-contrast",
      "Rose — warm, premium consumer feel",
      "Emerald — fresh green-accent palette",
    ],
  },
  {
    group: "AI features",
    note: "coming soon",
    items: [
      "50+ AI Recipes Pro — prompt-to-feature scaffolding",
      "Pro MCP tools — compose_template, scaffold_page",
    ],
  },
  {
    group: "Design assets",
    note: "coming soon",
    items: ["Figma kit — all components with auto-layout and design tokens"],
  },
  {
    group: "Support",
    items: [
      "Priority email support — response within 24 hours",
      "Private Discord channel for Pro members",
      "Early access to all new components before public release",
    ],
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PricingPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Aether UI is{" "}
          <strong className="text-foreground">free for personal and open-source use</strong>. Pro
          unlocks commercial use, a library of advanced components, complete page templates,
          vertical kits, premium themes, and more — with full source ownership on everything.
        </p>
      </div>

      {/* Early-access banner */}
      <div className="border-primary/30 bg-primary/5 mb-8 rounded-xl border px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg">🚀</span>
          <div>
            <p className="text-foreground mb-0.5 text-sm font-semibold">
              Founding Member pricing — limited spots
            </p>
            <p className="text-muted-foreground text-sm">
              Lock in <strong className="text-foreground">$49 / year</strong> (regular price{" "}
              <span className="line-through">$79</span>) or grab the{" "}
              <strong className="text-foreground">$149 lifetime deal</strong> (regular{" "}
              <span className="line-through">$249</span>) before Pro launches. Early access pricing
              is available to the first 300 members and won&apos;t return.
            </p>
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {/* Personal */}
        <div className="border-border bg-card flex flex-col rounded-xl border p-6">
          <div className="mb-5">
            <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">
              Personal
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground text-4xl font-bold tracking-tight">Free</span>
              <span className="text-muted-foreground text-sm">forever</span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Personal projects, learning, and open-source work.
            </p>
          </div>

          <Link
            href="/installation"
            className="border-border bg-background text-foreground hover:bg-muted mb-6 inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            Get started free
          </Link>

          <ul className="flex flex-col">
            {freeFeatures.map((group) => (
              <div key={group.group}>
                <SectionLabel>{group.group}</SectionLabel>
                {group.items.map((item) => (
                  <FeatureRow key={item} label={item} included />
                ))}
              </div>
            ))}
            <div>
              <SectionLabel>Not included</SectionLabel>
              {[
                "Commercial use",
                "Pro components & templates",
                "Vertical kits",
                "Premium themes",
                "Priority support",
              ].map((item) => (
                <FeatureRow key={item} label={item} included={false} />
              ))}
            </div>
          </ul>
        </div>

        {/* Pro */}
        <div className="border-primary/40 bg-card ring-primary/20 flex flex-col rounded-xl border p-6 ring-1">
          <div className="mb-5">
            <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              <span className="bg-primary h-1.5 w-1.5 rounded-full" />
              Coming soon
            </div>
            <p className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">
              Pro
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground text-4xl font-bold tracking-tight">$79</span>
              <span className="text-muted-foreground text-sm">/ year</span>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              or <strong className="text-foreground">$249</strong> once, forever
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Commercial products, client work, and teams. One licence per project, unlimited
              developers.
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <button
              disabled
              className="bg-primary text-primary-foreground inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg px-4 py-2 text-sm font-medium opacity-50"
            >
              Buy Pro — $79 / year
            </button>
            <button
              disabled
              className="border-primary/40 bg-primary/5 text-primary inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium opacity-50"
            >
              Lifetime deal — $149 <span className="ml-1.5 line-through opacity-60">$249</span>
            </button>
          </div>

          <ul className="flex flex-col">
            <div>
              <SectionLabel>Everything in Personal, plus</SectionLabel>
            </div>
            {proFeatures.map((group) => (
              <div key={group.group}>
                <SectionLabel>
                  {group.group}
                  {"note" in group && group.note ? ` — ${group.note}` : ""}
                </SectionLabel>
                {group.items.map((item) => (
                  <FeatureRow
                    key={item}
                    label={item}
                    included
                    muted={"note" in group && !!group.note}
                  />
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>

      {/* Team callout */}
      <div className="border-border bg-muted/30 mb-12 rounded-lg border px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-foreground mb-0.5 text-sm font-semibold">
              Need more than one project?
            </p>
            <p className="text-muted-foreground text-sm">
              A <strong className="text-foreground">Team licence</strong> covers 5 projects for{" "}
              <strong className="text-foreground">$199 / year</strong>. Unlimited developers per
              project. Ideal for agencies and product studios.
            </p>
          </div>
          <button
            disabled
            className="border-border bg-background text-muted-foreground shrink-0 cursor-not-allowed rounded-lg border px-4 py-2 text-sm font-medium opacity-50"
          >
            Coming soon
          </button>
        </div>
      </div>

      {/* What counts as commercial */}
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          What counts as commercial use?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-foreground mb-3 text-sm font-medium">Requires a Pro licence</p>
            <ul className="space-y-2">
              {[
                "SaaS or web app that generates revenue",
                "Client project — work you are paid to deliver",
                "Internal tool at a for-profit business",
                "Product sold or licensed to others",
              ].map((item) => (
                <li key={item} className="text-muted-foreground flex items-start gap-2.5 text-sm">
                  <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-foreground mb-3 text-sm font-medium">Always free</p>
            <ul className="space-y-2">
              {[
                "Personal projects with no revenue",
                "Open-source projects (any licence)",
                "Learning, demos, and experimentation",
                "Non-profit and educational use",
              ].map((item) => (
                <li key={item} className="text-muted-foreground flex items-start gap-2.5 text-sm">
                  <span className="bg-muted-foreground/40 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Open-code model */}
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold tracking-tight">
          Why open code?
        </h2>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          Aether UI is not a npm dependency you keep up to date. The CLI copies component source
          files directly into your project. You own every line — edit, extend, or delete anything.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "No runtime dependency",
              body: "Components live in your repo. No package to update, no breaking API changes forced on you.",
            },
            {
              title: "Full customisation",
              body: "Change the markup, restyle variants, add props. It's your code — no wrapper API to fight.",
            },
            {
              title: "Licence tied to install-time",
              body: "Components you've installed are yours to keep, ship, and modify regardless of your subscription status.",
            },
            {
              title: "One licence per project",
              body: "A Pro licence covers one production project and all the developers working on it — no per-seat counting.",
            },
          ].map((card) => (
            <div key={card.title} className="border-border bg-muted/30 rounded-lg border p-4">
              <p className="text-foreground mb-1 text-sm font-semibold">{card.title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-foreground mb-6 text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="divide-border divide-y">
          {[
            {
              q: "Can I prototype for free and buy Pro before launch?",
              a: "Yes. Build and iterate with the Personal tier, then purchase Pro before you go live or start generating revenue.",
            },
            {
              q: "Per developer or per project?",
              a: "Per project. One Pro licence covers one production deployment and all the developers working on it — no matter how many there are.",
            },
            {
              q: "What happens to my code if I cancel?",
              a: "Nothing. Components you've already installed stay in your codebase and you can keep shipping with them. Cancelling stops new pro-registry installs and support access — it doesn't break code you already own.",
            },
            {
              q: "Is the source code public?",
              a: "Public registry components (@aether) are MIT-licensed and openly available. Pro components (@aether-pro) require an active licence to install, but once installed the source is yours and you can inspect, modify, or fork it freely.",
            },
            {
              q: "What is the Lifetime deal exactly?",
              a: "A one-time payment that gives you Pro access forever — all future components, templates, kits, and themes included. No subscription, no renewal. The launch price of $149 is a limited-time offer; the regular lifetime price will be $249.",
            },
            {
              q: "I'm building an open-source project used in commercial products — do I need a licence?",
              a: "No. Open-source projects are always free. End users who build commercial products on top of your project handle their own licensing.",
            },
            {
              q: "Can I use Aether UI for multiple projects under one licence?",
              a: "One Pro licence covers one production project. For multiple projects, use the Team licence ($199/year, 5 projects) or contact us for a custom arrangement.",
            },
            {
              q: "How does Pro access work with the CLI?",
              a: "Run aether-ui login to authenticate via the account dashboard. The CLI stores a short-lived token locally. After that, aether-ui add <pro-item> works automatically — no manual copy-pasting of keys required.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="py-4">
              <p className="text-foreground mb-1.5 text-sm font-semibold">{q}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-border bg-muted/30 rounded-xl border px-6 py-8 text-center">
        <p className="text-foreground mb-1 text-lg font-semibold">Start building for free today.</p>
        <p className="text-muted-foreground mb-6 text-sm">
          The full public component library is free. No account required. Upgrade to Pro when
          you&apos;re ready to ship commercially.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/installation"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium transition-colors"
          >
            Get started free
          </Link>
          <Link
            href="/components"
            className="border-border bg-background text-foreground hover:bg-muted inline-flex items-center rounded-lg border px-5 py-2 text-sm font-medium transition-colors"
          >
            Browse components
          </Link>
        </div>
      </div>
    </div>
  )
}
