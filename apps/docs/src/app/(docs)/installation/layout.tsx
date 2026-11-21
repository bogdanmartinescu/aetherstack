import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Installation",
  description:
    "Install Aether UI in a Next.js or Vite project: run npx @aetherstack/cli init, add components as source you own, and set up Tailwind and the design tokens.",
  path: "/installation/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
