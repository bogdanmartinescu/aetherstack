import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Introduction",
  description:
    "Aether UI is an open-code React and Tailwind design system for SaaS and AI products. Learn how tokens, primitives, patterns and blocks fit together as source you own.",
  path: "/introduction/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
