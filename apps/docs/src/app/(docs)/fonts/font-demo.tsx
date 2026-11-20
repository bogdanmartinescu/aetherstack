"use client"

import { Button } from "@aetherstack/ui"
import { Input } from "@aetherstack/ui"
import { Badge } from "@aetherstack/ui"
import { Search, Bell, Plus, Settings } from "lucide-react"

export function FontDemo() {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
      {/* Mock top bar */}
      <div className="border-border bg-muted/30 flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-foreground text-sm font-bold">Acme Dashboard</span>
          <span className="text-muted-foreground hidden text-xs sm:block">/ Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7" aria-label="Search">
            <Search className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" aria-label="Notifications">
            <Bell className="h-3.5 w-3.5" />
          </Button>
          <div className="bg-primary/20 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
            A
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Page header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-foreground text-lg font-semibold">Team overview</h2>
            <p className="text-muted-foreground text-sm">
              Manage your team members and their account permissions here.
            </p>
          </div>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Invite user
          </Button>
        </div>

        {/* Search + filters */}
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
            <Input className="h-8 pl-8 text-sm" placeholder="Search members…" readOnly />
          </div>
          <Button size="sm" variant="outline">
            <Settings className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="border-border overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border bg-muted/40 border-b">
                <th className="text-muted-foreground px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="text-muted-foreground hidden px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider sm:table-cell">
                  Role
                </th>
                <th className="text-muted-foreground px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {[
                { name: "Sofia Davies", email: "sofia@acme.com", role: "Admin", status: "Active" },
                {
                  name: "Jackson Lee",
                  email: "jackson@acme.com",
                  role: "Developer",
                  status: "Active",
                },
                {
                  name: "Isabella Nguyen",
                  email: "isabella@acme.com",
                  role: "Designer",
                  status: "Away",
                },
                { name: "William Kim", email: "will@acme.com", role: "Viewer", status: "Inactive" },
              ].map((row) => (
                <tr key={row.email} className="hover:bg-muted/20 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="text-foreground font-medium">{row.name}</div>
                    <div className="text-muted-foreground text-xs">{row.email}</div>
                  </td>
                  <td className="text-muted-foreground hidden px-3 py-2.5 sm:table-cell">
                    {row.role}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge
                      variant={
                        row.status === "Active"
                          ? "default"
                          : row.status === "Away"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">Showing 4 of 24 members</p>
          <div className="flex gap-1">
            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
              Previous
            </Button>
            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
