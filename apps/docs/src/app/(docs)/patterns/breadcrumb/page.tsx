import type { Metadata } from "next"
import { Breadcrumb } from "@aetherstack/patterns"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Breadcrumb",
  description: "Accessible crumb trail with configurable separator.",
}

export default function BreadcrumbPage() {
  return (
    <PatternPage
      name="Breadcrumb"
      description="An accessible navigation aid that shows the current page's location in a hierarchy. The last crumb is marked as the current page."
      cliInstall="npx aether-ui add breadcrumb"
      importCode={`import { Breadcrumb } from "@aetherstack/patterns"`}
      usageCode={`<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Team" },
  ]}
/>`}
      preview={
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "Settings", href: "#" },
            { label: "Team" },
          ]}
        />
      }
      props={[
        { name: "items", type: "BreadcrumbItem[]", required: true, description: "Array of crumbs. Last item is the current page." },
        { name: "className", type: "string", description: "Additional classes on the <nav> element." },
      ]}
      a11yNotes={[
        "Wraps in <nav aria-label=\"Breadcrumb\"> for landmark navigation.",
        "Rendered as an ordered list (<ol>) — correct semantic structure for a sequence.",
        "The last item receives aria-current=\"page\" automatically.",
        "Separators are aria-hidden to avoid being read aloud.",
      ]}
    />
  )
}
