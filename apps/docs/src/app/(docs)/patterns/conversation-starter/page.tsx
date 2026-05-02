"use client"

import { PatternPage } from "@/components/pattern-page"
import { ConversationStarterPreview } from "./preview"

export default function ConversationStarterPage() {
  return (
    <PatternPage
      name="Conversation Starter"
      description="An empty-state component shown before a conversation begins. Displays a heading, optional subheading, and a set of suggestion chips. Clicking a chip fires onSuggestionClick with the associated prompt string so the parent can pre-fill the input or immediately send a message."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add conversation-starter"
      importCode={`import { ConversationStarter } from "@aetherstack/patterns"`}
      usageCode={`import { ConversationStarter } from "@aetherstack/patterns"
import { Sparkles, Code } from "lucide-react"

export function MyConversationStarter() {
  return (
    <ConversationStarter
      title="How can I help you today?"
      description="Choose a suggestion or type your own message."
      suggestions={[
        {
          label: "Explain a concept",
          icon: <Sparkles className="h-4 w-4" />,
          prompt: "Explain how React hooks work",
        },
        {
          label: "Review my code",
          icon: <Code className="h-4 w-4" />,
          prompt: "Review this code for issues",
        },
      ]}
      onSuggestionClick={(prompt) => setInputValue(prompt)}
    />
  )
}`}
      preview={<ConversationStarterPreview />}
      props={[
        { name: "title", type: "string", default: '"How can I help you today?"', description: "Heading text displayed at the top of the component." },
        { name: "description", type: "string", description: "Optional subheading text shown below the title." },
        { name: "suggestions", type: "Suggestion[]", description: "Array of suggestion chips. Each item requires label and prompt; icon is optional." },
        { name: "onSuggestionClick", type: "(prompt: string) => void", description: "Called with the prompt string when the user clicks a suggestion chip." },
        { name: "className", type: "string", description: "Additional CSS classes applied to the root container." },
      ]}
      a11yNotes={[
        "Suggestion chips are rendered as button elements with the full prompt text as aria-label.",
        "Icons within chips are marked aria-hidden to prevent redundant announcements.",
        "The heading uses an appropriate semantic heading level based on document context.",
      ]}
    />
  )
}
