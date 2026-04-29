import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Components",
  description: "Aether UI core primitive components — token-driven, accessible, open-code.",
}

const components = [
  {
    category: "Actions",
    items: [
      { name: "Button", href: "/components/button", description: "Triggers an action. 6 variants, 4 sizes, asChild." },
      { name: "Toggle", href: "/components/toggle", description: "Two-state pressed/unpressed button." },
      { name: "Toggle Group", href: "/components/toggle-group", description: "Single or multiple selection from a set of toggles." },
    ],
  },
  {
    category: "Display",
    items: [
      { name: "Avatar", href: "/components/avatar", description: "User avatar with image and fallback initials." },
      { name: "Badge", href: "/components/badge", description: "Status, category, or count label." },
      { name: "Card", href: "/components/card", description: "Surface container with header, content, footer." },
      { name: "Progress", href: "/components/progress", description: "Horizontal progress bar with animated fill." },
      { name: "Scroll Area", href: "/components/scroll-area", description: "Custom scrollbar overlay for any container." },
      { name: "Separator", href: "/components/separator", description: "Horizontal or vertical visual divider." },
      { name: "Skeleton", href: "/components/skeleton", description: "Loading placeholder that mimics content shape." },
      { name: "Slider", href: "/components/slider", description: "Draggable range input with min, max, and step." },
      { name: "Table", href: "/components/table", description: "Semantic data table with 8 sub-components." },
    ],
  },
  {
    category: "Forms",
    items: [
      { name: "Calendar", href: "/components/calendar", description: "Date picker with single, multiple, and range modes." },
      { name: "Checkbox", href: "/components/checkbox", description: "Binary toggle with indeterminate support." },
      { name: "Combobox", href: "/components/combobox", description: "Searchable select built from cmdk + Radix Popover." },
      { name: "Input", href: "/components/input", description: "Single-line text field. All HTML input types." },
      { name: "Label", href: "/components/label", description: "Accessible form label via Radix UI." },
      { name: "Radio Group", href: "/components/radio-group", description: "Single-select from a set of options." },
      { name: "Select", href: "/components/select", description: "Accessible single-select dropdown." },
      { name: "Switch", href: "/components/switch", description: "On/off slide toggle." },
      { name: "Textarea", href: "/components/textarea", description: "Multi-line text field." },
    ],
  },
  {
    category: "Navigation",
    items: [
      { name: "Accordion", href: "/components/accordion", description: "Collapsible content sections with animated transitions." },
      { name: "Pagination", href: "/components/pagination", description: "Page navigation with prev/next and numbered links." },
      { name: "Tabs", href: "/components/tabs", description: "Layered content panels with tab navigation." },
    ],
  },
  {
    category: "Overlays",
    items: [
      { name: "Context Menu", href: "/components/context-menu", description: "Right-click contextual action menu." },
      { name: "Dialog", href: "/components/dialog", description: "Modal window with focus trap and backdrop." },
      { name: "Dropdown Menu", href: "/components/dropdown-menu", description: "Floating menu anchored to a trigger element." },
      { name: "Hover Card", href: "/components/hover-card", description: "Rich preview card revealed on hover." },
      { name: "Sheet", href: "/components/sheet", description: "Slide-in panel from any screen edge." },
      { name: "Toast", href: "/components/toast", description: "Non-blocking notification messages." },
      { name: "Tooltip", href: "/components/tooltip", description: "Contextual label on hover or focus." },
    ],
  },
]

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Components</h1>
        <p className="text-lg text-muted-foreground">
          31 token-driven, fully accessible, open-code primitives. Each component ships as source
          — you own it, edit it, extend it.
        </p>
      </div>

      {/* Quick stats */}
      <div className="mb-12 grid grid-cols-3 gap-4">
        {[
          { label: "Components", value: "31" },
          { label: "Radix primitives", value: "20" },
          { label: "Test coverage", value: "105 tests" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-muted/50 px-4 py-4">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Component list */}
      <div className="space-y-10">
        {components.map((section) => (
          <div key={section.category}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.category}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/50"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 rounded-lg border border-border bg-muted/50 p-5">
        <p className="text-sm font-medium text-foreground">Open code</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Unlike a traditional component library, Aether UI copies component source directly into
          your project. You own and control each file — no black box, no version lock-in.
        </p>
        <Link
          href="/installation"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
        >
          Installation guide →
        </Link>
      </div>
    </div>
  )
}
