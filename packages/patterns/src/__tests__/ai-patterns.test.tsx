import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as React from "react"

import { ConversationThread } from "../components/ai/conversation-thread"
import { PromptBuilder, type Turn } from "../components/ai/prompt-builder"
import { ModelSelector } from "../components/ai/model-selector"
import { AIResponseCard } from "../components/ai/ai-response-card"
import { PromptLibrary } from "../components/ai/prompt-library"
import { ToolCallSequence } from "../components/ai/tool-call-sequence"
import { ConversationStarter } from "../components/ai/conversation-starter"
import { AIErrorState } from "../components/ai/ai-error-state"
import { AISettingsPanel } from "../components/ai/ai-settings-panel"
import { VoiceInput } from "../components/ai/voice-input"

// ─── ConversationThread ───────────────────────────────────────────────────────

describe("ConversationThread", () => {
  const messages = [
    { id: "1", role: "user" as const, content: "Hello AI" },
    { id: "2", role: "assistant" as const, content: "Hello! How can I help?" },
  ]

  it("renders all messages", () => {
    render(<ConversationThread messages={messages} />)
    expect(screen.getByText("Hello AI")).toBeInTheDocument()
    expect(screen.getByText("Hello! How can I help?")).toBeInTheDocument()
  })

  it("renders thinking indicator when isThinking is true", () => {
    render(<ConversationThread messages={messages} isThinking />)
    expect(screen.getByText(/thinking/i)).toBeInTheDocument()
  })

  it("renders empty state when no messages", () => {
    const { container } = render(<ConversationThread messages={[]} />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

// ─── PromptBuilder ────────────────────────────────────────────────────────────

describe("PromptBuilder", () => {
  it("renders without crash", () => {
    const { container } = render(<PromptBuilder />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders add turn button", () => {
    render(<PromptBuilder />)
    expect(screen.getByRole("button", { name: /add turn/i })).toBeInTheDocument()
  })

  it("adds a turn when add button is clicked (controlled)", async () => {
    const user = userEvent.setup()
    function Wrapper() {
      const [turns, setTurns] = React.useState<Turn[]>([{ role: "system" as const, content: "" }])
      return <PromptBuilder turns={turns} onTurnsChange={(t) => setTurns(t)} />
    }
    render(<Wrapper />)
    const initialTurns = screen.getAllByRole("combobox").length
    await user.click(screen.getByRole("button", { name: /add turn/i }))
    expect(screen.getAllByRole("combobox").length).toBeGreaterThan(initialTurns)
  })

  it("calls onTurnsChange when add turn is clicked", async () => {
    const user = userEvent.setup()
    const onTurnsChange = vi.fn()
    render(<PromptBuilder turns={[{ role: "user" as const, content: "" }]} onTurnsChange={onTurnsChange} />)
    await user.click(screen.getByRole("button", { name: /add turn/i }))
    expect(onTurnsChange).toHaveBeenCalled()
  })
})

// ─── ModelSelector ────────────────────────────────────────────────────────────

describe("ModelSelector", () => {
  const models = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    { id: "claude-3.5", name: "Claude 3.5", provider: "Anthropic" },
  ]

  it("renders select trigger", () => {
    render(<ModelSelector models={models} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("accepts onValueChange prop", () => {
    const onValueChange = vi.fn()
    render(<ModelSelector models={models} onValueChange={onValueChange} />)
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("shows selected model name when value is set", () => {
    render(<ModelSelector models={models} value="claude-3.5" />)
    expect(screen.getByText("Claude 3.5")).toBeInTheDocument()
  })
})

// ─── AIResponseCard ───────────────────────────────────────────────────────────

describe("AIResponseCard", () => {
  it("renders response content", () => {
    render(<AIResponseCard content="Here is my response." />)
    expect(screen.getByText("Here is my response.")).toBeInTheDocument()
  })

  it("renders model badge when model is provided", () => {
    render(<AIResponseCard content="Response" model="GPT-4o" />)
    expect(screen.getByText("GPT-4o")).toBeInTheDocument()
  })

  it("renders copy button", () => {
    render(<AIResponseCard content="Some response" />)
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument()
  })

  it("calls onRegenerate when regenerate button is clicked", async () => {
    const user = userEvent.setup()
    const onRegenerate = vi.fn()
    render(<AIResponseCard content="Response" onRegenerate={onRegenerate} />)
    await user.click(screen.getByRole("button", { name: /regenerate/i }))
    expect(onRegenerate).toHaveBeenCalledOnce()
  })
})

// ─── PromptLibrary ────────────────────────────────────────────────────────────

describe("PromptLibrary", () => {
  const prompts = [
    { id: "1", title: "Summarize", content: "Summarize the following text:", category: "Writing" },
    { id: "2", title: "Translate", content: "Translate to French:", category: "Translation" },
  ]

  it("renders prompt titles", () => {
    render(<PromptLibrary prompts={prompts} />)
    expect(screen.getByText("Summarize")).toBeInTheDocument()
    expect(screen.getByText("Translate")).toBeInTheDocument()
  })

  it("renders search input", () => {
    render(<PromptLibrary prompts={prompts} />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("filters prompts by search query", async () => {
    const user = userEvent.setup()
    render(<PromptLibrary prompts={prompts} />)
    await user.type(screen.getByRole("textbox"), "summ")
    expect(screen.getByText("Summarize")).toBeInTheDocument()
    expect(screen.queryByText("Translate")).not.toBeInTheDocument()
  })

  it("calls onInsert when insert button is clicked", async () => {
    const user = userEvent.setup()
    const onInsert = vi.fn()
    render(<PromptLibrary prompts={prompts} onInsert={onInsert} />)
    const insertBtns = screen.getAllByRole("button", { name: /use|insert/i })
    await user.click(insertBtns[0]!)
    expect(onInsert).toHaveBeenCalledWith(prompts[0]!.content)
  })
})

// ─── ToolCallSequence ─────────────────────────────────────────────────────────

describe("ToolCallSequence", () => {
  const steps = [
    { id: "1", toolName: "search_web", status: "done" as const },
    { id: "2", toolName: "get_weather", status: "running" as const },
    { id: "3", toolName: "send_email", status: "pending" as const },
  ]

  it("renders all tool names", () => {
    render(<ToolCallSequence steps={steps} />)
    expect(screen.getByText("search_web")).toBeInTheDocument()
    expect(screen.getByText("get_weather")).toBeInTheDocument()
    expect(screen.getByText("send_email")).toBeInTheDocument()
  })

  it("renders step statuses", () => {
    render(<ToolCallSequence steps={steps} />)
    expect(screen.getByText("done")).toBeInTheDocument()
    expect(screen.getByText("running")).toBeInTheDocument()
    expect(screen.getByText("pending")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<ToolCallSequence steps={steps} className="custom-seq" />)
    expect(container.firstChild).toHaveClass("custom-seq")
  })
})

// ─── ConversationStarter ─────────────────────────────────────────────────────

describe("ConversationStarter", () => {
  it("renders default title", () => {
    render(<ConversationStarter />)
    expect(screen.getByText(/how can i help/i)).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<ConversationStarter title="What do you need?" />)
    expect(screen.getByText("What do you need?")).toBeInTheDocument()
  })

  it("renders suggestion chips", () => {
    const suggestions = [
      { label: "Summarize", prompt: "Summarize this", icon: undefined },
      { label: "Translate", prompt: "Translate this", icon: undefined },
    ]
    render(<ConversationStarter suggestions={suggestions} />)
    expect(screen.getByText("Summarize")).toBeInTheDocument()
    expect(screen.getByText("Translate")).toBeInTheDocument()
  })

  it("calls onSuggestionClick when a chip is clicked", async () => {
    const user = userEvent.setup()
    const onSuggestionClick = vi.fn()
    const suggestions = [{ label: "Help me write", prompt: "Write a paragraph about", icon: undefined }]
    render(<ConversationStarter suggestions={suggestions} onSuggestionClick={onSuggestionClick} />)
    await user.click(screen.getByText("Help me write"))
    expect(onSuggestionClick).toHaveBeenCalledWith("Write a paragraph about")
  })
})

// ─── AIErrorState ─────────────────────────────────────────────────────────────

describe("AIErrorState", () => {
  it("renders generic error by default", () => {
    render(<AIErrorState />)
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it("renders rate-limit error type", () => {
    render(<AIErrorState type="rate-limit" />)
    expect(screen.getByRole("heading", { name: /rate limit reached/i })).toBeInTheDocument()
  })

  it("renders context-length error type", () => {
    render(<AIErrorState type="context-length" />)
    expect(screen.getByText(/context/i)).toBeInTheDocument()
  })

  it("renders a retry/action button when onRetry is provided", () => {
    render(<AIErrorState onRetry={() => {}} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls onRetry when action button is clicked", async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<AIErrorState onRetry={onRetry} />)
    await user.click(screen.getByRole("button"))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})

// ─── AISettingsPanel ─────────────────────────────────────────────────────────

describe("AISettingsPanel", () => {
  it("renders without crash", () => {
    const { container } = render(<AISettingsPanel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders show/hide toggle button", () => {
    render(<AISettingsPanel />)
    expect(screen.getByRole("button", { name: /show/i })).toBeInTheDocument()
  })

  it("shows settings content after clicking show", async () => {
    const user = userEvent.setup()
    render(<AISettingsPanel />)
    await user.click(screen.getByRole("button", { name: /show/i }))
    expect(screen.getByText(/temperature/i)).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("hides settings content after toggling twice", async () => {
    const user = userEvent.setup()
    render(<AISettingsPanel />)
    await user.click(screen.getByRole("button", { name: /show/i }))
    await user.click(screen.getByRole("button", { name: /hide/i }))
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })
})

// ─── VoiceInput ───────────────────────────────────────────────────────────────

describe("VoiceInput", () => {
  it("renders mic button", () => {
    render(<VoiceInput />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("is disabled when disabled prop is set", () => {
    render(<VoiceInput disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("applies custom className", () => {
    const { container } = render(<VoiceInput className="custom-voice" />)
    expect(container.firstChild).toHaveClass("custom-voice")
  })
})
