import type { ReactNode } from "react"
import { JsonLd } from "@/components/json-ld"
import { pageBreadcrumbs, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "React Hook Form with Aether UI",
  description:
    "Build forms with React Hook Form and Zod using Aether UI inputs: setup, validation with error display, validation modes and dynamic array fields.",
  path: "/forms/react-hook-form/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageBreadcrumbs("forms", "React Hook Form", "/forms/react-hook-form/")} />
      {children}
    </>
  )
}
