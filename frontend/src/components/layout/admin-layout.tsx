"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart, Bell, CalendarClock, ChevronDown, DollarSign, LogOut, Menu, SettingsIcon, User, Users, Utensils, UtensilsCrossed } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Navigation items component
    const NavItems = () => (
        <>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin">
                    <BarChart className="h-4 w-4" />
                    Dashboard
                </a>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin/orders">
                    <UtensilsCrossed className="h-4 w-4" />
                    Orders
                </a>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin/tables">
                    <Users className="h-4 w-4" />
                    Tables
                </a>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin/payments">
                    <DollarSign className="h-4 w-4" />
                    Payments
                </a>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin/menu">
                    <Utensils className="h-4 w-4" />
                    Menu
                </a>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <a href="/admin/reservations">
                    <CalendarClock className="h-4 w-4" />
                    Reservations
                </a>
            </Button>
        </>
    )

    return (
        <main className="bg-background min-h-screen">
            {/* Mobile Sidebar */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <div className="flex h-14 items-center border-b px-4">
                        <span className="font-semibold">Restaurant Admin</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 p-2">
                        <NavItems />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 border-r bg-muted/40 z-30">
                <div className="flex h-14 items-center border-b px-4 bg-background">
                    <span className="font-semibold">Restaurant Admin</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 p-2">
                    <NavItems />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Header */}
                <div className="border-b sticky top-0 bg-background z-20">
                    <div className="flex h-14 items-center gap-4 px-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>

                        <h1 className="font-semibold">Admin Dashboard</h1>

                        <div className="ml-auto flex items-center gap-2 sm:gap-4">
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                                    3
                                </span>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <span>John Doe</span>
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <SettingsIcon className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile user icon */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="sm:hidden">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <SettingsIcon className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>

            {/* Toast notifications */}
            <Toaster />
        </main>
    )
}
