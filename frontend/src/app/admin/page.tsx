"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Search, CheckCircle2, UtensilsCrossed, Bell, DollarSign, Users, BarChart, Menu, X, User, LogOut, SettingsIcon, ChevronDown } from 'lucide-react'
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

const orders = [
  {
    id: "ORD001",
    table: "12",
    items: [
      { name: "Beef Steak", quantity: 2 },
      { name: "Caesar Salad", quantity: 1 },
    ],
    status: "pending",
    total: 520000,
    time: "2024-03-03T10:30:00",
    paymentMethod: "counter",
  },
  {
    id: "ORD002",
    table: "08",
    items: [
      { name: "Grilled Salmon", quantity: 1 },
      { name: "Iced Coffee", quantity: 2 },
    ],
    status: "preparing",
    total: 330000,
    time: "2024-03-03T10:25:00",
    paymentMethod: "card",
  },
  {
    id: "ORD003",
    table: "15",
    items: [
      { name: "Chicken Pasta", quantity: 1 },
      { name: "Fresh Orange Juice", quantity: 1 },
    ],
    status: "ready",
    total: 225000,
    time: "2024-03-03T10:20:00",
    paymentMethod: "counter",
  },
  // Add more mock orders as needed
]

const stats = {
  totalOrders: 45,
  pendingOrders: 8,
  completedOrders: 37,
  totalRevenue: 12500000,
}

export default function AdminDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50">
            Pending
          </Badge>
        )
      case "preparing":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Preparing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50">
            Ready
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50">
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus !== "all" && order.status !== selectedStatus) return false
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.table.toLowerCase().includes(searchLower) ||
        order.items.some((item) => item.name.toLowerCase().includes(searchLower))
      )
    }
    return true
  })

  const NavItems = () => (
    <>
      <Button variant="ghost" className="justify-start gap-2 w-full">
        <BarChart className="h-4 w-4" />
        Dashboard
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full">
        <UtensilsCrossed className="h-4 w-4" />
        Orders
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full">
        <Users className="h-4 w-4" />
        Tables
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full">
        <DollarSign className="h-4 w-4" />
        Payments
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

            <h1 className="font-semibold">Dashboard</h1>

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
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">+2 from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedOrders}</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}đ</div>
                <p className="text-xs text-muted-foreground">+8% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  View all
                </Button>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
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
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                      <TableHead className="whitespace-nowrap">Order ID</TableHead>
                      <TableHead className="whitespace-nowrap">Table</TableHead>
                      <TableHead className="whitespace-nowrap">Items</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap">Total</TableHead>
                      <TableHead className="whitespace-nowrap">Payment</TableHead>
                      <TableHead className="whitespace-nowrap">Time</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>Table {order.table}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.total.toLocaleString()}đ</TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.paymentMethod === "counter" ? "At Counter" : "Card"}</Badge>
                        </TableCell>
                        <TableCell>{new Date(order.time).toLocaleTimeString()}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
