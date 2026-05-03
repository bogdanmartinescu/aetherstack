import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse 65 open-code React components — primitives, AI-native UI, and more. All token-driven, accessible by default, and installable via the Aether UI CLI.",
}

const components = [
  {
    category: "Actions",
    items: [
      { name: "Button", href: "/components/button", description: "Triggers an action. 6 variants, 4 sizes, asChild." },
      { name: "Button Group", href: "/components/button-group", description: "Segmented row of buttons with shared border treatment." },
      { name: "Toggle", href: "/components/toggle", description: "Two-state pressed/unpressed button." },
      { name: "Toggle Group", href: "/components/toggle-group", description: "Single or multiple selection from a set of toggles." },
    ],
  },
  {
    category: "Display",
    items: [
      { name: "Alert", href: "/components/alert", description: "Contextual feedback banner with 5 severity variants." },
      { name: "Aspect Ratio", href: "/components/aspect-ratio", description: "Constrains content to a fixed width/height ratio." },
      { name: "Avatar", href: "/components/avatar", description: "User avatar with image and fallback initials." },
      { name: "Badge", href: "/components/badge", description: "Status, category, or count label." },
      { name: "Card", href: "/components/card", description: "Surface container with header, content, footer." },
      { name: "Carousel", href: "/components/carousel", description: "Touch-friendly slider with prev/next navigation." },
      { name: "Chart", href: "/components/chart", description: "Recharts wrappers with token-based colors. Bar, Line, Area, Pie." },
      { name: "Kbd", href: "/components/kbd", description: "Keyboard key badge for shortcuts and hotkeys." },
      { name: "Progress", href: "/components/progress", description: "Horizontal progress bar with animated fill." },
      { name: "Resizable", href: "/components/resizable", description: "Draggable split-pane panels for adjustable layouts." },
      { name: "Scroll Area", href: "/components/scroll-area", description: "Custom scrollbar overlay for any container." },
      { name: "Separator", href: "/components/separator", description: "Horizontal or vertical visual divider." },
      { name: "Skeleton", href: "/components/skeleton", description: "Loading placeholder that mimics content shape." },
      { name: "Slider", href: "/components/slider", description: "Draggable range input with min, max, and step." },
      { name: "Spinner", href: "/components/spinner", description: "Animated loading indicator with four sizes." },
      { name: "Table", href: "/components/table", description: "Semantic data table with 8 sub-components." },
    ],
  },
  {
    category: "Forms",
    items: [
      { name: "Calendar", href: "/components/calendar", description: "Date picker with single, multiple, and range modes." },
      { name: "Checkbox", href: "/components/checkbox", description: "Binary toggle with indeterminate support." },
      { name: "Combobox", href: "/components/combobox", description: "Searchable select built from cmdk + Radix Popover." },
      { name: "Date Picker", href: "/components/date-picker", description: "Date selection field with Calendar and Popover." },
      { name: "Input", href: "/components/input", description: "Single-line text field. All HTML input types." },
      { name: "Input Group", href: "/components/input-group", description: "Input with left/right addon slots for icons and labels." },
      { name: "Input OTP", href: "/components/input-otp", description: "One-time password input with individual digit slots." },
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
      { name: "Collapsible", href: "/components/collapsible", description: "Expand/collapse any content section with programmatic control." },
      { name: "Menubar", href: "/components/menubar", description: "Application-level menu bar with sub-menus and shortcuts." },
      { name: "Navigation Menu", href: "/components/navigation-menu", description: "Navigation menu with animated content panels." },
      { name: "Pagination", href: "/components/pagination", description: "Page navigation with prev/next and numbered links." },
      { name: "Sidebar", href: "/components/sidebar", description: "Collapsible sidebar with icon-only and full modes." },
      { name: "Tabs", href: "/components/tabs", description: "Layered content panels with tab navigation." },
    ],
  },
  {
    category: "Overlays",
    items: [
      { name: "Alert Dialog", href: "/components/alert-dialog", description: "Blocking confirmation dialog for destructive actions." },
      { name: "Context Menu", href: "/components/context-menu", description: "Right-click contextual action menu." },
      { name: "Dialog", href: "/components/dialog", description: "Modal window with focus trap and backdrop." },
      { name: "Drawer", href: "/components/drawer", description: "Bottom-sheet drawer with drag-to-dismiss gesture." },
      { name: "Dropdown Menu", href: "/components/dropdown-menu", description: "Floating menu anchored to a trigger element." },
      { name: "Hover Card", href: "/components/hover-card", description: "Rich preview card revealed on hover." },
      { name: "Popover", href: "/components/popover", description: "Floating overlay anchored to a trigger for detail panels." },
      { name: "Sheet", href: "/components/sheet", description: "Slide-in panel from any screen edge." },
      { name: "Sonner", href: "/components/sonner", description: "Modern opinionated toast queue with promise support." },
      { name: "Toast", href: "/components/toast", description: "Non-blocking notification messages." },
      { name: "Tooltip", href: "/components/tooltip", description: "Contextual label on hover or focus." },
    ],
  },
  {
    category: "Utilities",
    items: [
      { name: "Visually Hidden", href: "/components/visually-hidden", description: "Hides content visually while keeping it accessible to screen readers." },
    ],
  },
]

export default function ComponentsPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-10">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">Components</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          65 token-driven, fully accessible, open-code primitives — including AI-native components
          for streaming UIs, chat interfaces, and agent-powered applications. Each component ships
          as plain TypeScript source that you install via the CLI and own outright.
        </p>
        <p className="text-sm text-muted-foreground">
          Components are organised into four layers: primitives (this page), patterns, blocks, and
          AI-native UI. Unlike a runtime library, each component you add lives in your codebase
          — edit it, extend it, or replace it at any time. Run{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">npx aether-ui add &lt;name&gt;</code>{" "}
          to install any component in seconds.
        </p>
      </div>

      {/* Quick stats */}
      <div className="mb-12 grid grid-cols-3 gap-4">
        {[
          { label: "Primitives", value: "65" },
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

      {/* AI-native callout */}
      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm font-semibold text-foreground">AI-native components</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Aether UI ships 14 AI-native primitives under <code className="rounded bg-muted px-1 font-mono text-xs">@aetherstack/ui/ai</code> —
          StreamingText, PromptInput, ChatBubble, MarkdownRenderer, ThinkingIndicator, and more.
          They accept both plain strings and <code className="rounded bg-muted px-1 font-mono text-xs">AsyncIterable&lt;string&gt;</code> for streaming,
          and are SDK-agnostic — wire in your own AI provider.
        </p>
        <Link
          href="/llms"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4"
        >
          AI & LLMs documentation →
        </Link>
      </div>

      {/* Footer note */}
      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-5">
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
