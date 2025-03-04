"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Search,
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
    Trash2,
    MoreHorizontal,
    Coffee,
    Download,
    CreditCard,
    Receipt,
    Wallet,
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
import { addDays, format } from "date-fns"

// Mock data for payments
const payments = [
    {
        id: "PAY001",
        orderId: "ORD001",
        amount: 520000,
        method: "card",
        status: "completed",
        date: "2024-03-03T10:35:00",
        customer: "John Smith",
        table: "12",
    },
    {
        id: "PAY002",
        orderId: "ORD002",
        amount: 330000,
        method: "cash",
        status: "completed",
        date: "2024-03-03T10:30:00",
        customer: "Sarah Johnson",
        table: "08",
    },
    {
        id: "PAY003",
        orderId: "ORD003",
        amount: 225000,
        method: "momo",
        status: "completed",
        date: "2024-03-03T10:25:00",
        customer: "Michael Brown",
        table: "15",
    },
    {
        id: "PAY004",
        orderId: "ORD004",
        amount: 450000,
        method: "card",
        status: "pending",
        date: "2024-03-03T10:20:00",
        customer: "Emily Davis",
        table: "03",
    },
    {
        id: "PAY005",
        orderId: "ORD005",
        amount: 780000,
        method: "cash",
        status: "completed",
        date: "2024-03-03T10:15:00",
        customer: "David Wilson",
        table: "06",
    },
]

// Stats for payments
const paymentStats = {
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount, 0),
    todayRevenue: payments.reduce((sum, payment) => {
        const today = new Date().toISOString().split("T")[0]
        const paymentDate = new Date(payment.date).toISOString().split("T")[0]
        return paymentDate === today ? sum + payment.amount : sum
    }, 0),
    pendingPayments: payments.filter((payment) => payment.status === "pending").length,
    completedPayments: payments.filter((payment) => payment.status === "completed").length,
}

export default function PaymentManagement() {
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedMethod, setSelectedMethod] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [date, setDate] = useState({
        from: new Date(2024, 2, 1),
        to: addDays(new Date(2024, 2, 1), 30),
    })

    const getMethodBadge = (method: string) => {
        switch (method) {
            case "card":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Card
                    </Badge>
                )
            case "cash":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                        <Wallet className="w-3 h-3 mr-1" />
                        Cash
                    </Badge>
                )
            case "momo":
                return (
                    <Badge variant="outline" className="bg-pink-50 text-pink-700">
                        <Receipt className="w-3 h-3 mr-1" />
                        MoMo
                    </Badge>
                )
            default:
                return null
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                    </Badge>
                )
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Pending
                    </Badge>
                )
            case "failed":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                        Failed
                    </Badge>
                )
            default:
                return null
        }
    }

    const filteredPayments = payments.filter((payment) => {
        if (selectedStatus !== "all" && payment.status !== selectedStatus) return false
        if (selectedMethod !== "all" && payment.method !== selectedMethod) return false
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase()
            return (
                payment.id.toLowerCase().includes(searchLower) ||
                payment.orderId.toLowerCase().includes(searchLower) ||
                payment.customer.toLowerCase().includes(searchLower)
            )
        }
        return true
    })

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
            <Button variant="ghost" className="justify-start gap-2 w-full bg-muted" asChild>
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
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>

                        <h1 className="font-semibold">Payment Management</h1>

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
                                <div className="text-2xl font-bold">{paymentStats.totalRevenue.toLocaleString()}đ</div>
                                <p className="text-xs text-muted-foreground">All time revenue</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{paymentStats.todayRevenue.toLocaleString()}đ</div>
                                <p className="text-xs text-muted-foreground">+20% from yesterday</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{paymentStats.pendingPayments}</div>
                                <p className="text-xs text-muted-foreground">Awaiting completion</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{paymentStats.completedPayments}</div>
                                <p className="text-xs text-muted-foreground">Successfully processed</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payments List */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                    <div className="relative w-full sm:w-auto">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search payments..."
                                            className="pl-8 w-full sm:w-[200px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                                        <SelectTrigger className="w-full sm:w-[140px]">
                                            <SelectValue placeholder="Payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Methods</SelectItem>
                                            <SelectItem value="card">Card</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="momo">MoMo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger className="w-full sm:w-[140px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
                                </div>
                                <Button className="w-full sm:w-auto">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Report
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="whitespace-nowrap">Payment ID</TableHead>
                                            <TableHead className="whitespace-nowrap">Order ID</TableHead>
                                            <TableHead className="whitespace-nowrap">Customer</TableHead>
                                            <TableHead className="whitespace-nowrap">Table</TableHead>
                                            <TableHead className="whitespace-nowrap">Amount</TableHead>
                                            <TableHead className="whitespace-nowrap">Method</TableHead>
                                            <TableHead className="whitespace-nowrap">Status</TableHead>
                                            <TableHead className="whitespace-nowrap">Date</TableHead>
                                            <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPayments.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell className="font-medium">{payment.id}</TableCell>
                                                <TableCell>
                                                    <Link href={`/admin/orders/${payment.orderId}`} className="text-blue-600 hover:underline">
                                                        {payment.orderId}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{payment.customer}</TableCell>
                                                <TableCell>Table {payment.table}</TableCell>
                                                <TableCell>{payment.amount.toLocaleString()}đ</TableCell>
                                                <TableCell>{getMethodBadge(payment.method)}</TableCell>
                                                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                                <TableCell>{format(new Date(payment.date), "HH:mm - dd/MM/yyyy")}</TableCell>
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
                                                                <Receipt className="mr-2 h-4 w-4" />
                                                                View Receipt
                                                            </DropdownMenuItem>
                                                            {payment.status === "pending" && (
                                                                <>
                                                                    <DropdownMenuItem>
                                                                        <DollarSign className="mr-2 h-4 w-4" />
                                                                        Process Payment
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-red-600">
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Cancel Payment
                                                                    </DropdownMenuItem>
                                                                </>
                                                            )}
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
                </div>
            </div>
        </main>
    )
}

