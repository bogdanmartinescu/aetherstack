"use client"

import { ProfileDropdown } from "@aetherstack/patterns"

const USER = {
  name: "Alice Chen",
  email: "alice@example.com",
  avatarUrl: "",
  role: "Admin",
}

const ITEMS = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
]

export function ProfileDropdownPreview() {
  return (
    <ProfileDropdown
      user={USER}
      items={ITEMS}
      onSignOut={() => alert("Signed out")}
    />
  )
}
