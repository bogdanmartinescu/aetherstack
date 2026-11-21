import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Login form pattern",
  description:
    "Sign-in form pattern with email, password and remember-me fields, validated with React Hook Form and Zod.",
  path: "/patterns/login-form/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("patterns", "Login form", "/patterns/login-form/")} />
      {children}
    </>
  )
}
