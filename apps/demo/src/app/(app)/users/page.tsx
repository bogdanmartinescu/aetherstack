"use client"

import * as React from "react"
import { Plus, Search } from "lucide-react"
import {
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
} from "@aetherstack/ui"
import {
  TableToolbar,
  FilterToolbar,
  type ActiveFilter,
} from "@aetherstack/patterns"

type Status = "active" | "invited" | "suspended"
interface User {
  id: string
  name: string
  email: string
  role: string
  status: Status
  joined: string
}

const USERS: User[] = [
  { id: "1", name: "Alex Johnson", email: "alex@acme.com", role: "Admin", status: "active", joined: "2024-03-01" },
  { id: "2", name: "Priya Patel", email: "priya@acme.com", role: "Editor", status: "active", joined: "2024-04-12" },
  { id: "3", name: "Marcus Lee", email: "marcus@acme.com", role: "Viewer", status: "invited", joined: "2025-01-09" },
  { id: "4", name: "Sofia Rivera", email: "sofia@acme.com", role: "Editor", status: "active", joined: "2025-02-21" },
  { id: "5", name: "David Kim", email: "david@acme.com", role: "Admin", status: "active", joined: "2025-03-04" },
  { id: "6", name: "Hana Tanaka", email: "hana@acme.com", role: "Viewer", status: "suspended", joined: "2025-03-19" },
  { id: "7", name: "Liam O'Brien", email: "liam@acme.com", role: "Editor", status: "active", joined: "2025-04-02" },
  { id: "8", name: "Zara Ahmed", email: "zara@acme.com", role: "Viewer", status: "active", joined: "2025-04-15" },
]

const STATUS_VARIANT: Record<Status, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  invited: "secondary",
  suspended: "destructive",
}

export default function UsersPage() {
  const [query, setQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<string | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<Status | null>(null)

  const filtered = USERS.filter((u) => {
    const matchesQuery =
      query === "" ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    const matchesRole = !roleFilter || u.role === roleFilter
    const matchesStatus = !statusFilter || u.status === statusFilter
    return matchesQuery && matchesRole && matchesStatus
  })

  const activeFilters: ActiveFilter[] = [
    ...(roleFilter
      ? [{ id: "role", label: `Role: ${roleFilter}`, onRemove: () => setRoleFilter(null) }]
      : []),
    ...(statusFilter
      ? [{ id: "status", label: `Status: ${statusFilter}`, onRemove: () => setStatusFilter(null) }]
      : []),
  ]

  return (
    <Card>
      <CardContent className="px-4 sm:px-6">
        <TableToolbar
          search={
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email…"
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          }
          filters={
            <FilterToolbar
              activeFilters={activeFilters}
              onClearAll={() => {
                setRoleFilter(null)
                setStatusFilter(null)
              }}
            >
              <FilterDropdown
                label="Role"
                value={roleFilter}
                options={["Admin", "Editor", "Viewer"]}
                onChange={setRoleFilter}
              />
              <FilterDropdown
                label="Status"
                value={statusFilter}
                options={["active", "invited", "suspended"]}
                onChange={(v) => setStatusFilter(v as Status | null)}
              />
            </FilterToolbar>
          }
          actions={
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Invite user
            </Button>
          }
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[user.status]} className="capitalize">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.joined}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  No users match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string | null
  options: string[]
  onChange: (next: string | null) => void
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
      className="rounded-md border border-input bg-background px-2 py-1 text-xs"
      aria-label={`Filter by ${label}`}
    >
      <option value="">{label}: any</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {label}: {opt}
        </option>
      ))}
    </select>
  )
}
