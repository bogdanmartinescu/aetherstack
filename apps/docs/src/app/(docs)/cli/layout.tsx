import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "CLI reference",
  description:
    "Reference for the @aetherstack/cli commands init, add, list and generate: options, dry runs, the aether.json config file and how components are written to your project.",
  path: "/cli/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
