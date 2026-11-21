import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Profile settings form pattern",
  description:
    "Profile settings form pattern with Select and Switch fields, a character counter and a sectioned layout, built from Aether UI primitives.",
  path: "/patterns/profile-form/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        data={pageBreadcrumbs("patterns", "Profile settings form", "/patterns/profile-form/")}
      />
      {children}
    </>
  )
}
