"use client"

import * as React from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  Button,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

const GROUPED_FRUITS = {
  Tropical: ["Banana", "Mango", "Pineapple", "Papaya"],
  Berries: ["Cherry", "Strawberry", "Blueberry", "Elderberry"],
  Common: ["Apple", "Pear", "Grape", "Peach"],
}

function BasicComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {value || "Select a fruit…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {FRUITS.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              selected={value === fruit}
              onSelect={() => {
                setValue(fruit === value ? "" : fruit)
                setOpen(false)
              }}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function GroupedComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-52 justify-between">
          {value || "Select a fruit…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {Object.entries(GROUPED_FRUITS).map(([group, items]) => (
            <ComboboxGroup key={group} heading={group}>
              {items.map((fruit) => (
                <ComboboxItem
                  key={fruit}
                  value={fruit}
                  selected={value === fruit}
                  onSelect={() => {
                    setValue(fruit === value ? "" : fruit)
                    setOpen(false)
                  }}
                >
                  {fruit}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function MultiSelectComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  const toggle = (fruit: string) => {
    setSelected((prev) =>
      prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit],
    )
  }

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-56 justify-between">
          {selected.length > 0 ? `${selected.length} selected` : "Select fruits…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {FRUITS.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              selected={selected.includes(fruit)}
              onSelect={() => toggle(fruit)}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const ComboboxInput = React.forwardRef<...>(({ className, ...props }, ref) => (
  <CommandPrimitive.Input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))

// ... ComboboxList, ComboboxEmpty, ComboboxGroup, ComboboxItem

const ComboboxContent = React.forwardRef<...>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 w-[--radix-popover-trigger-width] overflow-hidden rounded-md border border-border bg-popover p-0 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out ...",
        className,
      )}
      sideOffset={4}
      {...props}
    >
      <CommandPrimitive>{children}</CommandPrimitive>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))

const Combobox = PopoverPrimitive.Root
const ComboboxTrigger = PopoverPrimitive.Trigger

export {
  Combobox, ComboboxTrigger, ComboboxContent,
  ComboboxInput, ComboboxList, ComboboxEmpty,
  ComboboxGroup, ComboboxItem,
}`

export default function ComboboxPage() {
  return (
    <ComponentPage
      name="Combobox"
      description="A searchable select built from cmdk and Radix Popover. Compose it from eight primitive parts — trigger, content, input, list, item, empty, and group — for full control over layout and behavior."
      features={[
        "Built on cmdk + Radix UI Popover — no extra library required",
        "Fully composable: eight named sub-components",
        "Single and multi-select patterns via the selected prop on ComboboxItem",
        "Searchable with built-in keyboard navigation",
        "Group items with ComboboxGroup and a heading label",
        "Animates open/close with Tailwind data-state variants",
      ]}
      preview={
        <div className="flex justify-center">
          <BasicComboboxDemo />
        </div>
      }
      previewCode={`"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  Combobox, ComboboxTrigger, ComboboxContent,
  ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

export function ComboboxDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {value || "Select a fruit…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {fruits.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              selected={value === fruit}
              onSelect={() => {
                setValue(fruit === value ? "" : fruit)
                setOpen(false)
              }}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`}
      cliInstall={`npx aether-ui add combobox`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install cmdk @radix-ui/react-popover`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Basic select",
          description: "A single-select combobox with live filtering.",
          preview: (
            <div className="flex justify-center">
              <BasicComboboxDemo />
            </div>
          ),
          code: `"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  Combobox, ComboboxTrigger, ComboboxContent,
  ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

export function BasicCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-48 justify-between">
          {value || "Select a fruit…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {fruits.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              selected={value === fruit}
              onSelect={() => {
                setValue(fruit === value ? "" : fruit)
                setOpen(false)
              }}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
        },
        {
          title: "With groups",
          description: "Use ComboboxGroup with a heading to visually separate items into categories.",
          preview: (
            <div className="flex justify-center">
              <GroupedComboboxDemo />
            </div>
          ),
          code: `const groups = {
  Tropical: ["Banana", "Mango", "Pineapple", "Papaya"],
  Berries: ["Cherry", "Strawberry", "Blueberry", "Elderberry"],
  Common: ["Apple", "Pear", "Grape", "Peach"],
}

<ComboboxList>
  <ComboboxEmpty>No fruit found.</ComboboxEmpty>
  {Object.entries(groups).map(([group, items]) => (
    <ComboboxGroup key={group} heading={group}>
      {items.map((fruit) => (
        <ComboboxItem
          key={fruit}
          value={fruit}
          selected={value === fruit}
          onSelect={() => {
            setValue(fruit === value ? "" : fruit)
            setOpen(false)
          }}
        >
          {fruit}
        </ComboboxItem>
      ))}
    </ComboboxGroup>
  ))}
</ComboboxList>`,
        },
        {
          title: "Multi-select",
          description: "Keep the popover open on select and track an array of selected values.",
          preview: (
            <div className="flex justify-center">
              <MultiSelectComboboxDemo />
            </div>
          ),
          code: `"use client"

import { useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  Combobox, ComboboxTrigger, ComboboxContent,
  ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty,
} from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"

const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]

export function MultiCombobox() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (fruit: string) => {
    setSelected((prev) =>
      prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit]
    )
  }

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-56 justify-between">
          {selected.length > 0 ? \`\${selected.length} selected\` : "Select fruits…"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search fruits…" />
        <ComboboxList>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          {fruits.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              selected={selected.includes(fruit)}
              onSelect={() => toggle(fruit)}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
        },
      ]}
      props={[
        {
          name: "Combobox",
          type: "PopoverPrimitive.Root",
          description: "Root wrapper — manages open/closed state. Accepts open, onOpenChange, defaultOpen.",
        },
        {
          name: "ComboboxTrigger",
          type: "PopoverPrimitive.Trigger",
          description: "The element that toggles the combobox open. Use asChild to render as a Button.",
        },
        {
          name: "ComboboxContent",
          type: "React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>",
          description: "Popover panel containing the Command root. Renders in a portal.",
        },
        {
          name: "ComboboxInput",
          type: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>",
          description: "The search input — filters the list in real time.",
        },
        {
          name: "ComboboxList",
          type: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>",
          description: "Scrollable list container. Max height 300px by default.",
        },
        {
          name: "ComboboxItem",
          type: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & { selected?: boolean }",
          description: "A single selectable option. Set selected={true} to show a checkmark.",
        },
        {
          name: "ComboboxEmpty",
          type: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>",
          description: "Rendered when no items match the current search input.",
        },
        {
          name: "ComboboxGroup",
          type: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>",
          description: "Groups items under a labeled heading. Pass heading prop for the group label.",
        },
      ]}
      a11yNotes={[
        "Built on cmdk which implements the ARIA combobox pattern with listbox role.",
        "Keyboard navigation: arrow keys move between items, Enter selects, Escape closes.",
        "Search input is automatically focused when the popover opens.",
        "Selected state is communicated via aria-selected on each item.",
        "Portal rendering ensures the listbox is not clipped by overflow-hidden containers.",
      ]}
    />
  )
}
