"use client"

import { useState } from "react"
import {
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  toast,
} from "@aetherstack/ui"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  User,
  CalendarDays,
} from "lucide-react"

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="preview-cb"
        checked={checked}
        onCheckedChange={(v) => setChecked(Boolean(v))}
      />
      <Label htmlFor="preview-cb">
        {checked ? "Checked" : "Unchecked"}
      </Label>
    </div>
  )
}

export function SwitchPreview() {
  const [on, setOn] = useState(false)
  return (
    <div className="flex items-center space-x-3">
      <Switch id="preview-sw" checked={on} onCheckedChange={setOn} />
      <Label htmlFor="preview-sw">{on ? "Enabled" : "Disabled"}</Label>
    </div>
  )
}

export function RadioGroupPreview() {
  return (
    <RadioGroup defaultValue="default">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="rp1" />
        <Label htmlFor="rp1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="rp2" />
        <Label htmlFor="rp2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="rp3" />
        <Label htmlFor="rp3">Compact</Label>
      </div>
    </RadioGroup>
  )
}

export function SelectPreview() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
        <SelectItem value="vite">Vite</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function DialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function TabsPreview() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
        <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
        Manage your account settings.
      </TabsContent>
      <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}

export function DropdownMenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuGroupPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Team</DropdownMenuLabel>
          <DropdownMenuItem>Invite members</DropdownMenuItem>
          <DropdownMenuItem>Team settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuCheckboxPreview() {
  const [showStatus, setShowStatus] = useState(true)
  const [showTimeline, setShowTimeline] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Show columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
          Status
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showTimeline} onCheckedChange={setShowTimeline}>
          Timeline
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>
          Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuShortcutsPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem>
          New file <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Save <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary underline underline-offset-4">
          Hover over me
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">@johndoe</p>
            <p className="text-xs text-muted-foreground">Joined December 2021</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Full-stack developer. Building cool things on the web.
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function HoverCardLinkPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="text-primary underline underline-offset-4">
          @aetherstack/ui
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-72" side="top">
        <div>
          <p className="text-sm font-semibold">@aetherstack/ui</p>
          <p className="mt-1 text-xs text-muted-foreground">
            A beautifully designed component library built with Radix UI and Tailwind CSS.
          </p>
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            <span>⭐ 1.2k</span>
            <span>🍴 142 forks</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function TogglePreview() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  )
}

export function ToggleOutlinePreview() {
  return (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <Underline />
      </Toggle>
    </div>
  )
}

export function ToggleSizesPreview() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle bold small">
        <Bold />
      </Toggle>
      <Toggle size="default" aria-label="Toggle bold default">
        <Bold />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold large">
        <Bold />
      </Toggle>
    </div>
  )
}

export function ToggleGroupPreview() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupMultiplePreview() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupOutlinePreview() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToastPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({ title: "Saved!", description: "Your changes have been saved." })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        className="border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
        onClick={() =>
          toast({ variant: "success", title: "Success!", description: "Your action was completed." })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        className="border-blue-500/40 text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40"
        onClick={() =>
          toast({ variant: "info", title: "Heads up", description: "A new version is available." })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        className="border-amber-500/40 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40"
        onClick={() =>
          toast({ variant: "warning", title: "Warning", description: "Your session will expire in 5 minutes." })
        }
      >
        Warning
      </Button>
    </div>
  )
}

export function ToastDestructivePreview() {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
      }
    >
      Show Error Toast
    </Button>
  )
}
