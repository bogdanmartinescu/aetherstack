import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Patterns",
  description: "Reusable product-level UI compositions built on Aether UI primitives.",
}

const PATTERNS = [
  {
    category: "Forms",
    items: [
      { slug: "form-field", label: "Form Field", desc: "Label + control + helper text + error message composition with context hook." },
      { slug: "login-form", label: "Login Form", desc: "Email + password sign-in with remember-me, validated with react-hook-form and Zod." },
      { slug: "signup-form", label: "Sign Up Form", desc: "Registration form with password strength meter and confirmation field." },
      { slug: "profile-form", label: "Profile Settings Form", desc: "Multi-section settings form with Select, Switch, character counter, and dirty detection." },
      { slug: "contact-form", label: "Contact Form", desc: "Name, email, subject select, and textarea with a post-submit success state." },
    ],
  },
  {
    category: "Page structure",
    items: [
      { slug: "page-header", label: "Page Header", desc: "Title, description, breadcrumb, and actions slot for page-level headings." },
      { slug: "breadcrumb", label: "Breadcrumb", desc: "Accessible crumb trail with configurable separator." },
      { slug: "section-header", label: "Section Header", desc: "Lightweight block heading with optional action." },
      { slug: "settings-section", label: "Settings Section", desc: "Structured settings card: header, content body, optional footer." },
    ],
  },
  {
    category: "State patterns",
    items: [
      { slug: "empty-state", label: "Empty State", desc: "Icon, title, description and optional CTA for zero-data views." },
      { slug: "loading-state", label: "Loading State", desc: "Centered spinner or skeleton-row variant for async loading." },
      { slug: "error-state", label: "Error State", desc: "Error icon, title, description and retry CTA." },
    ],
  },
  {
    category: "Data display",
    items: [
      { slug: "metric-card", label: "Metric Card", desc: "Dashboard stat card: label, value, trend badge, icon." },
      { slug: "stat-group", label: "Stat Group", desc: "Responsive grid of stat cards with labels, values, and delta indicators." },
      { slug: "data-table", label: "Data Table", desc: "Sortable, searchable, paginated table built on the Table primitive." },
      { slug: "activity-feed", label: "Activity Feed", desc: "Chronological timeline of events with user avatars and relative timestamps." },
    ],
  },
  {
    category: "Toolbars",
    items: [
      { slug: "table-toolbar", label: "Table Toolbar", desc: "Search + filter + actions layout above a Table." },
      { slug: "filter-toolbar", label: "Filter Toolbar", desc: "Active filter pills with clear-all and additional filter slots." },
    ],
  },
  {
    category: "Navigation",
    items: [
      { slug: "nav", label: "Sidebar Nav", desc: "NavItem, NavGroup, and SidebarNav composable building blocks." },
    ],
  },
  {
    category: "Inputs",
    items: [
      { slug: "color-picker", label: "Color Picker", desc: "Hex color picker with native input, text field, and preset swatches." },
    ],
  },
  {
    category: "Overlays & commands",
    items: [
      { slug: "command-palette", label: "Command Palette", desc: "Keyboard-driven ⌘K command palette with grouped results and fuzzy search." },
    ],
  },
  {
    category: "Uploads",
    items: [
      { slug: "file-dropzone", label: "File Dropzone", desc: "Drag-and-drop upload zone with click-to-browse, type filtering, and size limits." },
    ],
  },
  {
    category: "Workflows",
    items: [
      { slug: "stepper", label: "Stepper", desc: "Multi-step progress indicator with horizontal and vertical orientations." },
      { slug: "kanban", label: "Kanban Board", desc: "Drag-and-drop Kanban board with columns, cards, and drop-zone highlighting." },
    ],
  },
]

export default function PatternsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Patterns</h1>
        <p className="text-lg text-muted-foreground">
          Higher-level UI compositions built on top of the{" "}
          <Link href="/components" className="text-primary underline-offset-4 hover:underline">
            primitive components
          </Link>
          . Patterns represent real application use cases found across SaaS products and admin interfaces.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Patterns</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-2xl font-bold text-foreground">@aetherstack/patterns</p>
            <p className="text-xs text-muted-foreground">Package</p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {PATTERNS.map((cat) => (
          <div key={cat.category}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {cat.category}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cat.items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/patterns/${item.slug}`}
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
