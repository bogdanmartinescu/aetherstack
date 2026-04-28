import type { Metadata } from "next"
import { TableToolbar } from "@aetherstack/patterns"
import { Button, Input } from "@aetherstack/ui"
import { Search, SlidersHorizontal, Download } from "lucide-react"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Table Toolbar",
  description: "Search + filter + actions layout above a data table.",
}

export default function TableToolbarPage() {
  return (
    <PatternPage
      name="Table Toolbar"
      description="A flexible toolbar that sits above a data table. Left slot for search and filters, right slot for action buttons."
      cliInstall="npx aether-ui add table-toolbar"
      importCode={`import { TableToolbar } from "@aetherstack/patterns"`}
      usageCode={`import { TableToolbar } from "@aetherstack/patterns"
import { Button, Input } from "@aetherstack/ui"
import { Search, SlidersHorizontal, Download } from "lucide-react"

<TableToolbar
  search={
    <div className="relative w-64">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-9" placeholder="Search members…" />
    </div>
  }
  filters={
    <Button variant="outline" size="sm">
      <SlidersHorizontal />
      Filters
    </Button>
  }
  actions={
    <Button variant="outline" size="sm">
      <Download />
      Export
    </Button>
  }
/>`}
      preview={
        <div className="w-full max-w-2xl">
          <TableToolbar
            search={
              <div className="relative w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input className="pl-8 h-8 text-sm" placeholder="Search members…" readOnly />
              </div>
            }
            filters={
              <Button variant="outline" size="sm">
                <SlidersHorizontal />
                Filters
              </Button>
            }
            actions={
              <Button variant="outline" size="sm">
                <Download />
                Export
              </Button>
            }
          />
        </div>
      }
      props={[
        { name: "search", type: "ReactNode", description: "Left slot — typically a search Input with a leading icon." },
        { name: "filters", type: "ReactNode", description: "Middle slot — filter dropdowns, date pickers, etc." },
        { name: "actions", type: "ReactNode", description: "Right slot — action buttons (Export, Invite, etc.)." },
        { name: "className", type: "string", description: "Additional classes on the toolbar wrapper." },
      ]}
    />
  )
}
