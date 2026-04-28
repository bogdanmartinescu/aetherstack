import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { FilterToolbarPreview } from "./previews"

export const metadata: Metadata = {
  title: "Filter Toolbar",
  description: "Active filter pills with clear-all and additional filter controls.",
}

export default function FilterToolbarPage() {
  return (
    <PatternPage
      name="Filter Toolbar"
      description="Displays active filters as dismissible pills. Includes a clear-all action and slots for additional filter controls like dropdowns."
      cliInstall="npx aether-ui add filter-toolbar"
      importCode={`import { FilterToolbar, FilterPill } from "@aetherstack/patterns"`}
      usageCode={`import { FilterToolbar } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"

const [filters, setFilters] = useState([
  { id: "status", label: "Status: Active", onRemove: () => removeFilter("status") },
  { id: "role",   label: "Role: Admin",   onRemove: () => removeFilter("role") },
])

<FilterToolbar
  activeFilters={filters}
  onClearAll={() => setFilters([])}
>
  <Button variant="outline" size="sm">
    <SlidersHorizontal />
    Filter
  </Button>
</FilterToolbar>`}
      preview={
        <div className="w-full max-w-xl">
          <FilterToolbarPreview />
        </div>
      }
      props={[
        { name: "activeFilters", type: "ActiveFilter[]", default: "[]", description: "List of applied filters. Each needs an id, label, and onRemove handler." },
        { name: "onClearAll", type: "() => void", description: "Shown when there are active filters. Clears all at once." },
        { name: "children", type: "ReactNode", description: "Additional filter trigger controls rendered before the active filter pills." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
    />
  )
}
