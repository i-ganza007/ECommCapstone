"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ShadcnDropDownCheckbox({
  children,
  className,
}: {
  children: React.ReactNode
  /** Styles the trigger itself — it is the button, so nothing may wrap it in one. */
  className?: string
}) {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("flex items-center justify-center", className)}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-brand">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-brand">Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar ?? false}
            onCheckedChange={setShowStatusBar}
            className="text-brand focus:text-brand focus:**:text-brand"
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
            className="text-brand focus:text-brand focus:**:text-brand"
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
            className="text-brand focus:text-brand focus:**:text-brand"
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
