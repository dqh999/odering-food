"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Clock,
    Search,
    CheckCircle2,
    UtensilsCrossed,
    Bell,
    DollarSign,
    Users,
    BarChart,
    Menu,
    User,
    LogOut,
    SettingsIcon,
    ChevronDown,
    ClipboardCheck,
    TruckIcon,
    AlertCircle,
    XCircle,
    Filter,
    RefreshCw,
    Clock4,
    Printer,
    ArrowUpDown,
    CalendarClock,
    Utensils,
    Coffee,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Extended order status types
type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "delivered" | "completed" | "paid" | "cancelled"

// Extended order interface
interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    category: "food" | "drink" | "dessert"
    notes?: string
}

interface Order {
    id: string
    table: string
    customer?: string
    items: OrderItem[]
    status: OrderStatus
    total: number
    time: string
    paymentMethod?: "counter" | "card" | "cash" | "pending"
    notes?: string
    priority?: "normal" | "high" | "rush"
    estimatedTime?: number // in minutes
    assignedTo?: string
}

// Sample staff data
const staff = [
    { id: "S001", name: "Nguyễn Văn Hùng", role: "Chef", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "S002", name: "Trần Thị Mai", role: "Waiter", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "S003", name: "Lê Minh Tuấn", role: "Bartender", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "S004", name: "Phạm Thị Hoa", role: "Waiter", avatar: "/placeholder.svg?height=40&width=40" },
]

// Generate more sample orders
const generateSampleOrders = (): Order[] => {
    const foodItems = [
        { name: "Beef Steak", price: 220000, category: "food" },
        { name: "Grilled Salmon", price: 250000, category: "food" },
        { name: "Chicken Pasta", price: 180000, category: "food" },
        { name: "Seafood Pizza", price: 220000, category: "food" },
        { name: "Beef Burger", price: 150000, category: "food" },
        { name: "Vegetarian Pasta", price: 160000, category: "food" },
        { name: "Sushi Set", price: 280000, category: "food" },
        { name: "Chicken Wings", price: 140000, category: "food" },
        { name: "Pho Bo", price: 120000, category: "food" },
        { name: "Bun Cha", price: 110000, category: "food" },
        { name: "Banh Mi", price: 50000, category: "food" },
        { name: "Spring Rolls", price: 80000, category: "food" },
    ]

    const drinkItems = [
        { name: "Iced Coffee", price: 40000, category: "drink" },
        { name: "Fresh Orange Juice", price: 45000, category: "drink" },
        { name: "Coca Cola", price: 30000, category: "drink" },
        { name: "Green Tea", price: 35000, category: "drink" },
        { name: "Sake", price: 120000, category: "drink" },
        { name: "Mojito", price: 85000, category: "drink" },
        { name: "Lemonade", price: 35000, category: "drink" },
        { name: "Espresso", price: 45000, category: "drink" },
    ]

    const dessertItems = [
        { name: "Tiramisu", price: 65000, category: "dessert" },
        { name: "Cheesecake", price: 70000, category: "dessert" },
        { name: "Ice Cream", price: 45000, category: "dessert" },
        { name: "Fruit Salad", price: 55000, category: "dessert" },
        { name: "Chocolate Mousse", price: 60000, category: "dessert" },
    ]

    const allItems = [...foodItems, ...drinkItems, ...dessertItems]

    const customers = [
        "Nguyễn Văn A",
        "Trần Thị B",
        "Lê Văn C",
        "Phạm Thị D",
        "Hoàng Văn E",
        "Vũ Thị F",
        "Đặng Văn G",
        "Ngô Thị H",
        "Bùi Văn I",
        "Đỗ Thị J",
        "Hồ Văn K",
        "Lý Thị L",
        "Mai Văn M",
        "Phan Thị N",
        "Trương Văn O",
    ]

    const tables = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
    ]

    const statuses: OrderStatus[] = [
        "new",
        "confirmed",
        "preparing",
        "ready",
        "delivered",
        "completed",
        "paid",
        "cancelled",
    ]
    const paymentMethods = ["counter", "card", "cash", "pending"]
    const priorities = ["normal", "high", "rush"]

    // Generate 30 sample orders
    const orders: Order[] = []

    for (let i = 1; i <= 30; i++) {
        const orderItems: OrderItem[] = []
        const numItems = Math.floor(Math.random() * 4) + 1 // 1-4 items per order

        let total = 0
        for (let j = 0; j < numItems; j++) {
            const item = allItems[Math.floor(Math.random() * allItems.length)]
            const quantity = Math.floor(Math.random() * 3) + 1 // 1-3 quantity
            const itemTotal = item.price * quantity
            total += itemTotal

            orderItems.push({
                id: `ITEM${i}${j}`,
                name: item.name,
                quantity,
                price: item.price,
                category: item.category as "food" | "drink" | "dessert",
                notes: Math.random() > 0.8 ? "Special request" : undefined,
            })
        }

        // Create a date within the last 24 hours
        const now = new Date()
        const hoursAgo = Math.floor(Math.random() * 24)
        const minutesAgo = Math.floor(Math.random() * 60)
        const orderTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000 - minutesAgo * 60 * 1000)

        // Bias the status distribution to have more active orders
        let statusIndex
        if (i <= 10) {
            // First 10 orders are more likely to be active
            statusIndex = Math.floor(Math.random() * 5) // new, confirmed, preparing, ready, delivered
        } else {
            statusIndex = Math.floor(Math.random() * statuses.length)
        }

        const status = statuses[statusIndex]

        // Payment method depends on status
        let paymentMethod: any = "pending"
        if (status === "paid" || status === "completed") {
            paymentMethod = paymentMethods[Math.floor(Math.random() * 3) + 1] // card, cash, counter
        }

        // Only assign priority to active orders
        let priority: any = undefined
        if (status === "new" || status === "confirmed" || status === "preparing") {
            priority = Math.random() > 0.7 ? priorities[Math.floor(Math.random() * priorities.length)] : "normal"
        }

        // Only assign staff to active orders
        let assignedTo = undefined
        if (status === "confirmed" || status === "preparing") {
            assignedTo = staff[Math.floor(Math.random() * staff.length)].id
        }

        // Estimated time for active orders
        let estimatedTime = undefined
        if (status === "confirmed" || status === "preparing") {
            estimatedTime = Math.floor(Math.random() * 20) + 10 // 10-30 minutes
        }

        orders.push({
            id: `ORD${i.toString().padStart(3, "0")}`,
            table: tables[Math.floor(Math.random() * tables.length)],
            customer: Math.random() > 0.3 ? customers[Math.floor(Math.random() * customers.length)] : undefined,
            items: orderItems,
            status,
            total,
            time: orderTime.toISOString(),
            paymentMethod,
            notes: Math.random() > 0.8 ? "Customer requested extra napkins and utensils." : undefined,
            priority,
            estimatedTime,
            assignedTo,
        })
    }

    // Sort by time, newest first
    return orders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
}

// Sample orders
const sampleOrders = generateSampleOrders()

// Stats for the dashboard
const calculateStats = (orders: Order[]) => {
    return {
        totalOrders: orders.length,
        newOrders: orders.filter((o) => o.status === "new").length,
        preparingOrders: orders.filter((o) => o.status === "preparing").length,
        completedOrders: orders.filter((o) => ["completed", "paid"].includes(o.status)).length,
        totalRevenue: orders
            .filter((o) => ["completed", "paid"].includes(o.status))
            .reduce((sum, order) => sum + order.total, 0),
        averageOrderValue: Math.round(
            orders.filter((o) => ["completed", "paid"].includes(o.status)).reduce((sum, order) => sum + order.total, 0) /
            (orders.filter((o) => ["completed", "paid"].includes(o.status)).length || 1),
        ),
        rushOrders: orders.filter((o) => o.priority === "rush").length,
    }
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>(sampleOrders)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("active")
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false)
    const [statusUpdateDialog, setStatusUpdateDialog] = useState(false)
    const [statusNote, setStatusNote] = useState("")
    const [viewMode, setViewMode] = useState<"table" | "kanban">("table")
    const [filterPriority, setFilterPriority] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("time")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [autoRefresh, setAutoRefresh] = useState(false)
    const [stats, setStats] = useState(calculateStats(orders))

    // Auto-refresh timer
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (autoRefresh) {
            interval = setInterval(() => {
                // In a real app, this would fetch new data from the server
                console.log("Auto-refreshing data...")
                // For demo, we'll just recalculate stats
                setStats(calculateStats(orders))
            }, 30000) // Refresh every 30 seconds
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [autoRefresh, orders])

    // Function to get the appropriate icon and color for each status
    const getStatusInfo = (status: OrderStatus) => {
        switch (status) {
            case "new":
                return {
                    icon: <AlertCircle className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            New
                        </Badge>
                    ),
                    color: "text-red-600",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                }
            case "confirmed":
                return {
                    icon: <ClipboardCheck className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Confirmed
                        </Badge>
                    ),
                    color: "text-purple-600",
                    bgColor: "bg-purple-50",
                    borderColor: "border-purple-200",
                }
            case "preparing":
                return {
                    icon: <UtensilsCrossed className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Preparing
                        </Badge>
                    ),
                    color: "text-blue-600",
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-200",
                }
            case "ready":
                return {
                    icon: <CheckCircle2 className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Ready
                        </Badge>
                    ),
                    color: "text-green-600",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                }
            case "delivered":
                return {
                    icon: <TruckIcon className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            Delivered
                        </Badge>
                    ),
                    color: "text-indigo-600",
                    bgColor: "bg-indigo-50",
                    borderColor: "border-indigo-200",
                }
            case "completed":
                return {
                    icon: <CheckCircle2 className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            Completed
                        </Badge>
                    ),
                    color: "text-emerald-600",
                    bgColor: "bg-emerald-50",
                    borderColor: "border-emerald-200",
                }
            case "paid":
                return {
                    icon: <DollarSign className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                            Paid
                        </Badge>
                    ),
                    color: "text-teal-600",
                    bgColor: "bg-teal-50",
                    borderColor: "border-teal-200",
                }
            case "cancelled":
                return {
                    icon: <XCircle className="h-4 w-4" />,
                    badge: (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Cancelled
                        </Badge>
                    ),
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                }
            default:
                return {
                    icon: <Clock className="h-4 w-4" />,
                    badge: <Badge variant="outline">Unknown</Badge>,
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                }
        }
    }

    // Function to get payment method badge
    const getPaymentBadge = (method?: string) => {
        switch (method) {
            case "card":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Card
                    </Badge>
                )
            case "cash":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Cash
                    </Badge>
                )
            case "counter":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        At Counter
                    </Badge>
                )
            case "pending":
            default:
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Pending
                    </Badge>
                )
        }
    }

    // Function to get priority badge
    const getPriorityBadge = (priority?: string) => {
        switch (priority) {
            case "rush":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        RUSH
                    </Badge>
                )
            case "high":
                return (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        High
                    </Badge>
                )
            case "normal":
            default:
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Normal
                    </Badge>
                )
        }
    }

    // Filter and sort orders
    const processOrders = () => {
        let result = [...orders]

        // First filter by tab/status
        if (activeTab === "active") {
            result = result.filter((order) => ["new", "confirmed", "preparing", "ready", "delivered"].includes(order.status))
        } else if (activeTab === "completed") {
            result = result.filter((order) => ["completed", "paid"].includes(order.status))
        } else if (activeTab === "cancelled") {
            result = result.filter((order) => order.status === "cancelled")
        } else if (activeTab !== "all") {
            result = result.filter((order) => order.status === activeTab)
        }

        // Then filter by priority if selected
        if (filterPriority !== "all") {
            result = result.filter((order) => order.priority === filterPriority)
        }

        // Then filter by search query if present
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase()
            result = result.filter(
                (order) =>
                    order.id.toLowerCase().includes(searchLower) ||
                    order.table.toLowerCase().includes(searchLower) ||
                    (order.customer && order.customer.toLowerCase().includes(searchLower)) ||
                    order.items.some((item) => item.name.toLowerCase().includes(searchLower)),
            )
        }

        // Finally sort
        result.sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case "time":
                    comparison = new Date(a.time).getTime() - new Date(b.time).getTime()
                    break
                case "table":
                    comparison = a.table.localeCompare(b.table)
                    break
                case "total":
                    comparison = a.total - b.total
                    break
                case "priority":
                    const priorityOrder = { rush: 3, high: 2, normal: 1, undefined: 0 }
                    comparison =
                        (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) -
                        (priorityOrder[b.priority as keyof typeof priorityOrder] || 0)
                    break
                default:
                    comparison = new Date(a.time).getTime() - new Date(b.time).getTime()
            }

            return sortOrder === "asc" ? comparison : -comparison
        })

        return result
    }

    const filteredOrders = processOrders()

    // Group orders by status for kanban view
    const ordersByStatus = {
        new: filteredOrders.filter((o) => o.status === "new"),
        confirmed: filteredOrders.filter((o) => o.status === "confirmed"),
        preparing: filteredOrders.filter((o) => o.status === "preparing"),
        ready: filteredOrders.filter((o) => o.status === "ready"),
        delivered: filteredOrders.filter((o) => o.status === "delivered"),
        completed: filteredOrders.filter((o) => o.status === "completed"),
        paid: filteredOrders.filter((o) => o.status === "paid"),
        cancelled: filteredOrders.filter((o) => o.status === "cancelled"),
    }

    // Count orders by status
    const orderCounts = {
        all: orders.length,
        active: orders.filter((o) => ["new", "confirmed", "preparing", "ready", "delivered"].includes(o.status)).length,
        new: orders.filter((o) => o.status === "new").length,
        confirmed: orders.filter((o) => o.status === "confirmed").length,
        preparing: orders.filter((o) => o.status === "preparing").length,
        ready: orders.filter((o) => o.status === "ready").length,
        delivered: orders.filter((o) => o.status === "delivered").length,
        completed: orders.filter((o) => ["completed", "paid"].includes(o.status)).length,
        paid: orders.filter((o) => o.status === "paid").length,
        cancelled: orders.filter((o) => o.status === "cancelled").length,
    }

    // Function to get the next status in the workflow
    const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
        const workflow: OrderStatus[] = ["new", "confirmed", "preparing", "ready", "delivered", "completed", "paid"]
        const currentIndex = workflow.indexOf(currentStatus)

        if (currentIndex === -1 || currentIndex === workflow.length - 1) {
            return null
        }

        return workflow[currentIndex + 1]
    }

    // Function to update order status
    const updateOrderStatus = (order: Order, newStatus: OrderStatus) => {
        // In a real application, this would call an API to update the order
        console.log(`Updating order ${order.id} from ${order.status} to ${newStatus}`)

        // For demo purposes, we'll update the local state
        const updatedOrders = orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))

        setOrders(updatedOrders)
        setStats(calculateStats(updatedOrders))
        setStatusUpdateDialog(false)
        setStatusNote("")

        toast({
            title: "Order Status Updated",
            description: `Order ${order.id} has been updated to ${newStatus}`,
        })
    }

    // Function to get assigned staff name
    const getAssignedStaffName = (staffId?: string) => {
        if (!staffId) return "Unassigned"
        const assignedStaff = staff.find((s) => s.id === staffId)
        return assignedStaff ? assignedStaff.name : "Unknown"
    }

    // Navigation items component
    const NavItems = () => (
        <>
            <Button variant="ghost" className="justify-start gap-2 w-full">
                <BarChart className="h-4 w-4" />
                Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full bg-muted">
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
            <Button variant="ghost" className="justify-start gap-2 w-full">
                <Utensils className="h-4 w-4" />
                Menu
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
                <CalendarClock className="h-4 w-4" />
                Reservations
            </Button>
        </>
    )

    // Order card component for kanban view
    const OrderCard = ({ order }: { order: Order }) => {
        const statusInfo = getStatusInfo(order.status)
        const timeAgo = getTimeAgo(new Date(order.time))

        return (
            <Card
                className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${order.priority === "rush"
                    ? "border-red-300 shadow-sm"
                    : order.priority === "high"
                        ? "border-orange-300 shadow-sm"
                        : ""
                    }`}
                onClick={() => {
                    setSelectedOrder(order)
                    setIsOrderDetailOpen(true)
                }}
            >
                <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{order.id}</div>
                        {order.priority && order.priority !== "normal" && <div>{getPriorityBadge(order.priority)}</div>}
                    </div>

                    <div className="flex justify-between items-center mb-2 text-sm">
                        <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>Table {order.table}</span>
                        </div>
                        <div className="text-muted-foreground">{timeAgo}</div>
                    </div>

                    <div className="mb-2 text-sm">
                        {order.items.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span className="text-muted-foreground">{(item.price * item.quantity).toLocaleString()}đ</span>
                            </div>
                        ))}
                        {order.items.length > 2 && (
                            <div className="text-muted-foreground text-xs mt-1">+{order.items.length - 2} more items</div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t text-sm">
                        <div className="font-medium">{order.total.toLocaleString()}đ</div>
                        <div className="flex gap-2">
                            {order.estimatedTime && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                                    <Clock4 className="h-3 w-3" />
                                    {order.estimatedTime}m
                                </Badge>
                            )}
                            {getNextStatus(order.status) && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedOrder(order)
                                        setStatusUpdateDialog(true)
                                    }}
                                >
                                    Update
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Helper function to format time ago
    const getTimeAgo = (date: Date) => {
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMins / 60)

        if (diffMins < 1) return "Just now"
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        return date.toLocaleDateString()
    }

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

                        <h1 className="font-semibold">Order Management</h1>

                        <div className="ml-auto flex items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                                <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                                <Label htmlFor="auto-refresh" className="text-sm hidden sm:inline-block">
                                    Auto-refresh
                                </Label>
                                <RefreshCw className="h-4 w-4 sm:hidden" />
                            </div>

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
                                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                                <UtensilsCrossed className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{orderCounts.active}</div>
                                <p className="text-xs text-muted-foreground">
                                    {orderCounts.new} new, {orderCounts.preparing} preparing
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rush Orders</CardTitle>
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.rushOrders}</div>
                                <p className="text-xs text-muted-foreground">Require immediate attention</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.completedOrders}</div>
                                <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5) + 1} from yesterday</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                                <DollarSign className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.averageOrderValue.toLocaleString()}đ</div>
                                <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 8) + 1}% from last week</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Orders Tabs and Controls */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <CardTitle>Order Management</CardTitle>

                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <div className="relative w-full sm:w-auto max-w-sm">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search orders..."
                                            className="pl-8 w-full"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-9">
                                                    <Filter className="h-4 w-4 mr-2" />
                                                    Filter
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setFilterPriority("all")}>All Priorities</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFilterPriority("rush")}>Rush Orders</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFilterPriority("high")}>High Priority</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFilterPriority("normal")}>Normal Priority</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-9">
                                                    <ArrowUpDown className="h-4 w-4 mr-2" />
                                                    Sort
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[200px]">
                                                <DropdownMenuLabel>Sort Orders</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSortBy("time")
                                                        setSortOrder("desc")
                                                    }}
                                                >
                                                    Newest First
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSortBy("time")
                                                        setSortOrder("asc")
                                                    }}
                                                >
                                                    Oldest First
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSortBy("table")
                                                        setSortOrder("asc")
                                                    }}
                                                >
                                                    Table (A-Z)
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSortBy("total")
                                                        setSortOrder("desc")
                                                    }}
                                                >
                                                    Highest Value
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSortBy("priority")
                                                        setSortOrder("desc")
                                                    }}
                                                >
                                                    Priority (High-Low)
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <div className="flex border rounded-md">
                                            <Button
                                                variant={viewMode === "table" ? "default" : "ghost"}
                                                size="sm"
                                                className="h-9 rounded-r-none"
                                                onClick={() => setViewMode("table")}
                                            >
                                                <BarChart className="h-4 w-4" />
                                                <span className="sr-only">Table View</span>
                                            </Button>
                                            <Separator orientation="vertical" />
                                            <Button
                                                variant={viewMode === "kanban" ? "default" : "ghost"}
                                                size="sm"
                                                className="h-9 rounded-l-none"
                                                onClick={() => setViewMode("kanban")}
                                            >
                                                <UtensilsCrossed className="h-4 w-4" />
                                                <span className="sr-only">Kanban View</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 pt-2">
                            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="px-4">
                                    <TabsList className="grid grid-cols-4 mb-4">
                                        <TabsTrigger value="active" className="text-xs sm:text-sm">
                                            Active
                                            <Badge variant="secondary" className="ml-1 px-1">
                                                {orderCounts.active}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="all" className="text-xs sm:text-sm">
                                            All Orders
                                            <Badge variant="secondary" className="ml-1 px-1">
                                                {orderCounts.all}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="completed" className="text-xs sm:text-sm">
                                            Completed
                                            <Badge variant="secondary" className="ml-1 px-1">
                                                {orderCounts.completed}
                                            </Badge>
                                        </TabsTrigger>
                                        <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                                            Cancelled
                                            <Badge variant="secondary" className="ml-1 px-1">
                                                {orderCounts.cancelled}
                                            </Badge>
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                {/* Table View */}
                                <TabsContent value={activeTab} className={viewMode === "table" ? "block" : "hidden"}>
                                    <div className="rounded-md border overflow-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="whitespace-nowrap">Order ID</TableHead>
                                                    <TableHead className="whitespace-nowrap">Table</TableHead>
                                                    <TableHead className="whitespace-nowrap">Customer</TableHead>
                                                    <TableHead className="whitespace-nowrap">Items</TableHead>
                                                    <TableHead className="whitespace-nowrap">Status</TableHead>
                                                    <TableHead className="whitespace-nowrap">Priority</TableHead>
                                                    <TableHead className="whitespace-nowrap">Total</TableHead>
                                                    <TableHead className="whitespace-nowrap">Time</TableHead>
                                                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredOrders.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                                                            No orders found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredOrders.map((order) => (
                                                        <TableRow
                                                            key={order.id}
                                                            className={
                                                                order.priority === "rush"
                                                                    ? "bg-red-50"
                                                                    : order.priority === "high"
                                                                        ? "bg-orange-50"
                                                                        : ""
                                                            }
                                                        >
                                                            <TableCell className="font-medium">{order.id}</TableCell>
                                                            <TableCell>Table {order.table}</TableCell>
                                                            <TableCell>{order.customer || "Guest"}</TableCell>
                                                            <TableCell>
                                                                <div className="flex flex-col gap-1">
                                                                    {order.items.slice(0, 2).map((item, index) => (
                                                                        <div key={index} className="text-sm flex items-center gap-1">
                                                                            <span className="font-medium">{item.quantity}x</span> {item.name}
                                                                            {item.category === "food" ? (
                                                                                <Utensils className="h-3 w-3 text-muted-foreground ml-1" />
                                                                            ) : item.category === "drink" ? (
                                                                                <Coffee className="h-3 w-3 text-muted-foreground ml-1" />
                                                                            ) : null}
                                                                        </div>
                                                                    ))}
                                                                    {order.items.length > 2 && (
                                                                        <div className="text-xs text-muted-foreground">
                                                                            +{order.items.length - 2} more items
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{getStatusInfo(order.status).badge}</TableCell>
                                                            <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                                                            <TableCell>{order.total.toLocaleString()}đ</TableCell>
                                                            <TableCell>
                                                                <div className="flex flex-col">
                                                                    <span>{getTimeAgo(new Date(order.time))}</span>
                                                                    {order.estimatedTime && (
                                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                            <Clock4 className="h-3 w-3" /> {order.estimatedTime} min
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            setSelectedOrder(order)
                                                                            setIsOrderDetailOpen(true)
                                                                        }}
                                                                    >
                                                                        View
                                                                    </Button>
                                                                    {getNextStatus(order.status) && (
                                                                        <Button
                                                                            variant="default"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                setSelectedOrder(order)
                                                                                setStatusUpdateDialog(true)
                                                                            }}
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TabsContent>

                                {/* Kanban View */}
                                <TabsContent value={activeTab} className={viewMode === "kanban" ? "block" : "hidden"}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                                        {/* New Orders */}
                                        {ordersByStatus.new.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <h3 className="font-medium">New Orders ({ordersByStatus.new.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.new.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Confirmed Orders */}
                                        {ordersByStatus.confirmed.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                                    <h3 className="font-medium">Confirmed ({ordersByStatus.confirmed.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.confirmed.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Preparing Orders */}
                                        {ordersByStatus.preparing.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                    <h3 className="font-medium">Preparing ({ordersByStatus.preparing.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.preparing.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Ready Orders */}
                                        {ordersByStatus.ready.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                    <h3 className="font-medium">Ready ({ordersByStatus.ready.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.ready.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Delivered Orders */}
                                        {ordersByStatus.delivered.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                                    <h3 className="font-medium">Delivered ({ordersByStatus.delivered.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.delivered.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Completed Orders */}
                                        {activeTab !== "active" && ordersByStatus.completed.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                    <h3 className="font-medium">Completed ({ordersByStatus.completed.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.completed.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Paid Orders */}
                                        {activeTab !== "active" && ordersByStatus.paid.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                                                    <h3 className="font-medium">Paid ({ordersByStatus.paid.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.paid.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* Cancelled Orders */}
                                        {activeTab !== "active" && ordersByStatus.cancelled.length > 0 && (
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                                    <h3 className="font-medium">Cancelled ({ordersByStatus.cancelled.length})</h3>
                                                </div>
                                                <ScrollArea className="h-[calc(100vh-280px)]">
                                                    {ordersByStatus.cancelled.map((order) => (
                                                        <OrderCard key={order.id} order={order} />
                                                    ))}
                                                </ScrollArea>
                                            </div>
                                        )}

                                        {/* No orders message */}
                                        {Object.values(ordersByStatus).every((arr) => arr.length === 0) && (
                                            <div className="col-span-full flex items-center justify-center h-[200px] text-muted-foreground">
                                                No orders found matching your criteria
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Order Detail Dialog */}
            <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <span>Order Details</span>
                            {selectedOrder?.priority === "rush" && <Badge variant="destructive">RUSH</Badge>}
                            {selectedOrder?.priority === "high" && (
                                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                    High Priority
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedOrder && `Order ${selectedOrder.id} - Table ${selectedOrder.table}`}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Customer</h4>
                                    <p>{selectedOrder.customer || "Guest"}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Status</h4>
                                    <div>{getStatusInfo(selectedOrder.status).badge}</div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Time</h4>
                                    <p>{new Date(selectedOrder.time).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Payment</h4>
                                    <div>{getPaymentBadge(selectedOrder.paymentMethod)}</div>
                                </div>
                            </div>

                            {selectedOrder.assignedTo && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Assigned To</h4>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Staff" />
                                            <AvatarFallback>ST</AvatarFallback>
                                        </Avatar>
                                        <span>{getAssignedStaffName(selectedOrder.assignedTo)}</span>
                                    </div>
                                </div>
                            )}

                            {selectedOrder.estimatedTime && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Estimated Time</h4>
                                    <div className="flex items-center gap-2">
                                        <Clock4 className="h-4 w-4 text-muted-foreground" />
                                        <span>{selectedOrder.estimatedTime} minutes</span>
                                        <Progress value={Math.min(100, Math.random() * 100)} className="h-2 flex-1" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <h4 className="text-sm font-medium mb-2">Items</h4>
                                <div className="border rounded-md">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Item</TableHead>
                                                <TableHead>Qty</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead className="text-right">Subtotal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedOrder.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            {item.name}
                                                            {item.category === "food" ? (
                                                                <Utensils className="h-3 w-3 text-muted-foreground ml-1" />
                                                            ) : item.category === "drink" ? (
                                                                <Coffee className="h-3 w-3 text-muted-foreground ml-1" />
                                                            ) : null}
                                                        </div>
                                                        {item.notes && <div className="text-xs text-muted-foreground mt-1">Note: {item.notes}</div>}
                                                    </TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{item.price.toLocaleString()}đ</TableCell>
                                                    <TableCell className="text-right">{(item.price * item.quantity).toLocaleString()}đ</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-right font-medium">
                                                    Total
                                                </TableCell>
                                                <TableCell className="text-right font-bold">{selectedOrder.total.toLocaleString()}đ</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {selectedOrder.notes && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                                    <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">{selectedOrder.notes}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsOrderDetailOpen(false)}>
                                Close
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Printer className="h-4 w-4 mr-2" />
                                        Print
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                                    <DropdownMenuItem>Print Kitchen Order</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {selectedOrder && getNextStatus(selectedOrder.status) && (
                            <Button
                                onClick={() => {
                                    setIsOrderDetailOpen(false)
                                    setStatusUpdateDialog(true)
                                }}
                            >
                                Update Status
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Status Update Dialog */}
            <Dialog open={statusUpdateDialog} onOpenChange={setStatusUpdateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                        <DialogDescription>
                            {selectedOrder && `Change status from ${selectedOrder.status} to ${getNextStatus(selectedOrder.status)}`}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Current Status</p>
                                    <div className="mt-1">{getStatusInfo(selectedOrder.status).badge}</div>
                                </div>
                                <div className="text-2xl">→</div>
                                <div>
                                    <p className="text-sm font-medium">New Status</p>
                                    <div className="mt-1">
                                        {getNextStatus(selectedOrder.status) && getStatusInfo(getNextStatus(selectedOrder.status)!).badge}
                                    </div>
                                </div>
                            </div>

                            {getNextStatus(selectedOrder.status) === "preparing" && (
                                <div className="space-y-2">
                                    <Label htmlFor="estimated-time">Estimated Preparation Time (minutes)</Label>
                                    <Input
                                        id="estimated-time"
                                        type="number"
                                        placeholder="Enter estimated time"
                                        min={5}
                                        max={60}
                                        defaultValue={15}
                                    />
                                </div>
                            )}

                            {getNextStatus(selectedOrder.status) === "preparing" && (
                                <div className="space-y-2">
                                    <Label htmlFor="assign-staff">Assign Staff</Label>
                                    <Select defaultValue={staff[0].id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select staff member" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {staff.map((s) => (
                                                <SelectItem key={s.id} value={s.id}>
                                                    {s.name} ({s.role})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="status-note">Add a note (optional)</Label>
                                <Textarea
                                    id="status-note"
                                    placeholder="Add any notes about this status change..."
                                    value={statusNote}
                                    onChange={(e) => setStatusNote(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setStatusUpdateDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                if (selectedOrder && getNextStatus(selectedOrder.status)) {
                                    updateOrderStatus(selectedOrder, getNextStatus(selectedOrder.status)!)
                                }
                            }}
                        >
                            Update Status
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Toast notifications */}
            <Toaster />
        </main>
    )
}

