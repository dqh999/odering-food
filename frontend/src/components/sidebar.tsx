"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart, Coffee, DollarSign, LayoutDashboard, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-sky-500",
    },
    {
        label: "Menu",
        icon: Coffee,
        href: "/admin/menu",
        color: "text-violet-500",
    },
    {
        label: "Orders",
        icon: DollarSign,
        href: "/admin/orders",
        color: "text-pink-700",
    },
    {
        label: "Tables",
        icon: Users,
        href: "/admin/tables",
        color: "text-orange-700",
    },
    {
        label: "Analytics",
        icon: BarChart,
        href: "/admin/analytics",
        color: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/admin/settings",
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-muted/40 text-muted-foreground">
            <div className="px-3 py-2 flex-1">
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Button
                            key={route.href}
                            variant={pathname === route.href ? "secondary" : "ghost"}
                            className={cn("w-full justify-start", pathname === route.href && "bg-muted")}
                            asChild
                        >
                            <Link href={route.href}>
                                <route.icon className={cn("mr-2 h-4 w-4", route.color)} />
                                {route.label}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

