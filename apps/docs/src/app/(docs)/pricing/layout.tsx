import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Aether UI Core is MIT licensed and free for commercial use. Premium kits are planned and not yet available.",
  path: "/pricing/",
  noindex: true,
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
