import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { StreamingText } from "../components/ai/streaming-text"
import { ThinkingIndicator } from "../components/ai/thinking-indicator"
import { MarkdownRenderer } from "../components/ai/markdown-renderer"
import { CodeBlock } from "../components/ai/code-block"
import { PromptInput } from "../components/ai/prompt-input"
import { ChatBubble } from "../components/ai/chat-bubble"
import { SourceCard } from "../components/ai/source-card"
import { FeedbackButtons } from "../components/ai/feedback-buttons"
import { ModelBadge } from "../components/ai/model-badge"
import { TokenCounter } from "../components/ai/token-counter"
import { PromptSuggestion } from "../components/ai/prompt-suggestion"
import { ToolCallCard } from "../components/ai/tool-call-card"
import { ReasoningBlock } from "../components/ai/reasoning-block"
import { AttachmentChip } from "../components/ai/attachment-chip"

// ─── StreamingText ────────────────────────────────────────────────────────────

describe("StreamingText", () => {
  it("renders a plain string immediately", () => {
    render(<StreamingText content="Hello world" />)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("renders empty string without crash", () => {
    const { container } = render(<StreamingText content="" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <StreamingText content="Text" className="custom-stream" />,
    )
    expect(container.firstChild).toHaveClass("custom-stream")
  })

  it("calls onComplete after rendering a string", async () => {
    const onComplete = vi.fn()
    render(<StreamingText content="Done" onComplete={onComplete} />)
    await waitFor(() => expect(onComplete).not.toHaveBeenCalled())
  })
})

// ─── ThinkingIndicator ────────────────────────────────────────────────────────

describe("ThinkingIndicator", () => {
  it("renders default label", () => {
    render(<ThinkingIndicator />)
    expect(screen.getByText("Thinking…")).toBeInTheDocument()
  })

  it("renders custom label", () => {
    render(<ThinkingIndicator label="Processing…" />)
    expect(screen.getByText("Processing…")).toBeInTheDocument()
  })

  it("renders animated dots", () => {
    const { container } = render(<ThinkingIndicator />)
    const dots = container.querySelectorAll(".animate-bounce")
    expect(dots.length).toBeGreaterThanOrEqual(3)
  })

  it("applies custom className", () => {
    const { container } = render(<ThinkingIndicator className="custom-think" />)
    expect(container.firstChild).toHaveClass("custom-think")
  })
})

// ─── MarkdownRenderer ────────────────────────────────────────────────────────

describe("MarkdownRenderer", () => {
  it("renders plain text", () => {
    render(<MarkdownRenderer content="Hello" />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders markdown heading", () => {
    render(<MarkdownRenderer content="# Title" />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("renders markdown bold text", () => {
    render(<MarkdownRenderer content="**bold text**" />)
    expect(screen.getByText("bold text")).toBeInTheDocument()
  })

  it("renders markdown list items", () => {
    render(<MarkdownRenderer content={"- Item A\n- Item B"} />)
    expect(screen.getByText("Item A")).toBeInTheDocument()
    expect(screen.getByText("Item B")).toBeInTheDocument()
  })

  it("applies custom className to wrapper", () => {
    const { container } = render(
      <MarkdownRenderer content="Text" className="custom-md" />,
    )
    expect(container.firstChild).toHaveClass("custom-md")
  })
})

// ─── CodeBlock ────────────────────────────────────────────────────────────────

describe("CodeBlock", () => {
  it("renders code content", () => {
    render(<CodeBlock code="const x = 1" />)
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
  })

  it("renders language badge when language provided", () => {
    render(<CodeBlock code="console.log()" language="javascript" />)
    expect(screen.getByText("javascript")).toBeInTheDocument()
  })

  it("renders filename when provided", () => {
    render(<CodeBlock code="x = 1" filename="main.py" />)
    expect(screen.getByText("main.py")).toBeInTheDocument()
  })

  it("renders copy button", () => {
    render(<CodeBlock code="hello" />)
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument()
  })

  it("copies code to clipboard on button click", async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    })
    render(<CodeBlock code="copied content" />)
    await user.click(screen.getByRole("button", { name: /copy/i }))
    expect(writeText).toHaveBeenCalledWith("copied content")
  })
})

// ─── PromptInput ──────────────────────────────────────────────────────────────

describe("PromptInput", () => {
  it("renders textarea", () => {
    render(<PromptInput />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("renders with placeholder", () => {
    render(<PromptInput placeholder="Ask anything…" />)
    expect(screen.getByPlaceholderText("Ask anything…")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(<PromptInput />)
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument()
  })

  it("calls onSubmit with value when submit button is clicked with text", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    function Wrapper() {
      const [val, setVal] = React.useState("")
      return <PromptInput value={val} onValueChange={setVal} onSubmit={onSubmit} />
    }
    render(<Wrapper />)
    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "Hello AI")
    await user.click(screen.getByRole("button", { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledWith("Hello AI")
  })

  it("is disabled when disabled prop is set", () => {
    render(<PromptInput disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
  })
})

// ─── ChatBubble ───────────────────────────────────────────────────────────────

describe("ChatBubble", () => {
  it("renders user message", () => {
    render(<ChatBubble role="user" content="Hello" />)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("renders assistant message", () => {
    render(<ChatBubble role="assistant" content="How can I help?" />)
    expect(screen.getByText("How can I help?")).toBeInTheDocument()
  })

  it("renders name when provided", () => {
    render(<ChatBubble role="user" content="Hi" name="Alice" />)
    expect(screen.getByText("Alice")).toBeInTheDocument()
  })

  it("renders timestamp when provided", () => {
    render(<ChatBubble role="user" content="Hi" timestamp="12:00 PM" />)
    expect(screen.getByText("12:00 PM")).toBeInTheDocument()
  })

  it("renders actions slot", () => {
    render(
      <ChatBubble
        role="assistant"
        content="Text"
        actions={<button>Copy</button>}
      />,
    )
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })
})

// ─── SourceCard ───────────────────────────────────────────────────────────────

describe("SourceCard", () => {
  it("renders title", () => {
    render(<SourceCard title="MDN Web Docs" url="https://developer.mozilla.org" />)
    expect(screen.getByText("MDN Web Docs")).toBeInTheDocument()
  })

  it("renders domain derived from url", () => {
    render(<SourceCard title="Docs" url="https://developer.mozilla.org/en/docs" />)
    expect(screen.getByText("developer.mozilla.org")).toBeInTheDocument()
  })

  it("renders excerpt when provided", () => {
    render(
      <SourceCard
        title="Docs"
        url="https://example.com"
        excerpt="A helpful excerpt"
      />,
    )
    expect(screen.getByText("A helpful excerpt")).toBeInTheDocument()
  })

  it("links to the provided url", () => {
    render(<SourceCard title="Docs" url="https://example.com/page" />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "https://example.com/page")
  })
})

// ─── FeedbackButtons ──────────────────────────────────────────────────────────

describe("FeedbackButtons", () => {
  it("renders thumbs up and down buttons", () => {
    render(<FeedbackButtons />)
    expect(screen.getByRole("button", { name: /thumbs up/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /thumbs down/i })).toBeInTheDocument()
  })

  it("calls onThumbsUp when thumbs up is clicked", async () => {
    const user = userEvent.setup()
    const onThumbsUp = vi.fn()
    render(<FeedbackButtons onThumbsUp={onThumbsUp} />)
    await user.click(screen.getByRole("button", { name: /thumbs up/i }))
    expect(onThumbsUp).toHaveBeenCalledOnce()
  })

  it("calls onThumbsDown when thumbs down is clicked", async () => {
    const user = userEvent.setup()
    const onThumbsDown = vi.fn()
    render(<FeedbackButtons onThumbsDown={onThumbsDown} />)
    await user.click(screen.getByRole("button", { name: /thumbs down/i }))
    expect(onThumbsDown).toHaveBeenCalledOnce()
  })

  it("applies custom className", () => {
    const { container } = render(<FeedbackButtons className="custom-fb" />)
    expect(container.firstChild).toHaveClass("custom-fb")
  })
})

// ─── ModelBadge ───────────────────────────────────────────────────────────────

describe("ModelBadge", () => {
  it("renders model name", () => {
    render(<ModelBadge model="GPT-4o" />)
    expect(screen.getByText("GPT-4o")).toBeInTheDocument()
  })

  it("renders provider prefix when provided", () => {
    render(<ModelBadge model="claude-3.5" provider="Anthropic" />)
    expect(screen.getByText("Anthropic/")).toBeInTheDocument()
    expect(screen.getByText("claude-3.5")).toBeInTheDocument()
  })

  it("does not render provider prefix when omitted", () => {
    render(<ModelBadge model="gemini-pro" />)
    expect(screen.queryByText(/\//)).not.toBeInTheDocument()
  })
})

// ─── TokenCounter ─────────────────────────────────────────────────────────────

describe("TokenCounter", () => {
  it("renders used and max token counts", () => {
    render(<TokenCounter used={1000} max={4096} />)
    expect(screen.getByText(/1,000/)).toBeInTheDocument()
    expect(screen.getByText(/4,096/)).toBeInTheDocument()
  })

  it("renders progress bar", () => {
    render(<TokenCounter used={500} max={1000} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("applies destructive styling when usage >= 80%", () => {
    const { container } = render(<TokenCounter used={900} max={1000} />)
    const counter = container.querySelector(".text-destructive")
    expect(counter).toBeInTheDocument()
  })

  it("applies normal styling when usage < 80%", () => {
    const { container } = render(<TokenCounter used={100} max={1000} />)
    const counter = container.querySelector(".text-destructive")
    expect(counter).not.toBeInTheDocument()
  })
})

// ─── PromptSuggestion ────────────────────────────────────────────────────────

describe("PromptSuggestion", () => {
  it("renders label text", () => {
    render(<PromptSuggestion label="Summarize this document" />)
    expect(screen.getByText("Summarize this document")).toBeInTheDocument()
  })

  it("renders as a button", () => {
    render(<PromptSuggestion label="Ask me anything" />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PromptSuggestion label="Click me" onClick={onClick} />)
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("renders icon slot when provided", () => {
    render(
      <PromptSuggestion
        label="With icon"
        icon={<svg data-testid="suggestion-icon" />}
      />,
    )
    expect(screen.getByTestId("suggestion-icon")).toBeInTheDocument()
  })
})

// ─── ToolCallCard ─────────────────────────────────────────────────────────────

describe("ToolCallCard", () => {
  it("renders tool name", () => {
    render(<ToolCallCard toolName="search_web" status="pending" />)
    expect(screen.getByText("search_web")).toBeInTheDocument()
  })

  it("renders pending status", () => {
    render(<ToolCallCard toolName="get_weather" status="pending" />)
    expect(screen.getByText("pending")).toBeInTheDocument()
  })

  it("renders done status", () => {
    render(<ToolCallCard toolName="get_weather" status="done" result="Sunny" />)
    expect(screen.getByText("done")).toBeInTheDocument()
  })

  it("renders error status", () => {
    render(
      <ToolCallCard
        toolName="get_weather"
        status="error"
        error="Connection refused"
      />,
    )
    expect(screen.getByText("error")).toBeInTheDocument()
  })

  it("expands to show args on click when args are provided", async () => {
    const user = userEvent.setup()
    render(
      <ToolCallCard
        toolName="search"
        status="done"
        args={{ query: "react hooks" }}
      />,
    )
    const trigger = screen.getByRole("button")
    await user.click(trigger)
    expect(screen.getByText(/query/)).toBeInTheDocument()
  })
})

// ─── ReasoningBlock ───────────────────────────────────────────────────────────

describe("ReasoningBlock", () => {
  it("renders collapsed by default", () => {
    render(<ReasoningBlock content="Chain of thought here" />)
    expect(screen.queryByText("Chain of thought here")).not.toBeInTheDocument()
  })

  it("renders expanded when defaultOpen is true", () => {
    render(<ReasoningBlock content="Reasoning text" defaultOpen />)
    expect(screen.getByText("Reasoning text")).toBeInTheDocument()
  })

  it("expands content on trigger click", async () => {
    const user = userEvent.setup()
    render(<ReasoningBlock content="Hidden reasoning" />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Hidden reasoning")).toBeInTheDocument()
  })

  it("collapses content on second trigger click", async () => {
    const user = userEvent.setup()
    render(<ReasoningBlock content="Toggled reasoning" defaultOpen />)
    await user.click(screen.getByRole("button"))
    expect(screen.queryByText("Toggled reasoning")).not.toBeInTheDocument()
  })
})

// ─── AttachmentChip ───────────────────────────────────────────────────────────

describe("AttachmentChip", () => {
  it("renders filename", () => {
    render(<AttachmentChip name="report.pdf" />)
    expect(screen.getByText("report.pdf")).toBeInTheDocument()
  })

  it("renders formatted file size when size is provided", () => {
    render(<AttachmentChip name="data.csv" size={2048} />)
    expect(screen.getByText("2.0 KB")).toBeInTheDocument()
  })

  it("renders remove button when onRemove is provided", () => {
    render(<AttachmentChip name="file.txt" onRemove={() => {}} />)
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument()
  })

  it("does not render remove button without onRemove", () => {
    render(<AttachmentChip name="file.txt" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<AttachmentChip name="file.txt" onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: /remove/i }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})
