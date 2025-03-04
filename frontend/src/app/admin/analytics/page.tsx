"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Bell,
    DollarSign,
    Users,
    BarChart,
    Menu,
    ChevronDown,
    User,
    LogOut,
    SettingsIcon,
    UtensilsCrossed,
    Coffee,
    Download,
    TrendingUp,
    TrendingDown,
    Activity,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"
import { Bar, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for analytics
const salesData = [
    { date: "Mon", sales: 2400000 },
    { date: "Tue", sales: 1800000 },
    { date: "Wed", sales: 3200000 },
    { date: "Thu", sales: 2800000 },
    { date: "Fri", sales: 4100000 },
    { date: "Sat", sales: 4800000 },
    { date: "Sun", sales: 3600000 },
]

const popularItems = [
    { name: "Beef Steak", orders: 145, revenue: 36250000 },
    { name: "Grilled Salmon", orders: 120, revenue: 33600000 },
    { name: "Iced Coffee", orders: 180, revenue: 9000000 },
    { name: "Caesar Salad", orders: 95, revenue: 11400000 },
    { name: "Chocolate Cake", orders: 85, revenue: 7225000 },
]

const tableUtilization = [
    { hour: "10:00", occupied: 4 },
    { hour: "11:00", occupied: 6 },
    { hour: "12:00", occupied: 8 },
    { hour: "13:00", occupied: 7 },
    { hour: "14:00", occupied: 5 },
    { hour: "15:00", occupied: 3 },
    { hour: "16:00", occupied: 4 },
    { hour: "17:00", occupied: 6 },
    { hour: "18:00", occupied: 8 },
    { hour: "19:00", occupied: 8 },
    { hour: "20:00", occupied: 7 },
    { hour: "21:00", occupied: 5 },
]

// Stats for analytics
const analyticsStats = {
    totalRevenue: 97475000,
    averageOrderValue: 285000,
    ordersToday: 42,
    customersServed: 156,
}

export default function Analytics() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [date, setDate] = useState({
        from: new Date(2024, 2, 1),
        to: addDays(new Date(2024, 2, 1), 30),
    })
    const [timeRange, setTimeRange] = useState("week")

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
            <Button variant="ghost" className="justify-start gap-2 w-full" asChild>
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
            <Button variant="ghost" className="justify-start gap-2 w-full bg-muted" asChild>
                <Link href="/admin/analytics">
                    <Activity className="h-4 w-4" />
                    Analytics
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
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>

                        <h1 className="font-semibold">Analytics</h1>

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
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsStats.totalRevenue.toLocaleString()}đ</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
                                    +15% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsStats.averageOrderValue.toLocaleString()}đ</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
                                    +5% from last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
                                <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsStats.ordersToday}</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingDown className="h-4 w-4 text-red-500 inline mr-1" />
                                    -8% from yesterday
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Customers Served</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{analyticsStats.customersServed}</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="h-4 w-4 text-green-500 inline mr-1" />
                                    +12% from last week
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select time range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Today</SelectItem>
                                    <SelectItem value="week">This Week</SelectItem>
                                    <SelectItem value="month">This Month</SelectItem>
                                    <SelectItem value="year">This Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                        </Button>
                    </div>

                    {/* Charts */}
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        {/* Sales Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Trend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            {/* <Tooltip
                                                formatter={(value) => `${Number.parseInt(value).toLocaleString()}đ`}
                                                labelStyle={{ color: "black" }}
                                            /> */}
                                            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Table Utilization */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Table Utilization</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    {/* <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={tableUtilization}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="hour" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="occupied" fill="#2563eb" />
                                        </BarChart>
                                    </ResponsiveContainer> */}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Popular Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Menu Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="h-12 px-4 text-left align-middle font-medium">Item Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Orders</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Revenue</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium">Trend</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {popularItems.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="p-4 align-middle">{item.name}</td>
                                                <td className="p-4 align-middle">{item.orders}</td>
                                                <td className="p-4 align-middle">{item.revenue.toLocaleString()}đ</td>
                                                <td className="p-4 align-middle">
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}

