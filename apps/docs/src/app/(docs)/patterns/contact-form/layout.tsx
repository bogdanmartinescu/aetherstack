import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Contact form pattern",
  description:
    "General-purpose contact form pattern with name, email, a subject Select and a character-counted message field, built from Aether UI primitives.",
  path: "/patterns/contact-form/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("patterns", "Contact form", "/patterns/contact-form/")} />
      {children}
    </>
  )
}
