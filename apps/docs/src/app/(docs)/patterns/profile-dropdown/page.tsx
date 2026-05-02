import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ProfileDropdownPreview } from "./preview"

export const metadata: Metadata = {
  title: "Profile Dropdown",
  description: "A user avatar trigger with name, role, and a dropdown of nav links and sign-out.",
}

export default function ProfileDropdownPage() {
  return (
    <PatternPage
      name="Profile Dropdown"
      description="A user avatar trigger with name, role, and a dropdown of nav links and a sign-out action. Designed for top navigation bars and sidebars."
      cliInstall="npx aether-ui add profile-dropdown"
      importCode={`import { ProfileDropdown } from "@aetherstack/patterns"`}
      usageCode={`import { ProfileDropdown } from "@aetherstack/patterns"

export function AppHeader() {
  return (
    <ProfileDropdown
      user={{
        name: "Alice Chen",
        email: "alice@example.com",
        avatarUrl: "/avatars/alice.png",
        role: "Admin",
      }}
      items={[
        { label: "Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
      ]}
      onSignOut={() => signOut()}
    />
  )
}`}
      preview={<ProfileDropdownPreview />}
      props={[
        { name: "user", type: "{ name: string; email: string; avatarUrl?: string; role?: string }", required: true, description: "User data shown in the trigger and at the top of the dropdown." },
        { name: "items", type: "{ label: string; href: string }[]", required: true, description: "Navigation links rendered in the dropdown body." },
        { name: "onSignOut", type: "() => void", required: true, description: "Called when the user clicks the sign-out item." },
        { name: "className", type: "string", description: "Additional classes on the trigger button." },
      ]}
      a11yNotes={[
        "Avatar trigger uses aria-haspopup=\"menu\" and aria-expanded.",
        "Dropdown uses role=\"menu\"; each link is role=\"menuitem\".",
        "User name and email in the header section are aria-hidden since they are decorative summaries.",
        "Escape closes the menu and returns focus to the trigger.",
      ]}
    />
  )
}
