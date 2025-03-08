"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ClipboardList, Utensils, Table, LayoutGrid, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Menu Management",
    href: "/admin/menu",
    icon: Utensils,
  },
  {
    title: "Tables",
    href: "/admin/tables",
    icon: Table,
  },
  {
    title: "Shop Layout",
    href: "/admin/layout",
    icon: LayoutGrid,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-muted/20 h-screen sticky top-16 pt-6">
      <div className="space-y-1 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        ))}
      </div>
    </div>
  )
}

