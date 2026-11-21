import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Sign-up form pattern",
  description:
    "Sign-up form pattern with a password strength meter and password confirmation, validated with React Hook Form and Zod.",
  path: "/patterns/signup-form/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("patterns", "Sign-up form", "/patterns/signup-form/")} />
      {children}
    </>
  )
}
