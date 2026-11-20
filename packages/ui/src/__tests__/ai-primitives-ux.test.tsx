import * as React from "react"
import { describe, it, expect, vi, afterEach } from "vitest"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { StreamingText } from "../components/ai/streaming-text"
import { ThinkingIndicator } from "../components/ai/thinking-indicator"
import { MarkdownRenderer } from "../components/ai/markdown-renderer"
import { CodeBlock } from "../components/ai/code-block"
import { PromptInput } from "../components/ai/prompt-input"
import { PromptSuggestion } from "../components/ai/prompt-suggestion"
import { ChatBubble } from "../components/ai/chat-bubble"
import { SourceCard } from "../components/ai/source-card"
import { FeedbackButtons } from "../components/ai/feedback-buttons"
import { TokenCounter } from "../components/ai/token-counter"
import { ToolCallCard } from "../components/ai/tool-call-card"
import { ReasoningBlock } from "../components/ai/reasoning-block"
import { AttachmentChip } from "../components/ai/attachment-chip"

function deferred() {
  let resolve: () => void = () => {}
  const promise = new Promise<void>((res) => {
    resolve = res
  })
  return { promise, resolve }
}

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, writable: true })
}

afterEach(() => {
  vi.useRealTimers()
})

// ─── StreamingText ────────────────────────────────────────────────────────────

describe("StreamingText streaming", () => {
  it("appends chunks and calls onComplete once the stream ends", async () => {
    async function* stream() {
      yield "Hello"
      yield ", "
      yield "world"
    }
    const onComplete = vi.fn()
    const { container } = render(<StreamingText content={stream()} onComplete={onComplete} />)
    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce())
    expect(container.firstChild).toHaveTextContent("Hello, world")
    expect(container.firstChild).not.toHaveAttribute("aria-busy")
  })

  it("does not restart the stream when an inline onComplete changes", async () => {
    const gate = deferred()
    async function* stream() {
      yield "Hello"
      await gate.promise
      yield " world"
    }
    const iterable = stream()
    const first = vi.fn()
    const second = vi.fn()

    const { container, rerender } = render(<StreamingText content={iterable} onComplete={first} />)
    await waitFor(() => expect(container.firstChild).toHaveTextContent("Hello"))

    rerender(<StreamingText content={iterable} onComplete={second} />)
    gate.resolve()

    await waitFor(() => expect(second).toHaveBeenCalledOnce())
    expect(first).not.toHaveBeenCalled()
    expect(container.firstChild).toHaveTextContent("Hello world")
  })

  it("keeps partial text and reports errors via onError", async () => {
    const failure = new Error("network")
    async function* stream() {
      yield "partial"
      throw failure
    }
    const onError = vi.fn()
    const onComplete = vi.fn()
    const { container } = render(
      <StreamingText content={stream()} onError={onError} onComplete={onComplete} />,
    )
    await waitFor(() => expect(onError).toHaveBeenCalledWith(failure))
    expect(onComplete).not.toHaveBeenCalled()
    expect(container.firstChild).toHaveTextContent("partial")
    expect(container.firstChild).not.toHaveAttribute("aria-busy")
  })

  it("marks itself busy and shows a decorative cursor while streaming", async () => {
    const gate = deferred()
    async function* stream() {
      yield "a"
      await gate.promise
    }
    const { container } = render(<StreamingText content={stream()} />)
    await waitFor(() => expect(container.firstChild).toHaveTextContent("a"))
    expect(container.firstChild).toHaveAttribute("aria-busy", "true")
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()
    await act(async () => gate.resolve())
  })

  it("hides the cursor when showCursor is false", async () => {
    const gate = deferred()
    async function* stream() {
      yield "a"
      await gate.promise
    }
    const { container } = render(<StreamingText content={stream()} showCursor={false} />)
    await waitFor(() => expect(container.firstChild).toHaveTextContent("a"))
    expect(container.querySelector("[aria-hidden='true']")).not.toBeInTheDocument()
    await act(async () => gate.resolve())
  })
})

// ─── ThinkingIndicator ────────────────────────────────────────────────────────

describe("ThinkingIndicator states", () => {
  it("exposes a polite status region", () => {
    render(<ThinkingIndicator label="Working" />)
    expect(screen.getByRole("status")).toHaveTextContent("Working")
  })

  it("renders a spinner instead of dots in loading state", () => {
    const { container } = render(<ThinkingIndicator state="loading" />)
    expect(container.querySelector(".animate-bounce")).not.toBeInTheDocument()
    expect(container.querySelector(".animate-spin")).toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "loading")
  })
})

// ─── PromptInput ──────────────────────────────────────────────────────────────

describe("PromptInput interaction", () => {
  it("works uncontrolled and clears after submit", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)
    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "Hello{Enter}")
    expect(onSubmit).toHaveBeenCalledWith("Hello")
    expect(textarea).toHaveValue("")
  })

  it("honours defaultValue", () => {
    render(<PromptInput defaultValue="Draft" />)
    expect(screen.getByRole("textbox")).toHaveValue("Draft")
  })

  it("inserts a newline on Shift+Enter instead of submitting", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)
    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "line 1{Shift>}{Enter}{/Shift}line 2")
    expect(onSubmit).not.toHaveBeenCalled()
    expect(textarea).toHaveValue("line 1\nline 2")
  })

  it("does not submit while an IME composition is active", () => {
    const onSubmit = vi.fn()
    render(<PromptInput defaultValue="にほん" onSubmit={onSubmit} />)
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter", isComposing: true })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("does not submit whitespace-only input", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)
    await user.type(screen.getByRole("textbox"), "   {Enter}")
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled()
  })

  it("shows an enabled stop button while loading when onStop is provided", async () => {
    const user = userEvent.setup()
    const onStop = vi.fn()
    const onSubmit = vi.fn()
    render(<PromptInput defaultValue="hi" isLoading onStop={onStop} onSubmit={onSubmit} />)
    const stop = screen.getByRole("button", { name: "Stop generating" })
    expect(stop).toBeEnabled()
    await user.click(stop)
    expect(onStop).toHaveBeenCalledOnce()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("disables submit while loading without onStop", () => {
    render(<PromptInput defaultValue="hi" isLoading />)
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled()
  })

  it("does not submit an enclosing form", async () => {
    const user = userEvent.setup()
    const onFormSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onFormSubmit}>
        <PromptInput defaultValue="hi" />
      </form>,
    )
    await user.click(screen.getByRole("button", { name: "Submit" }))
    expect(onFormSubmit).not.toHaveBeenCalled()
  })

  it("uses the placeholder as the accessible name by default", () => {
    render(<PromptInput placeholder="Message Aether" />)
    expect(screen.getByRole("textbox", { name: "Message Aether" })).toBeInTheDocument()
  })

  it("accepts an explicit aria-label", () => {
    render(<PromptInput aria-label="Chat message" />)
    expect(screen.getByRole("textbox", { name: "Chat message" })).toBeInTheDocument()
  })

  it("links the character counter and flags it near the limit", async () => {
    const user = userEvent.setup()
    render(<PromptInput maxLength={10} />)
    const textarea = screen.getByRole("textbox")
    await user.type(textarea, "123456789")
    const counter = screen.getByText("9 / 10")
    expect(textarea).toHaveAttribute("aria-describedby", counter.id)
    expect(counter).toHaveClass("text-destructive")
  })

  it("forwards its ref to the textarea", () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<PromptInput ref={ref} />)
    expect(ref.current).toBe(screen.getByRole("textbox"))
  })
})

// ─── PromptSuggestion ─────────────────────────────────────────────────────────

describe("PromptSuggestion behaviour", () => {
  it("defaults to type=button", () => {
    render(<PromptSuggestion label="Summarise" />)
    expect(screen.getByRole("button")).toHaveAttribute("type", "button")
  })

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<PromptSuggestion label="Summarise" disabled onClick={onClick} />)
    await user.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("forwards its ref", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<PromptSuggestion label="Summarise" ref={ref} />)
    expect(ref.current).toBe(screen.getByRole("button"))
  })
})

// ─── CodeBlock ────────────────────────────────────────────────────────────────

describe("CodeBlock copy feedback", () => {
  it("announces the copy and resets after a delay", async () => {
    vi.useFakeTimers()
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    render(<CodeBlock code="npm i" language="bash" />)

    fireEvent.click(screen.getByRole("button", { name: "Copy code" }))
    await act(async () => {})

    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument()
    expect(screen.getByText("Copied to clipboard")).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(2000))
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument()
  })

  it("stays in the idle state when the clipboard rejects", async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error("denied")))
    render(<CodeBlock code="npm i" />)
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }))
    await act(async () => {})
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument()
  })

  it("does not update state after unmounting", async () => {
    vi.useFakeTimers()
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    mockClipboard(vi.fn().mockResolvedValue(undefined))
    const { unmount } = render(<CodeBlock code="x" />)
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }))
    await act(async () => {})
    unmount()
    vi.advanceTimersByTime(5000)
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})

describe("CodeBlock lines", () => {
  it("does not number a trailing empty line", () => {
    const { container } = render(<CodeBlock code={"a\nb\n"} showLineNumbers />)
    expect(container.querySelectorAll("[data-line]")).toHaveLength(2)
  })

  it("highlights the requested lines", () => {
    const { container } = render(<CodeBlock code={"a\nb\nc"} highlightLines={[2]} />)
    const highlighted = container.querySelectorAll("[data-highlighted]")
    expect(highlighted).toHaveLength(1)
    expect(highlighted[0]).toHaveAttribute("data-line", "2")
  })

  it("makes the scrollable code region keyboard focusable", () => {
    const { container } = render(<CodeBlock code="x" />)
    expect(container.querySelector("pre")).toHaveAttribute("tabindex", "0")
  })
})

// ─── MarkdownRenderer ─────────────────────────────────────────────────────────

describe("MarkdownRenderer rendering", () => {
  it("renders fenced code through CodeBlock with a language label and copy button", () => {
    render(<MarkdownRenderer content={"```ts\nconst a = 1\n```"} />)
    expect(screen.getByText("ts")).toBeInTheDocument()
    expect(screen.getByText("const a = 1")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Copy code" })).toBeInTheDocument()
  })

  it("renders inline code without leaking the hast node prop", () => {
    const { container } = render(<MarkdownRenderer content="Use `npm` here" />)
    const code = container.querySelector("code")
    expect(code).toHaveTextContent("npm")
    expect(code).not.toHaveAttribute("node")
  })

  it("marks external links as opening in a new tab", () => {
    render(<MarkdownRenderer content="[Docs](https://example.com)" />)
    const link = screen.getByRole("link", { name: /docs.*opens in a new tab/i })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders images with alt text", () => {
    render(<MarkdownRenderer content="![Diagram](https://example.com/d.png)" />)
    expect(screen.getByRole("img", { name: "Diagram" })).toHaveAttribute("loading", "lazy")
  })

  it("merges component overrides over the defaults", () => {
    render(
      <MarkdownRenderer
        content={"# Title\n\nBody"}
        components={{ p: ({ children }) => <p data-testid="custom-p">{children}</p> }}
      />,
    )
    expect(screen.getByTestId("custom-p")).toHaveTextContent("Body")
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("font-semibold")
  })
})

// ─── ChatBubble ───────────────────────────────────────────────────────────────

describe("ChatBubble roles", () => {
  it("renders system messages as a centered notice without an avatar", () => {
    const { container } = render(<ChatBubble role="system" content="Chat started" />)
    expect(container.firstChild).toHaveAttribute("data-role", "system")
    expect(screen.queryByText("AI")).not.toBeInTheDocument()
    expect(screen.getByText("Chat started")).toBeInTheDocument()
  })

  it("treats the avatar as decorative when a name is shown", () => {
    const { container } = render(
      <ChatBubble role="assistant" content="Hi" name="Aether" avatarUrl="/a.png" />,
    )
    expect(container.querySelector("img")).toHaveAttribute("alt", "")
  })

  it("gives the avatar a label when no name is shown", () => {
    render(<ChatBubble role="assistant" content="Hi" avatarUrl="/a.png" />)
    expect(screen.getByRole("img", { name: "Assistant" })).toBeInTheDocument()
  })
})

// ─── SourceCard ───────────────────────────────────────────────────────────────

describe("SourceCard enhancements", () => {
  it("renders a citation index", () => {
    render(<SourceCard title="Docs" url="https://example.com" index={3} />)
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("announces that it opens in a new tab", () => {
    render(<SourceCard title="Docs" url="https://example.com" />)
    expect(screen.getByRole("link", { name: /opens in a new tab/i })).toBeInTheDocument()
  })

  it("falls back to the link icon when the favicon fails to load", () => {
    const { container } = render(
      <SourceCard title="Docs" url="https://example.com" favicon="https://example.com/f.ico" />,
    )
    const img = container.querySelector("img")
    expect(img).toBeInTheDocument()
    fireEvent.error(img as HTMLImageElement)
    expect(container.querySelector("img")).not.toBeInTheDocument()
  })
})

// ─── TokenCounter ─────────────────────────────────────────────────────────────

describe("TokenCounter accessibility", () => {
  it("labels the progress bar and describes usage", () => {
    render(<TokenCounter used={1000} max={4000} label="Context" />)
    const bar = screen.getByRole("progressbar", { name: "Context" })
    expect(bar).toHaveAttribute("aria-valuetext", "1,000 of 4,000 tokens used")
  })

  it("supports a custom warning threshold", () => {
    const { container } = render(<TokenCounter used={500} max={1000} warnAt={0.5} />)
    expect(container.firstChild).toHaveAttribute("data-level", "warning")
  })
})

// ─── FeedbackButtons ──────────────────────────────────────────────────────────

describe("FeedbackButtons selection", () => {
  it("reflects the selection with aria-pressed", async () => {
    const user = userEvent.setup()
    render(<FeedbackButtons />)
    const up = screen.getByRole("button", { name: /thumbs up/i })
    expect(up).toHaveAttribute("aria-pressed", "false")
    await user.click(up)
    expect(up).toHaveAttribute("aria-pressed", "true")
  })

  it("lets the user switch their vote", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<FeedbackButtons onValueChange={onValueChange} />)
    await user.click(screen.getByRole("button", { name: /thumbs up/i }))
    const down = screen.getByRole("button", { name: /thumbs down/i })
    expect(down).toBeEnabled()
    await user.click(down)
    expect(onValueChange).toHaveBeenLastCalledWith("down")
    expect(down).toHaveAttribute("aria-pressed", "true")
  })

  it("clears the selection when clicked again", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const onThumbsUp = vi.fn()
    render(<FeedbackButtons onValueChange={onValueChange} onThumbsUp={onThumbsUp} />)
    const up = screen.getByRole("button", { name: /thumbs up/i })
    await user.click(up)
    await user.click(up)
    expect(onValueChange).toHaveBeenLastCalledWith(null)
    expect(onThumbsUp).toHaveBeenCalledOnce()
    expect(up).toHaveAttribute("aria-pressed", "false")
  })

  it("respects a controlled value", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<FeedbackButtons value="up" onValueChange={onValueChange} />)
    await user.click(screen.getByRole("button", { name: /thumbs down/i }))
    expect(onValueChange).toHaveBeenCalledWith("down")
    expect(screen.getByRole("button", { name: /thumbs up/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("disables both buttons when disabled", () => {
    render(<FeedbackButtons disabled />)
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled()
  })

  it("groups the buttons under an accessible label", () => {
    render(<FeedbackButtons />)
    expect(screen.getByRole("group", { name: "Response feedback" })).toBeInTheDocument()
  })
})

// ─── ToolCallCard ─────────────────────────────────────────────────────────────

describe("ToolCallCard details", () => {
  it("is not expandable when there is nothing to show", () => {
    render(<ToolCallCard toolName="ping" status="running" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("toggles aria-expanded on the trigger", async () => {
    const user = userEvent.setup()
    render(<ToolCallCard toolName="search" status="done" args={{ q: "x" }} />)
    const trigger = screen.getByRole("button")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    await user.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("opens by default when defaultOpen is set", () => {
    render(<ToolCallCard toolName="search" status="done" args={{ q: "x" }} defaultOpen />)
    expect(screen.getByText("Arguments")).toBeInTheDocument()
  })

  it("renders string results without JSON quotes", () => {
    render(<ToolCallCard toolName="weather" status="done" result="Sunny" defaultOpen />)
    expect(screen.getByText("Sunny")).toBeInTheDocument()
  })

  it("does not crash on circular results", () => {
    const circular: Record<string, unknown> = { name: "loop" }
    circular.self = circular
    render(<ToolCallCard toolName="graph" status="done" result={circular} defaultOpen />)
    expect(screen.getByText("Result")).toBeInTheDocument()
  })

  it("formats the duration", () => {
    const { rerender } = render(<ToolCallCard toolName="a" status="done" duration={250} />)
    expect(screen.getByText(/250ms/)).toBeInTheDocument()
    rerender(<ToolCallCard toolName="a" status="done" duration={1500} />)
    expect(screen.getByText(/1\.5s/)).toBeInTheDocument()
  })
})

// ─── ReasoningBlock ───────────────────────────────────────────────────────────

describe("ReasoningBlock header", () => {
  it("shows a live title while streaming", () => {
    render(<ReasoningBlock content="..." isStreaming />)
    expect(screen.getByRole("button", { name: "Thinking…" })).toBeInTheDocument()
  })

  it("shows the reasoning duration once finished", () => {
    render(<ReasoningBlock content="..." duration={4.2} />)
    expect(screen.getByRole("button", { name: "Thought for 4s" })).toBeInTheDocument()
  })

  it("prefers an explicit title", () => {
    render(<ReasoningBlock content="..." title="Plan" duration={4} />)
    expect(screen.getByRole("button", { name: "Plan" })).toBeInTheDocument()
  })

  it("supports controlled open state", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<ReasoningBlock content="Secret" open={false} onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole("button"))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByText("Secret")).not.toBeInTheDocument()
  })
})

// ─── AttachmentChip ───────────────────────────────────────────────────────────

describe("AttachmentChip states", () => {
  it("exposes the full name as a tooltip", () => {
    const { container } = render(<AttachmentChip name="a-very-long-file-name.pdf" />)
    expect(container.firstChild).toHaveAttribute("title", "a-very-long-file-name.pdf")
  })

  it("formats megabytes and gigabytes", () => {
    const { rerender } = render(<AttachmentChip name="a.bin" size={5 * 1024 * 1024} />)
    expect(screen.getByText("5.0 MB")).toBeInTheDocument()
    rerender(<AttachmentChip name="a.bin" size={2 * 1024 * 1024 * 1024} />)
    expect(screen.getByText("2.0 GB")).toBeInTheDocument()
  })

  it("announces uploading and error states", () => {
    const { container, rerender } = render(<AttachmentChip name="a.png" status="uploading" />)
    expect(container.firstChild).toHaveAttribute("aria-busy", "true")
    expect(screen.getByText("Uploading")).toBeInTheDocument()
    rerender(<AttachmentChip name="a.png" status="error" />)
    expect(screen.getByText("Upload failed")).toBeInTheDocument()
  })

  it("picks an icon from the MIME type or extension", () => {
    const { container, rerender } = render(<AttachmentChip name="photo" type="image/png" />)
    expect(container.querySelector(".lucide-file-image")).toBeInTheDocument()
    rerender(<AttachmentChip name="index.ts" />)
    expect(container.querySelector(".lucide-file-code")).toBeInTheDocument()
    rerender(<AttachmentChip name="notes.txt" />)
    expect(container.querySelector(".lucide-file-text")).toBeInTheDocument()
  })

  it("uses a non-submitting remove button", () => {
    render(<AttachmentChip name="a.txt" onRemove={() => {}} />)
    expect(screen.getByRole("button", { name: "Remove a.txt" })).toHaveAttribute("type", "button")
  })
})
