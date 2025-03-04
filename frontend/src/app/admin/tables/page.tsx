"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Bell, DollarSign, Users, BarChart, Menu, ChevronDown, User, LogOut, SettingsIcon, UtensilsCrossed, Plus, Edit, Trash2, MoreHorizontal, Coffee } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for tables
const tables = [
    {
        id: "T001",
        number: "1",
        capacity: 2,
        status: "available",
        location: "Window",
        lastOrder: null,
    },
    {
        id: "T002",
        number: "2",
        capacity: 4,
        status: "occupied",
        location: "Window",
        lastOrder: "ORD001",
    },
    {
        id: "T003",
        number: "3",
        capacity: 4,
        status: "reserved",
        location: "Center",
        lastOrder: null,
        reservationTime: "2024-03-03T18:30:00",
    },
    {
        id: "T004",
        number: "4",
        capacity: 6,
        status: "occupied",
        location: "Corner",
        lastOrder: "ORD002",
    },
    {
        id: "T005",
        number: "5",
        capacity: 2,
        status: "available",
        location: "Bar",
        lastOrder: null,
    },
    {
        id: "T006",
        number: "6",
        capacity: 8,
        status: "reserved",
        location: "Private Room",
        lastOrder: null,
        reservationTime: "2024-03-03T19:00:00",
    },
    {
        id: "T007",
        number: "7",
        capacity: 4,
        status: "available",
        location: "Terrace",
        lastOrder: null,
    },
    {
        id: "T008",
        number: "8",
        capacity: 4,
        status: "occupied",
        location: "Terrace",
        lastOrder: "ORD003",
    },
]

// Stats for tables
const tableStats = {
    total: 8,
    available: 3,
    occupied: 3,
    reserved: 2,
}

export default function TableManagement() {
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAddTableOpen, setIsAddTableOpen] = useState(false)
    const [newTable, setNewTable] = useState({
        number: "",
        capacity: "2",
        location: "Window",
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "available":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                        Available
                    </Badge>
                )
            case "occupied":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                        Occupied
                    </Badge>
                )
            case "reserved":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Reserved
                    </Badge>
                )
            default:
                return null
        }
    }

    const filteredTables = tables.filter((table) => {
        if (selectedStatus !== "all" && table.status !== selectedStatus) return false
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase()
            return (
                table.id.toLowerCase().includes(searchLower) ||
                table.number.toLowerCase().includes(searchLower) ||
                table.location.toLowerCase().includes(searchLower)
            )
        }
        return true
    })

    const handleAddTable = () => {
        // In a real app, this would add the table to the database
        console.log("Adding new table:", newTable)
        setIsAddTableOpen(false)
        // Reset form
        setNewTable({
            number: "",
            capacity: "2",
            location: "Window",
        })
    }

    const NavItems = () => (
        <>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <Link href="/admin/dashboard">
                    <BarChart className="h-4 w-4" />
                    Dashboard
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <Link href="/admin/orders">
                    <UtensilsCrossed className="h-4 w-4" />
                    Orders
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full bg-muted" asChild>
                <Link href="/admin/tables">
                    <Users className="h-4 w-4" />
                    Tables
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <Link href="/admin/menu">
                    <Coffee className="h-4 w-4" />
                    Menu
                </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
                <Link href="/admin/payments">
                    <DollarSign className="h-4 w-4" />
                    Payments
                </Link>
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>

                        <h1 className="font-semibold">Table Management</h1>

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

                <div className="p-4 space-y-4">
                    {/* Stats */}
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tableStats.total}</div>
                                <p className="text-xs text-muted-foreground">All restaurant tables</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Available</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tableStats.available}</div>
                                <p className="text-xs text-muted-foreground">Ready for customers</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Occupied</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tableStats.occupied}</div>
                                <p className="text-xs text-muted-foreground">Currently in use</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Reserved</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tableStats.reserved}</div>
                                <p className="text-xs text-muted-foreground">Booked for today</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table view options */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <Tabs defaultValue="list" className="w-full sm:w-auto">
                            <TabsList>
                                <TabsTrigger value="list">List View</TabsTrigger>
                                <TabsTrigger value="grid">Grid View</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add New Table
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Table</DialogTitle>
                                    <DialogDescription>
                                        Enter the details for the new table. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="table-number" className="text-right">
                                            Table Number
                                        </Label>
                                        <Input
                                            id="table-number"
                                            value={newTable.number}
                                            onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="capacity" className="text-right">
                                            Capacity
                                        </Label>
                                        <Select
                                            value={newTable.capacity}
                                            onValueChange={(value) => setNewTable({ ...newTable, capacity: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select capacity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 Person</SelectItem>
                                                <SelectItem value="2">2 People</SelectItem>
                                                <SelectItem value="4">4 People</SelectItem>
                                                <SelectItem value="6">6 People</SelectItem>
                                                <SelectItem value="8">8 People</SelectItem>
                                                <SelectItem value="10">10 People</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="location" className="text-right">
                                            Location
                                        </Label>
                                        <Select
                                            value={newTable.location}
                                            onValueChange={(value) => setNewTable({ ...newTable, location: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Window">Window</SelectItem>
                                                <SelectItem value="Center">Center</SelectItem>
                                                <SelectItem value="Corner">Corner</SelectItem>
                                                <SelectItem value="Bar">Bar</SelectItem>
                                                <SelectItem value="Terrace">Terrace</SelectItem>
                                                <SelectItem value="Private Room">Private Room</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddTableOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddTable}>Save Table</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Tables List */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <div className="relative w-full sm:w-auto">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search tables..."
                                            className="pl-8 w-full sm:w-[200px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger className="w-full sm:w-[140px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Tables</SelectItem>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="occupied">Occupied</SelectItem>
                                            <SelectItem value="reserved">Reserved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="whitespace-nowrap">Table ID</TableHead>
                                            <TableHead className="whitespace-nowrap">Number</TableHead>
                                            <TableHead className="whitespace-nowrap">Capacity</TableHead>
                                            <TableHead className="whitespace-nowrap">Location</TableHead>
                                            <TableHead className="whitespace-nowrap">Status</TableHead>
                                            <TableHead className="whitespace-nowrap">Current Order</TableHead>
                                            <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTables.map((table) => (
                                            <TableRow key={table.id}>
                                                <TableCell className="font-medium">{table.id}</TableCell>
                                                <TableCell>Table {table.number}</TableCell>
                                                <TableCell>{table.capacity} {table.capacity === 1 ? 'Person' : 'People'}</TableCell>
                                                <TableCell>{table.location}</TableCell>
                                                <TableCell>{getStatusBadge(table.status)}</TableCell>
                                                <TableCell>
                                                    {table.lastOrder ? (
                                                        <Link href={`/admin/orders/${table.lastOrder}`} className="text-blue-600 hover:underline">
                                                            {table.lastOrder}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Table
                                                            </DropdownMenuItem>
                                                            {table.status === "available" && (
                                                                <DropdownMenuItem>
                                                                    <Plus className="mr-2 h-4 w-4" />
                                                                    New Order
                                                                </DropdownMenuItem>
                                                            )}
                                                            {table.status === "occupied" && (
                                                                <DropdownMenuItem>
                                                                    <DollarSign className="mr-2 h-4 w-4" />
                                                                    Process Payment
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete Table
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Grid View (hidden by default) */}
                    <div className="hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredTables.map((table) => (
                                <Card key={table.id}>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-lg">Table {table.number}</CardTitle>
                                            {getStatusBadge(table.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Capacity:</span>
                                                <span>{table.capacity} {table.capacity === 1 ? 'Person' : 'People'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Location:</span>
                                                <span>{table.location}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Current Order:</span>
                                                <span>
                                                    {table.lastOrder ? (
                                                        <Link href={`/admin/orders/${table.lastOrder}`} className="text-blue-600 hover:underline">
                                                            {table.lastOrder}
                                                        </Link>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {table.status === "available" && (
                                                        <DropdownMenuItem>
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            New Order
                                                        </DropdownMenuItem>
                                                    )}
                                                    {table.status === "occupied" && (
                                                        <DropdownMenuItem>
                                                            <DollarSign className="mr-2 h-4 w-4" />
                                                            Process Payment
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete Table
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
