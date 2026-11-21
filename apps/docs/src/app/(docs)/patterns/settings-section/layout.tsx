import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Settings section pattern",
  description:
    "Settings section pattern: a structured card with a header, content and optional footer for grouping account or application settings.",
  path: "/patterns/settings-section/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageBreadcrumbs("patterns", "Settings section", "/patterns/settings-section/")}
      />
      {children}
    </>
  )
}
