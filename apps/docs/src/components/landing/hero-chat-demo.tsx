"use client"

import * as React from "react"
import { Bot } from "lucide-react"
import {
  Button,
  ChatBubble,
  FeedbackButtons,
  ModelBadge,
  PromptInput,
  PromptSuggestion,
  StreamingText,
  ThinkingIndicator,
  TokenCounter,
  ToolCallCard,
} from "@aetherstack/ui"

interface AbortFlag {
  aborted: boolean
}

type Message =
  | { id: number; kind: "user"; text: string }
  | { id: number; kind: "assistant"; text: string }
  | { id: number; kind: "stream"; stream: AsyncIterable<string> }
  | {
      id: number
      kind: "tool"
      toolName: string
      args: Record<string, unknown>
      result: unknown
      duration: number
    }

const SUGGESTIONS = [
  "Open a fix for the env var",
  "Show the flaky test",
  "Write a Slack update",
] as const

const REPLIES: Record<string, string> = {
  "Open a fix for the env var":
    "Done — I opened PR #482 on billing-api. It adds STRIPE_WEBHOOK_SECRET to the production environment and a startup check so the service fails fast if it is missing again.",
  "Show the flaky test":
    "The flaky one is checkout.spec.ts › “applies a coupon”. It waits 500ms for the price to update instead of waiting for the network call, so it fails when the API is slow. Swapping the timeout for waitForResponse fixes it.",
  "Write a Slack update":
    "Deploys this week: 3 failed, 41 succeeded. billing-api failed twice on a missing env var (fix in PR #482). web failed once on a flaky checkout test (fix proposed). No customer impact.",
}

const FALLBACK_REPLY =
  "This is a scripted demo, so I can only answer the suggested prompts — but every piece you see here is a real Aether UI component: ChatBubble, ToolCallCard, StreamingText, PromptInput, FeedbackButtons and TokenCounter."

const INITIAL_MESSAGES: Message[] = [
  { id: 1, kind: "user", text: "Which deploys failed this week?" },
  {
    id: 2,
    kind: "tool",
    toolName: "search_deploys",
    args: { range: "7d", status: "failed" },
    result: { count: 3, services: ["billing-api", "billing-api", "web"] },
    duration: 412,
  },
  {
    id: 3,
    kind: "assistant",
    text: "Three failed: two on billing-api (a missing environment variable) and one on web (a flaky end-to-end test). Want me to open a fix for the env var?",
  },
]

const CONTEXT_MAX = 8192
const BASE_TOKENS = 1840

async function* streamWords(text: string, flag: AbortFlag): AsyncGenerator<string> {
  for (const part of text.split(/(\s+)/)) {
    if (flag.aborted) return
    await new Promise((resolve) => setTimeout(resolve, 28))
    yield part
  }
}

function estimateTokens(messages: Message[]): number {
  return messages.reduce((total, m) => {
    if (m.kind === "user" || m.kind === "assistant") return total + Math.ceil(m.text.length / 4)
    if (m.kind === "tool") return total + 120
    return total + 60
  }, BASE_TOKENS)
}

export function HeroChatDemo() {
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES)
  const [thinking, setThinking] = React.useState(false)
  const [streaming, setStreaming] = React.useState(false)
  const nextId = React.useRef(INITIAL_MESSAGES.length + 1)
  const abortFlag = React.useRef<AbortFlag>({ aborted: false })
  const thinkTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      el.scrollTop = el.scrollHeight
    })
    observer.observe(el, { childList: true, subtree: true, characterData: true })
    return () => {
      observer.disconnect()
      abortFlag.current.aborted = true
      if (thinkTimer.current) clearTimeout(thinkTimer.current)
    }
  }, [])

  const busy = thinking || streaming

  function send(prompt: string) {
    const text = prompt.trim()
    if (!text || busy) return

    const flag: AbortFlag = { aborted: false }
    abortFlag.current = flag
    setMessages((prev) => [...prev, { id: nextId.current++, kind: "user", text }])
    setThinking(true)

    thinkTimer.current = setTimeout(() => {
      setThinking(false)
      if (flag.aborted) return
      setStreaming(true)
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          kind: "stream",
          stream: streamWords(REPLIES[text] ?? FALLBACK_REPLY, flag),
        },
      ])
    }, 700)
  }

  function stop() {
    abortFlag.current.aborted = true
    if (thinkTimer.current) clearTimeout(thinkTimer.current)
    setThinking(false)
    setStreaming(false)
  }

  function reset() {
    stop()
    nextId.current = INITIAL_MESSAGES.length + 1
    setMessages(INITIAL_MESSAGES)
  }

  return (
    <div className="border-border bg-card shadow-primary/5 flex h-[560px] flex-col overflow-hidden rounded-xl border shadow-xl">
      {/* Title bar */}
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-md">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-foreground text-sm font-medium">Deploy assistant</span>
        <ModelBadge model="gpt-4o" provider="openai" className="ml-auto" />
        <Button variant="quiet" size="xs" onClick={reset} disabled={messages === INITIAL_MESSAGES}>
          Reset
        </Button>
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        role="log"
        aria-label="Demo conversation"
      >
        {messages.map((message, index) => {
          const isLast = index === messages.length - 1
          switch (message.kind) {
            case "user":
              return <ChatBubble key={message.id} role="user" content={message.text} />
            case "tool":
              return (
                <div key={message.id} className="pl-11">
                  <ToolCallCard
                    toolName={message.toolName}
                    status="done"
                    args={message.args}
                    result={message.result}
                    duration={message.duration}
                  />
                </div>
              )
            case "assistant":
              return (
                <ChatBubble
                  key={message.id}
                  role="assistant"
                  content={message.text}
                  actions={isLast && !busy ? <FeedbackButtons /> : undefined}
                />
              )
            case "stream":
              return (
                <ChatBubble
                  key={message.id}
                  role="assistant"
                  content={
                    <StreamingText
                      content={message.stream}
                      onComplete={() => setStreaming(false)}
                    />
                  }
                  actions={isLast && !busy ? <FeedbackButtons /> : undefined}
                />
              )
          }
        })}
        {thinking && (
          <div className="pl-11">
            <ThinkingIndicator label="Searching deploy logs…" />
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-border bg-background/50 space-y-3 border-t px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <PromptSuggestion
              key={suggestion}
              label={suggestion}
              disabled={busy}
              onClick={() => send(suggestion)}
              className="px-2.5 py-1.5 text-xs"
            />
          ))}
        </div>
        <PromptInput
          placeholder="Ask about your deploys…"
          aria-label="Message the demo assistant"
          onSubmit={send}
          onStop={stop}
          isLoading={busy}
        />
        <TokenCounter used={estimateTokens(messages)} max={CONTEXT_MAX} />
      </div>
    </div>
  )
}
