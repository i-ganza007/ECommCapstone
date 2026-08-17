"use client"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Keep menu text on the brand coral, including while an item is focused/hovered.
const itemClass = "text-brand focus:text-brand focus:**:text-brand"

export default function ShadcnDropDown({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"flex justify-center items-center"}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="text-brand">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-brand">My Account</DropdownMenuLabel>
          <DropdownMenuItem className={itemClass}>Profile</DropdownMenuItem>
          <DropdownMenuItem className={itemClass}>Billing</DropdownMenuItem>
          <DropdownMenuItem className={itemClass}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={itemClass}>GitHub</DropdownMenuItem>
        <DropdownMenuItem className={itemClass}>Support</DropdownMenuItem>
        <DropdownMenuItem className={itemClass} disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
