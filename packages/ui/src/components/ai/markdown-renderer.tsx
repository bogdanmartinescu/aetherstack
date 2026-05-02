"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import { cn } from "@aetherstack/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <code
              className="bg-muted px-1 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-3 text-sm [&>code]:bg-transparent [&>code]:p-0">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-2 hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-4 text-muted-foreground italic my-3">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border my-4" />,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export { MarkdownRenderer }
