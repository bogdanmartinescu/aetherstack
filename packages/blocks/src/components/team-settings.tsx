"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import {
  Button,
  Input,
  Label,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@aetherstack/ui"

export type TeamMemberRole = "owner" | "admin" | "member"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  avatarUrl?: string
}

export interface TeamSettingsProps {
  members?: TeamMember[]
  onInvite?: (email: string, role: string) => void
  onRoleChange?: (id: string, role: string) => void
  onRemove?: (id: string) => void
  className?: string
}

const ROLE_LABELS: Record<TeamMemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
}

const ROLE_BADGE_VARIANT: Record<TeamMemberRole, "default" | "secondary" | "outline"> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TeamSettings({
  members = [],
  onInvite,
  onRoleChange,
  onRemove,
  className,
}: TeamSettingsProps) {
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<string>("member")

  function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    onInvite?.(inviteEmail.trim(), inviteRole)
    setInviteEmail("")
    setInviteRole("member")
  }

  return (
    <div
      className={cn(
        "w-full rounded-xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Team members</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {members.length} {members.length === 1 ? "member" : "members"}
          </p>
        </div>
      </div>

      {/* Invite form */}
      <form onSubmit={handleInvite} className="mb-6">
        <Label className="mb-1.5 block text-sm font-medium">Invite teammate</Label>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger className="w-[120px] shrink-0">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" size="sm" className="shrink-0">
            Invite
          </Button>
        </div>
      </form>

      {/* Members list */}
      {members.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No team members yet. Invite someone to get started.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {member.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {member.email}
                </p>
              </div>

              {/* Role selector / badge */}
              {onRoleChange && member.role !== "owner" ? (
                <Select
                  value={member.role}
                  onValueChange={(val) => onRoleChange(member.id, val)}
                >
                  <SelectTrigger className="h-7 w-[100px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant={ROLE_BADGE_VARIANT[member.role]} className="shrink-0">
                  {ROLE_LABELS[member.role]}
                </Badge>
              )}

              {/* Remove button (not for owner) */}
              {onRemove && member.role !== "owner" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 shrink-0 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(member.id)}
                  aria-label={`Remove ${member.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
