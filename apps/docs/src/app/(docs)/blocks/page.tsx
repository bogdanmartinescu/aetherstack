import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blocks",
  description: "Pre-built, full-section layouts built on Aether UI patterns and primitives.",
}

const BLOCKS = [
  {
    category: "App navigation",
    items: [
      { slug: "app-header", label: "App Header", desc: "Sticky application top nav with logo, route links, and action slots." },
      { slug: "marketing-navbar", label: "Marketing Navbar", desc: "Sticky marketing site nav with logo, centred links, and CTA button." },
      { slug: "footer-section", label: "Footer Section", desc: "Multi-column site footer with links, social icons, and copyright line." },
    ],
  },
  {
    category: "Marketing",
    items: [
      { slug: "landing-hero", label: "Landing Hero", desc: "Hero section with headline, subheading, dual CTAs, and optional media." },
      { slug: "features-section", label: "Features Section", desc: "Responsive feature card grid with icon, title, and description." },
      { slug: "testimonials-section", label: "Testimonials", desc: "Social proof grid of customer quotes with avatar, name, and role." },
      { slug: "cta-section", label: "CTA Section", desc: "Full-width call-to-action banner in default, muted, or primary variant." },
      { slug: "faq-section", label: "FAQ Section", desc: "FAQ accordion with two-column layout when a section heading is provided." },
      { slug: "logo-cloud", label: "Logo Cloud", desc: "Partner/trusted-by logo grid with optional greyscale filter." },
      { slug: "stats-section", label: "Stats Section", desc: "Marketing statistics row with large bold numbers and labels." },
    ],
  },
  {
    category: "User & content",
    items: [
      { slug: "user-profile-page", label: "User Profile", desc: "Profile block with avatar, bio, stats row, and tabbed content." },
      { slug: "pricing-comparison", label: "Pricing Comparison", desc: "Feature comparison table across tiers with checkmarks and highlighted column." },
      { slug: "waitlist-block", label: "Waitlist", desc: "Email waitlist signup with success state after submission." },
      { slug: "changelog-block", label: "Changelog", desc: "Release notes timeline with version, date, tags, and change groups." },
    ],
  },
  {
    category: "Errors",
    items: [
      { slug: "error-page", label: "Error Page", desc: "Full-page 404/500 error state with code, headline, and back link." },
    ],
  },
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
    category: "Marketing (legacy)",
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
            <p className="text-2xl font-bold text-foreground">25</p>
            <p className="text-xs text-muted-foreground">Blocks</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">11</p>
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
