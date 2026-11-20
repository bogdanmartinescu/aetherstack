"use client"

import * as React from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import { cn } from "@aetherstack/utils"
import { CodeBlock } from "./code-block"

interface MarkdownRendererProps {
  content: string
  /** Per-element overrides, merged over the defaults. */
  components?: Components
  className?: string
}

function toText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toText).join("")
  return ""
}

const defaultComponents: Components = {
  h1: ({ node: _node, ...props }) => (
    <h1 className="mb-3 mt-6 text-2xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h2: ({ node: _node, ...props }) => (
    <h2 className="mb-2 mt-5 text-xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: ({ node: _node, ...props }) => (
    <h3 className="mb-2 mt-4 text-lg font-semibold first:mt-0" {...props} />
  ),
  h4: ({ node: _node, ...props }) => (
    <h4 className="mb-2 mt-4 text-base font-semibold first:mt-0" {...props} />
  ),
  p: ({ node: _node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
  code: ({ node: _node, className, ...props }) => (
    <code
      className={cn("rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]", className)}
      {...props}
    />
  ),
  pre: ({ node: _node, children }) => {
    const child = React.Children.toArray(children)[0]
    if (React.isValidElement<{ className?: string; children?: React.ReactNode }>(child)) {
      const language = /language-([\w-]+)/.exec(child.props.className ?? "")?.[1]
      return (
        <CodeBlock
          code={toText(child.props.children).replace(/\n$/, "")}
          {...(language ? { language } : {})}
          className="my-3"
        />
      )
    }
    return <pre className="my-3 overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>
  },
  ul: ({ node: _node, ...props }) => <ul className="mb-3 list-disc space-y-1 pl-5" {...props} />,
  ol: ({ node: _node, ...props }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-5" {...props} />
  ),
  li: ({ node: _node, ...props }) => <li className="leading-relaxed" {...props} />,
  a: ({ node: _node, children, ...props }) => (
    <a
      className="rounded-sm text-primary underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ),
  img: ({ node: _node, alt, ...props }) => (
    <img alt={alt ?? ""} loading="lazy" className="my-3 h-auto max-w-full rounded-lg" {...props} />
  ),
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className="my-3 border-l-4 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: () => <hr className="my-4 border-border" />,
  strong: ({ node: _node, ...props }) => <strong className="font-semibold" {...props} />,
  em: ({ node: _node, ...props }) => <em className="italic" {...props} />,
}

function MarkdownRenderer({ content, components, className }: MarkdownRendererProps) {
  const merged = React.useMemo(
    () => (components ? { ...defaultComponents, ...components } : defaultComponents),
    [components],
  )

  return (
    <div className={cn("break-words text-sm leading-relaxed", className)}>
      <ReactMarkdown components={merged}>{content}</ReactMarkdown>
    </div>
  )
}

export { MarkdownRenderer }
export type { MarkdownRendererProps }
