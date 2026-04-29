/**
 * Prompt resolution engine — maps natural-language UI descriptions to
 * ordered lists of Aether UI registry items to install.
 *
 * This is intentionally keyword-based and deterministic; no LLM is required.
 * The `aether-ui generate` CLI command and the `compose_block` MCP tool both
 * delegate to this module so the resolution logic lives in one place.
 */
import type { Registry, RegistryItem } from "@aetherstack/registry-schema"

export interface GeneratePlan {
  /** Ordered list of registry item names to install. */
  components: string[]
  /** Optional starter TSX file content showing how to compose the items. */
  starterCode?: string
  /** Human-readable explanation of the plan. */
  notes?: string
}

// ---------------------------------------------------------------------------
// Canonical prompt recipes
// Checked before free-text keyword matching.
// ---------------------------------------------------------------------------

type Recipe = {
  keywords: string[]
  components: string[]
  starterCode: string
  notes: string
}

const RECIPES: Recipe[] = [
  {
    keywords: ["saas dashboard", "admin dashboard", "admin panel", "dashboard layout", "dashboard app"],
    components: [
      "dashboard-shell",
      "metric-card",
      "table-toolbar",
      "table",
      "page-header",
      "empty-state",
      "loading-state",
      "error-state",
      "nav",
    ],
    starterCode: `import { DashboardShell } from "@/components/blocks/dashboard-shell"
import { MetricCard } from "@/components/patterns/metric-card"
import { PageHeader } from "@/components/patterns/page-header"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader title="Dashboard" description="Overview of your workspace" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Users" value="2,340" trend="+12%" />
        <MetricCard label="Revenue" value="$48,200" trend="+8%" />
        <MetricCard label="Active Sessions" value="134" trend="-3%" />
        <MetricCard label="Conversion Rate" value="3.2%" trend="+0.4%" />
      </div>
    </DashboardShell>
  )
}`,
    notes:
      "dashboard-shell provides the full-page layout with a collapsible sidebar and topbar. metric-card displays KPIs. Replace placeholder values with real data.",
  },
  {
    keywords: ["login page", "sign in page", "authentication screen", "auth page", "login form"],
    components: ["login-block"],
    starterCode: `import { LoginBlock } from "@/components/blocks/login-block"

export default function LoginPage() {
  return <LoginBlock />
}`,
    notes:
      "login-block is a self-contained login screen. Pass onSubmit and onForgotPassword props to wire it to your auth logic.",
  },
  {
    keywords: ["sign up", "signup page", "registration page", "register page", "create account"],
    components: ["signup-block"],
    starterCode: `import { SignupBlock } from "@/components/blocks/signup-block"

export default function SignupPage() {
  return <SignupBlock />
}`,
    notes:
      "signup-block includes name, email, password validation, and terms/privacy links. Pass onSubmit to handle registration.",
  },
  {
    keywords: ["settings page", "settings form", "profile settings", "account settings", "user settings"],
    components: ["section-header", "form-field", "input", "textarea", "switch", "button"],
    starterCode: `import { SectionHeader, SettingsSection } from "@/components/patterns/section-header"
import { FormField, FormLabel, FormControl, FormDescription } from "@/components/patterns/form-field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <SectionHeader title="Profile" description="Update your personal information" />
      <SettingsSection
        header={<SectionHeader title="Display Name" />}
        footer={<Button>Save changes</Button>}
      >
        <FormField>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Your name" />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
        </FormField>
      </SettingsSection>
    </div>
  )
}`,
    notes:
      "Combine section-header and form-field to build structured settings forms. Each settings section groups related fields.",
  },
  {
    keywords: ["data table", "users table", "list of users", "user list", "sortable table"],
    components: ["table-toolbar", "table", "badge", "button", "empty-state", "loading-state"],
    starterCode: `import { TableToolbar } from "@/components/patterns/table-toolbar"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function UsersTable() {
  return (
    <div className="space-y-4">
      <TableToolbar placeholder="Search users…" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>alice@example.com</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}`,
    notes:
      "table-toolbar provides search and filter controls. Place it above a table component. Use empty-state for zero rows.",
  },
]

// ---------------------------------------------------------------------------
// Keyword → component mapping for free-text fallback
// ---------------------------------------------------------------------------

const KEYWORD_MAP: Array<{ keywords: string[]; component: string }> = [
  { keywords: ["button", "cta", "action", "submit", "click"], component: "button" },
  { keywords: ["card", "panel", "surface", "container"], component: "card" },
  { keywords: ["table", "list", "rows", "grid", "data"], component: "table" },
  { keywords: ["form", "field", "input", "label", "validation", "error"], component: "form-field" },
  { keywords: ["badge", "tag", "pill", "status", "chip"], component: "badge" },
  { keywords: ["dialog", "modal", "popup", "confirm", "alert"], component: "dialog" },
  { keywords: ["sheet", "drawer", "side panel", "slide", "flyout"], component: "sheet" },
  { keywords: ["tabs", "tab", "sections", "panels"], component: "tabs" },
  { keywords: ["metric", "stat", "kpi", "number", "count", "revenue"], component: "metric-card" },
  { keywords: ["navigation", "nav", "sidebar", "menu", "links"], component: "nav" },
  { keywords: ["search", "filter", "toolbar"], component: "table-toolbar" },
  { keywords: ["loading", "spinner", "skeleton", "async", "fetching"], component: "loading-state" },
  { keywords: ["empty", "no data", "no results", "zero"], component: "empty-state" },
  { keywords: ["error", "failed", "retry", "fail"], component: "error-state" },
  { keywords: ["breadcrumb", "page header", "page title"], component: "page-header" },
  { keywords: ["section", "heading", "settings section"], component: "section-header" },
  { keywords: ["select", "dropdown", "picker"], component: "select" },
  { keywords: ["switch", "toggle", "on off"], component: "switch" },
  { keywords: ["checkbox", "check", "accept"], component: "checkbox" },
  { keywords: ["tooltip", "hint", "hover"], component: "tooltip" },
  { keywords: ["textarea", "multiline", "description"], component: "textarea" },
  { keywords: ["skeleton", "placeholder"], component: "skeleton" },
]

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

export function resolveGenerate(description: string, registry: Registry): GeneratePlan {
  const lower = description.toLowerCase()

  // Check canonical recipes first
  for (const recipe of RECIPES) {
    if (recipe.keywords.some((kw) => lower.includes(kw))) {
      return {
        components: filterToRegistryItems(recipe.components, registry),
        starterCode: recipe.starterCode,
        notes: recipe.notes,
      }
    }
  }

  // Keyword-based fallback
  const matched = new Set<string>()
  for (const { keywords, component } of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      matched.add(component)
    }
  }

  // Also try matching against AI prompts in the registry
  for (const item of registry.items) {
    if (item.ai?.prompts?.some((p) => lower.includes(p.toLowerCase()) || p.toLowerCase().includes(lower))) {
      matched.add(item.name)
    }
  }

  if (matched.size === 0) {
    return {
      components: [],
      notes: `Could not match "${description}" to any known Aether UI components. Try a more specific description, or use "list_components" to browse all available items.`,
    }
  }

  const components = filterToRegistryItems([...matched], registry)
  return {
    components,
    notes: `Matched ${components.length} component${components.length === 1 ? "" : "s"} from the description. Install them all with the command above, then compose them in your page.`,
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function filterToRegistryItems(names: string[], registry: Registry): string[] {
  const valid = new Set<string>(registry.items.map((i: RegistryItem) => i.name))
  return names.filter((n) => valid.has(n))
}
