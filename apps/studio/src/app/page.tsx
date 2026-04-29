"use client"

import { useState } from "react"
import {
  AlertCircle,
  BarChart3,
  Inbox,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users as UsersIcon,
} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@aetherstack/ui"
import {
  Breadcrumb,
  EmptyState,
  ErrorState,
  FilterPill,
  FilterToolbar,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  LoadingState,
  MetricCard,
  NavGroup,
  NavItem,
  PageHeader,
  SectionHeader,
  SettingsSection,
  SidebarNav,
  TableToolbar,
} from "@aetherstack/patterns"
import { DashboardShell, LoginBlock, SignupBlock } from "@aetherstack/blocks"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-semibold text-foreground border-b border-border pb-2">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start gap-3 rounded-lg border border-border bg-card p-6">
      {children}
    </div>
  )
}

export default function StudioPage() {
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(false)

  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-6">
            <div className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Aetherstack · Internal
            </div>
            <h1 className="text-3xl font-bold text-foreground">Aether Studio</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Live playground for primitives, patterns, and blocks.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <a href="#primitives" className="text-primary hover:underline">Primitives</a>
              <span className="text-border">·</span>
              <a href="#patterns" className="text-primary hover:underline">Patterns</a>
              <span className="text-border">·</span>
              <a href="#blocks" className="text-primary hover:underline">Blocks</a>
            </div>
          </div>

          <h2 id="primitives" className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Primitives
          </h2>

          {/* ── Button ─────────────────────────────────────────────────────── */}
          <Section title="Button">
            <Preview>
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </Preview>
            <Preview>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">+</Button>
              <Button disabled>Disabled</Button>
            </Preview>
          </Section>

          {/* ── Badge ──────────────────────────────────────────────────────── */}
          <Section title="Badge">
            <Preview>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </Preview>
          </Section>

          {/* ── Input ──────────────────────────────────────────────────────── */}
          <Section title="Input">
            <Preview>
              <div className="w-64 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="w-64 space-y-2">
                <Label htmlFor="disabled-input">Disabled</Label>
                <Input id="disabled-input" placeholder="Disabled input" disabled />
              </div>
            </Preview>
          </Section>

          {/* ── Textarea ───────────────────────────────────────────────────── */}
          <Section title="Textarea">
            <Preview>
              <div className="w-72 space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Write your message here…" />
              </div>
              <div className="w-72 space-y-2">
                <Label htmlFor="disabled-ta">Disabled</Label>
                <Textarea id="disabled-ta" placeholder="Disabled" disabled />
              </div>
            </Preview>
          </Section>

          {/* ── Checkbox ───────────────────────────────────────────────────── */}
          <Section title="Checkbox">
            <Preview>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(v) => setChecked(Boolean(v))}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-cb" disabled />
                <Label htmlFor="disabled-cb" className="opacity-50">
                  Disabled
                </Label>
              </div>
            </Preview>
          </Section>

          {/* ── Radio Group ────────────────────────────────────────────────── */}
          <Section title="Radio Group">
            <Preview>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </Preview>
          </Section>

          {/* ── Switch ─────────────────────────────────────────────────────── */}
          <Section title="Switch">
            <Preview>
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  checked={switched}
                  onCheckedChange={setSwitched}
                />
                <Label htmlFor="airplane-mode">
                  Airplane mode {switched ? "(on)" : "(off)"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-sw" disabled />
                <Label htmlFor="disabled-sw" className="opacity-50">
                  Disabled
                </Label>
              </div>
            </Preview>
          </Section>

          {/* ── Select ─────────────────────────────────────────────────────── */}
          <Section title="Select">
            <Preview>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="cherry">Cherry</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                </SelectContent>
              </Select>
            </Preview>
          </Section>

          {/* ── Tabs ───────────────────────────────────────────────────────── */}
          <Section title="Tabs">
            <Preview>
              <Tabs defaultValue="account" className="w-full max-w-lg">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="pt-4 text-sm text-muted-foreground">
                  Manage your account settings and preferences.
                </TabsContent>
                <TabsContent value="password" className="pt-4 text-sm text-muted-foreground">
                  Change your password and security options.
                </TabsContent>
                <TabsContent
                  value="notifications"
                  className="pt-4 text-sm text-muted-foreground"
                >
                  Configure how you receive notifications.
                </TabsContent>
              </Tabs>
            </Preview>
          </Section>

          {/* ── Card ───────────────────────────────────────────────────────── */}
          <Section title="Card">
            <Preview>
              <Card className="w-72">
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                  <CardDescription>Your current plan and usage</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Pro plan · 12 of 50 seats used
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </CardFooter>
              </Card>
            </Preview>
          </Section>

          {/* ── Skeleton ───────────────────────────────────────────────────── */}
          <Section title="Skeleton">
            <Preview>
              <div className="flex flex-col gap-3 w-72">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </Preview>
          </Section>

          {/* ── Table ──────────────────────────────────────────────────────── */}
          <Section title="Table">
            <Preview>
              <Table>
                <TableCaption>Active users · last 7 days</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Chen", role: "Admin", status: "Active", date: "Jan 2025" },
                    { name: "Bob Marsh", role: "Editor", status: "Active", date: "Mar 2025" },
                    { name: "Carla Voss", role: "Viewer", status: "Inactive", date: "Apr 2025" },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Badge
                          variant={row.status === "Active" ? "default" : "secondary"}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {row.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Preview>
          </Section>

          {/* ── Tooltip ────────────────────────────────────────────────────── */}
          <Section title="Tooltip">
            <Preview>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
            </Preview>
          </Section>

          {/* ── Dialog ─────────────────────────────────────────────────────── */}
          <Section title="Dialog">
            <Preview>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Confirm action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to perform this action? It cannot be
                      undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Preview>
          </Section>

          {/* ── Sheet ──────────────────────────────────────────────────────── */}
          <Section title="Sheet">
            <Preview>
              {(["left", "right", "top", "bottom"] as const).map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="capitalize">
                      {side}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Sheet ({side})</SheetTitle>
                      <SheetDescription>
                        This sheet slides in from the {side}.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              ))}
            </Preview>
          </Section>

          {/* ── Patterns ───────────────────────────────────────────────────── */}
          <h2
            id="patterns"
            className="mb-6 mt-16 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Patterns
          </h2>

          <Section title="PageHeader + Breadcrumb">
            <Preview>
              <div className="w-full">
                <PageHeader
                  title="Project settings"
                  description="Manage members, permissions, and integrations."
                  breadcrumb={[
                    { label: "Workspace", href: "#" },
                    { label: "Acme" },
                  ]}
                  actions={
                    <>
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm">Save</Button>
                    </>
                  }
                />
              </div>
            </Preview>
            <Preview>
              <Breadcrumb
                items={[
                  { label: "Home", href: "#" },
                  { label: "Reports", href: "#" },
                  { label: "Q3 Revenue" },
                ]}
              />
            </Preview>
          </Section>

          <Section title="SectionHeader + SettingsSection">
            <Preview>
              <div className="w-full">
                <SectionHeader
                  title="Team members"
                  description="Invite collaborators to your workspace."
                  action={<Button size="sm">Invite</Button>}
                />
              </div>
            </Preview>
            <Preview>
              <div className="w-full">
                <SettingsSection
                  title="API access"
                  description="Generate keys for programmatic access."
                  footer={<Button size="sm">Save</Button>}
                >
                  <p className="text-sm text-muted-foreground">
                    No API keys yet. Generate one to start using the API.
                  </p>
                </SettingsSection>
              </div>
            </Preview>
          </Section>

          <Section title="EmptyState · LoadingState · ErrorState">
            <Preview>
              <div className="w-full max-w-xl">
                <EmptyState
                  icon={<Inbox className="h-6 w-6" />}
                  title="No messages yet"
                  description="When new messages arrive, you'll see them here."
                  action={<Button size="sm">Compose</Button>}
                />
              </div>
            </Preview>
            <Preview>
              <div className="w-full max-w-xl">
                <LoadingState text="Loading reports…" />
              </div>
            </Preview>
            <Preview>
              <div className="w-full max-w-xl">
                <ErrorState
                  title="Could not load reports"
                  description="Something went wrong fetching your data."
                  action={<Button size="sm">Try again</Button>}
                />
              </div>
            </Preview>
          </Section>

          <Section title="MetricCard">
            <Preview>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                <MetricCard
                  label="Revenue"
                  value="$48,295"
                  change="+12.5%"
                  trend="up"
                  icon={<BarChart3 className="h-5 w-5" />}
                />
                <MetricCard
                  label="Users"
                  value="3,241"
                  change="+8.1%"
                  trend="up"
                  icon={<UsersIcon className="h-5 w-5" />}
                />
                <MetricCard
                  label="Churn"
                  value="1.2%"
                  change="+0.3%"
                  trend="down"
                  icon={<AlertCircle className="h-5 w-5" />}
                />
              </div>
            </Preview>
          </Section>

          <Section title="TableToolbar · FilterToolbar · FilterPill">
            <Preview>
              <div className="w-full">
                <TableToolbar
                  search={
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search…" className="pl-8" />
                    </div>
                  }
                  filters={
                    <FilterToolbar
                      activeFilters={[
                        { id: "role", label: "Role: Admin", onRemove: () => {} },
                        { id: "active", label: "Active", onRemove: () => {} },
                      ]}
                      onClearAll={() => {}}
                    />
                  }
                  actions={
                    <Button size="sm">
                      <Plus className="mr-1 h-4 w-4" />
                      New
                    </Button>
                  }
                />
              </div>
            </Preview>
            <Preview>
              <FilterPill label="Stage: Discovery" onRemove={() => {}} />
              <FilterPill label="Owner: Alex" onRemove={() => {}} />
              <FilterPill label="Created this week" />
            </Preview>
          </Section>

          <Section title="FormField (label + control + message)">
            <Preview>
              <div className="w-full max-w-sm">
                <FormField name="email" error="This field is required">
                  <FormLabel>Work email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" />
                  </FormControl>
                  <FormDescription>We&apos;ll never share it.</FormDescription>
                  <FormMessage />
                </FormField>
              </div>
            </Preview>
          </Section>

          <Section title="SidebarNav · NavGroup · NavItem">
            <Preview>
              <div className="w-64 rounded-lg border border-border bg-card p-2">
                <SidebarNav>
                  <NavGroup>
                    <NavItem
                      href="#"
                      icon={<LayoutDashboard className="h-4 w-4" />}
                      label="Dashboard"
                      active
                    />
                    <NavItem
                      href="#"
                      icon={<UsersIcon className="h-4 w-4" />}
                      label="Users"
                      badge="4"
                    />
                  </NavGroup>
                  <NavGroup label="Settings">
                    <NavItem
                      href="#"
                      icon={<Settings className="h-4 w-4" />}
                      label="General"
                    />
                  </NavGroup>
                </SidebarNav>
              </div>
            </Preview>
          </Section>

          {/* ── Blocks ─────────────────────────────────────────────────────── */}
          <h2
            id="blocks"
            className="mb-6 mt-16 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Blocks
          </h2>

          <Section title="DashboardShell">
            <Preview>
              <div
                className="w-full overflow-hidden rounded-md border border-border"
                style={{ height: 480 }}
              >
                <div
                  style={{
                    transform: "scale(0.6)",
                    transformOrigin: "top left",
                    width: "166.67%",
                    height: "166.67%",
                  }}
                >
                  <DashboardShell appName="Acme" pageTitle="Dashboard">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <MetricCard label="Revenue" value="$48,295" change="+12.5%" trend="up" />
                      <MetricCard label="Users" value="3,241" change="+8.1%" trend="up" />
                      <MetricCard label="Churn" value="1.2%" change="-0.3%" trend="up" />
                    </div>
                  </DashboardShell>
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="LoginBlock">
            <Preview>
              <div
                className="w-full overflow-hidden rounded-md border border-border"
                style={{ height: 560 }}
              >
                <div
                  style={{
                    transform: "scale(0.7)",
                    transformOrigin: "top left",
                    width: "142.86%",
                    height: "142.86%",
                  }}
                >
                  <LoginBlock />
                </div>
              </div>
            </Preview>
          </Section>

          <Section title="SignupBlock">
            <Preview>
              <div
                className="w-full overflow-hidden rounded-md border border-border"
                style={{ height: 560 }}
              >
                <div
                  style={{
                    transform: "scale(0.7)",
                    transformOrigin: "top left",
                    width: "142.86%",
                    height: "142.86%",
                  }}
                >
                  <SignupBlock />
                </div>
              </div>
            </Preview>
          </Section>
        </div>
      </main>
    </TooltipProvider>
  )
}
