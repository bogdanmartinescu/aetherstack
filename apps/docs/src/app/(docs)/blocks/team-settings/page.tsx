import type { Metadata } from "next"
import { TeamSettings } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Team Settings",
  description: "Member list with role management, invite form, and remove actions.",
}

const MEMBERS = [
  { id: "1", name: "Alice Martin", email: "alice@example.com", role: "owner" as const },
  { id: "2", name: "Bob Chen", email: "bob@example.com", role: "admin" as const },
  { id: "3", name: "Carol Kim", email: "carol@example.com", role: "member" as const },
  { id: "4", name: "David Park", email: "david@example.com", role: "member" as const },
]

export default function TeamSettingsPage() {
  return (
    <BlockPage
      name="Team Settings"
      category="Settings"
      description="A team management panel listing current members with their roles. Owners and admins can invite new members by email, change roles via a select dropdown, and remove members."
      cliInstall="npx aether-ui add team-settings"
      previewHeight="520px"
      importCode={`import { TeamSettings } from "@aetherstack/blocks"
import type { TeamMember } from "@aetherstack/blocks"`}
      usageCode={`import { TeamSettings } from "@aetherstack/blocks"
import type { TeamMember } from "@aetherstack/blocks"

const members: TeamMember[] = [
  { id: "1", name: "Alice Martin", email: "alice@example.com", role: "owner" },
  { id: "2", name: "Bob Chen",     email: "bob@example.com",   role: "member" },
]

export default function TeamPage() {
  return (
    <TeamSettings
      members={members}
      onInvite={(email, role) => inviteMember(email, role)}
      onRoleChange={(id, role) => updateRole(id, role)}
      onRemove={(id) => removeMember(id)}
    />
  )
}`}
      preview={
        <div className="p-6">
          <TeamSettings members={MEMBERS} />
        </div>
      }
      props={[
        { name: "members", type: "TeamMember[]", description: "Current team members. Each has id, name, email, role, and optional avatarUrl." },
        { name: "onInvite", type: "(email: string, role: string) => void", description: "Called when the invite form is submitted." },
        { name: "onRoleChange", type: "(id: string, role: string) => void", description: "Called when a member's role is changed via the select." },
        { name: "onRemove", type: "(id: string) => void", description: "Called when the remove button is clicked for a member." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Role select dropdowns are built on the Select primitive with proper ARIA combobox semantics.",
        "Remove buttons carry aria-label including the member's name for screen reader context.",
        "The invite form email input has type=\"email\" for native validation and mobile keyboard optimisation.",
        "Member avatars fall back to initials via the AvatarFallback primitive.",
      ]}
    />
  )
}
