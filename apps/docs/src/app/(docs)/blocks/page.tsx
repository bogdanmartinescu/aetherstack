import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Pre-built, full-section layouts built on Aether UI patterns and primitives.",
}

const BLOCKS = [
  {
    category: "Shells",
    items: [
      { slug: "dashboard-shell", label: "Dashboard Shell", desc: "Full-page SaaS app shell with collapsible sidebar, topbar, and content slot." },
    ],
  },
  {
    category: "Auth",
    items: [
      { slug: "login-block", label: "Login", desc: "Centered login card with email, password, remember-me, and forgot-password link." },
      { slug: "signup-block", label: "Sign Up", desc: "Sign-up form with name, email, and password fields and inline validation." },
    ],
  },
  {
    category: "Dashboard",
    items: [
      { slug: "empty-dashboard", label: "Empty Dashboard", desc: "Zero-state landing screen for new users with illustration and CTA actions." },
      { slug: "onboarding-checklist", label: "Onboarding Checklist", desc: "Step-by-step onboarding guide with progress bar and hide-completed toggle." },
    ],
  },
  {
    category: "Settings",
    items: [
      { slug: "account-settings", label: "Account Settings", desc: "User profile form with avatar, display name, email, and bio fields." },
      { slug: "team-settings", label: "Team Settings", desc: "Member list with role management, invite form, and remove actions." },
    ],
  },
  {
    category: "Billing",
    items: [
      { slug: "billing-overview", label: "Billing Overview", desc: "Current plan card, usage metrics with progress bars, and billing actions." },
    ],
  },
  {
    category: "Feedback",
    items: [
      { slug: "notification-center", label: "Notification Center", desc: "Notification list with read/unread state, mark-all-read, and dismiss actions." },
    ],
  },
  {
    category: "Marketing",
    items: [
      { slug: "pricing-section", label: "Pricing Section", desc: "Responsive 3-tier pricing grid with feature lists and highlighted plan." },
    ],
  },
]

export default function BlocksPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Blocks</h1>
        <p className="text-lg text-muted-foreground">
          Pre-built, full-section layouts built on{" "}
          <Link href="/patterns" className="text-primary underline-offset-4 hover:underline">
            patterns
          </Link>{" "}
          and{" "}
          <Link href="/components" className="text-primary underline-offset-4 hover:underline">
            primitives
          </Link>
          . Copy the source into your project or install via the CLI — you own the code.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-xs text-muted-foreground">Blocks</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">7</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">@aetherstack/blocks</p>
            <p className="text-xs text-muted-foreground">Package</p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {BLOCKS.map((cat) => (
          <div key={cat.category}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cat.category}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cat.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blocks/${item.slug}`}
                  className="group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/40"
                >
                  <p className="mb-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
