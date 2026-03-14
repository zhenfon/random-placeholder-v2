"use client"

import { useTheme } from "next-themes"
import { IconMoon, IconSun } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" />}
      >
        <IconSun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <IconMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl m-3">random placeholder v2</h1>
        <div className="flex items-center justify-center absolute right-0 px-3">
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </div>
  )
}
