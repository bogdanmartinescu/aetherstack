import type { ReactNode } from "react"
import { REGISTRY_STATS } from "@/lib/registry-stats"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Patterns",
  description: `${REGISTRY_STATS.patterns} reusable product-level React patterns built on Aether UI primitives: data tables, forms, command palettes, AI chat and more.`,
  path: "/patterns/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
