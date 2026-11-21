import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Filter toolbar pattern",
  description:
    "Filter toolbar pattern that shows active filters as dismissible pills, with a clear-all action and slots for extra controls.",
  path: "/patterns/filter-toolbar/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("patterns", "Filter toolbar", "/patterns/filter-toolbar/")} />
      {children}
    </>
  )
}
