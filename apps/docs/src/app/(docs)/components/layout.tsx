import type { ReactNode } from "react"
import { REGISTRY_STATS } from "@/lib/registry-stats"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Components",
  description: `Browse ${REGISTRY_STATS.primitives} open-code React primitives, including AI-native UI. Token-driven, accessible by default and installable with npx @aetherstack/cli.`,
  path: "/components/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
