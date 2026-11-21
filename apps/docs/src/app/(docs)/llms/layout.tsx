import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "AI and LLM support",
  description:
    "Use Aether UI with AI coding agents: llms.txt, the @aetherstack/mcp-server MCP server, AI metadata on every registry item and prompt-driven generate.",
  path: "/llms/",
})

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
