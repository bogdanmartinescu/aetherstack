"use client"

import * as React from "react"
import { LogOut } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface ProfileDropdownItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  separator?: boolean
}

export interface ProfileDropdownUser {
  name: string
  email: string
  avatarUrl?: string
  role?: string
}

export interface ProfileDropdownProps {
  user: ProfileDropdownUser
  items?: ProfileDropdownItem[]
  onSignOut?: () => void
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function ProfileDropdown({ user, items = [], onSignOut, className }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Open profile menu for ${user.name}`}
        className={cn(
          "ring-offset-background focus-visible:ring-ring rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          className,
        )}
      >
        <Avatar className="h-8 w-8">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground font-semibold">{user.name}</span>
            <span className="text-muted-foreground text-xs">{user.email}</span>
            {user.role && <span className="text-muted-foreground text-xs">{user.role}</span>}
          </div>
        </DropdownMenuLabel>
        {items.length > 0 && (
          <>
            <DropdownMenuSeparator />
            {items.map((item, index) =>
              item.separator ? (
                <DropdownMenuSeparator key={index} />
              ) : (
                <DropdownMenuItem
                  key={index}
                  onClick={item.onClick}
                  asChild={Boolean(item.href)}
                  className="gap-2"
                >
                  {item.href ? (
                    <a href={item.href}>
                      {item.icon && <span aria-hidden="true">{item.icon}</span>}
                      {item.label}
                    </a>
                  ) : (
                    <>
                      {item.icon && <span aria-hidden="true">{item.icon}</span>}
                      {item.label}
                    </>
                  )}
                </DropdownMenuItem>
              ),
            )}
          </>
        )}
        {onSignOut && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onSignOut}
              className="text-destructive focus:text-destructive gap-2"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
