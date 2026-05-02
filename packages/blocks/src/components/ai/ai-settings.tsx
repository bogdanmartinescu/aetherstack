"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@aetherstack/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Textarea,
  Separator,
} from "@aetherstack/ui"

interface Model {
  id: string
  name: string
  provider: string
}

interface AISettingsProps {
  apiKey?: string
  onApiKeyChange?: (v: string) => void
  model?: string
  onModelChange?: (v: string) => void
  models?: Model[]
  temperature?: number
  onTemperatureChange?: (v: number) => void
  maxTokens?: number
  onMaxTokensChange?: (v: number) => void
  systemPrompt?: string
  onSystemPromptChange?: (v: string) => void
  className?: string
}

function AISettings({
  apiKey = "",
  onApiKeyChange,
  model,
  onModelChange,
  models = [],
  temperature = 0.7,
  onTemperatureChange,
  maxTokens = 2048,
  onMaxTokensChange,
  systemPrompt = "",
  onSystemPromptChange,
  className,
}: AISettingsProps) {
  const [showKey, setShowKey] = React.useState(false)

  return (
    <div className={cn("flex flex-col gap-6 max-w-2xl", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>API Key</Label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => onApiKeyChange?.(e.target.value)}
                placeholder="sk-…"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? "Hide API key" : "Show API key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {models.length > 0 && (
            <div className="flex flex-col gap-2">
              <Label>Model</Label>
              <Select {...(model !== undefined ? { value: model } : {})} {...(onModelChange !== undefined ? { onValueChange: onModelChange } : {})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.provider} / {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generation Parameters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Temperature</Label>
              <span className="text-sm text-muted-foreground font-mono">{temperature.toFixed(2)}</span>
            </div>
            <Slider
              min={0}
              max={2}
              step={0.01}
              value={[temperature]}
              onValueChange={([v]) => v !== undefined && onTemperatureChange?.(v)}
            />
            <p className="text-xs text-muted-foreground">Controls randomness — 0 is deterministic, 2 is very creative.</p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Max tokens</Label>
              <span className="text-sm text-muted-foreground font-mono">{maxTokens}</span>
            </div>
            <Slider
              min={256}
              max={8192}
              step={256}
              value={[maxTokens]}
              onValueChange={([v]) => v !== undefined && onMaxTokensChange?.(v)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">System Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange?.(e.target.value)}
            placeholder="You are a helpful assistant…"
            rows={6}
            className="resize-y"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            This prompt is sent at the start of every conversation.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export { AISettings }
