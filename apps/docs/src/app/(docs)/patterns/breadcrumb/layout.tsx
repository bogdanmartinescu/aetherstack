import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Breadcrumb pattern",
  description:
    "Accessible breadcrumb trail with a configurable separator. A React and Tailwind pattern for showing page hierarchy and navigation context.",
  path: "/patterns/breadcrumb/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("patterns", "Breadcrumb", "/patterns/breadcrumb/")} />
      {children}
    </>
  )
}
