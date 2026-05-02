"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Badge,
} from "@aetherstack/ui"

interface Model {
  id: string
  name: string
  provider: string
  capabilities?: string[]
}

interface ModelSelectorProps {
  models: Model[]
  value?: string
  onValueChange?: (id: string) => void
  className?: string
}

function ModelSelector({ models, value, onValueChange, className }: ModelSelectorProps) {
  const grouped = React.useMemo(() => {
    const map = new Map<string, Model[]>()
    for (const model of models) {
      const group = map.get(model.provider) ?? []
      group.push(model)
      map.set(model.provider, group)
    }
    return map
  }, [models])

  return (
    <Select
      {...(value !== undefined ? { value } : {})}
      {...(onValueChange !== undefined ? { onValueChange } : {})}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {Array.from(grouped.entries()).map(([provider, providerModels]) => (
          <SelectGroup key={provider}>
            <SelectLabel>{provider}</SelectLabel>
            {providerModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex items-center gap-2">
                  <span>{model.name}</span>
                  {model.capabilities?.map((cap) => (
                    <Badge key={cap} variant="secondary" className="text-xs py-0">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

export { ModelSelector }
