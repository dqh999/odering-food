"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Search, Bell, MenuIcon, ChevronDown, User, LogOut, SettingsIcon, Plus, Edit, Trash2, MoreHorizontal, Coffee, ImageIcon, Check, LayoutGrid, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react'
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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar } from "@/components/sidebar"

// Form schema
const menuItemSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    category: z.string({
        required_error: "Please select a category.",
    }),
    price: z.string().min(1, {
        message: "Please enter a price.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    ingredients: z.string().min(3, {
        message: "Please list the ingredients.",
    }),
    available: z.boolean().default(true),
    popular: z.boolean().default(false),
})

// Mock data for menu items
const menuItems = [
    {
        id: "M001",
        name: "Beef Steak",
        category: "main",
        price: "250000",
        description: "Premium beef steak with vegetables and special sauce",
        ingredients: "Beef, Vegetables, Sauce",
        available: true,
        image: "/placeholder.svg?height=100&width=100",
        popular: true,
    },
    {
        id: "M002",
        name: "Caesar Salad",
        category: "appetizer",
        price: "120000",
        description: "Fresh salad with croutons, parmesan cheese and caesar dressing",
        ingredients: "Lettuce, Croutons, Parmesan, Dressing",
        available: true,
        image: "/placeholder.svg?height=100&width=100",
        popular: false,
    },
    {
        id: "M003",
        name: "Grilled Salmon",
        category: "main",
        price: "280000",
        description: "Fresh salmon fillet grilled to perfection with lemon butter sauce",
        ingredients: "Salmon, Lemon, Butter, Herbs",
        available: true,
        image: "/placeholder.svg?height=100&width=100",
        popular: true,
    },
]

// Categories
const categories = [
    { value: "main", label: "Main Course" },
    { value: "appetizer", label: "Appetizer" },
    { value: "dessert", label: "Dessert" },
    { value: "beverage", label: "Beverage" },
]

export default function MenuManagement() {
    const [view, setView] = useState<"grid" | "list">("list")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const itemsPerPage = 10

    // Setup form
    const form = useForm<z.infer<typeof menuItemSchema>>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: "",
            category: "main",
            price: "",
            description: "",
            ingredients: "",
            available: true,
            popular: false,
        },
    })

    function onSubmit(values: z.infer<typeof menuItemSchema>) {
        console.log(values)
        // Here you would typically save to your backend
    }

    const getCategoryBadge = (category: string) => {
        switch (category) {
            case "main":
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Main Course
                    </Badge>
                )
            case "appetizer":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                        Appetizer
                    </Badge>
                )
            case "dessert":
                return (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        Dessert
                    </Badge>
                )
            case "beverage":
                return (
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        Beverage
                    </Badge>
                )
            default:
                return null
        }
    }

    const filteredItems = menuItems.filter((item) => {
        if (selectedCategory !== "all" && item.category !== selectedCategory) return false
        if (searchQuery) {
            const search = searchQuery.toLowerCase()
            return (
                item.name.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                item.ingredients.toLowerCase().includes(search)
            )
        }
        return true
    })

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
    const paginatedItems = filteredItems.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    )

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1">
                <div className="flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="container flex h-14 items-center">
                            <div className="mr-4 hidden md:flex">
                                <Link href="/admin" className="mr-6 flex items-center space-x-2">
                                    <Coffee className="h-6 w-6" />
                                    <span className="hidden font-bold sm:inline-block">
                                        Restaurant Admin
                                    </span>
                                </Link>
                                <nav className="flex items-center space-x-6 text-sm font-medium">
                                    <Link
                                        href="/admin/menu"
                                        className="transition-colors hover:text-foreground/80 text-foreground"
                                    >
                                        Menu
                                    </Link>
                                    <Link
                                        href="/admin/orders"
                                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/admin/tables"
                                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    >
                                        Tables
                                    </Link>
                                </nav>
                            </div>
                            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                                <div className="w-full flex-1 md:w-auto md:flex-none">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search menu items..."
                                            className="pl-8 md:w-[200px] lg:w-[300px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button variant="outline" size="icon" className="relative">
                                    <Bell className="h-4 w-4" />
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-medium text-white">
                                        3
                                    </span>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-8 w-8 rounded-full"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src="/placeholder.svg?height=32&width=32"
                                                    alt="Avatar"
                                                />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    John Doe
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    john@example.com
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
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
                                        <DropdownMenuItem className="text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    <div className="container py-6">
                        <div className="flex flex-col gap-4">
                            {/* Title and Actions */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
                                <div className="flex items-center gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Item
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Menu Item</DialogTitle>
                                                <DialogDescription>
                                                    Add a new item to your menu. Fill in all the required information.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Item name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="category"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Category</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select a category" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {categories.map((category) => (
                                                                            <SelectItem
                                                                                key={category.value}
                                                                                value={category.value}
                                                                            >
                                                                                {category.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="price"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Price (VND)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="Enter price"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Description</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Item description"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="ingredients"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Ingredients</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Comma separated ingredients"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="available"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel>Available</FormLabel>
                                                                    <FormDescription>
                                                                        Make this item available for ordering
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="popular"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                                <div className="space-y-0.5">
                                                                    <FormLabel>Popular</FormLabel>
                                                                    <FormDescription>
                                                                        Mark this as a popular item
                                                                    </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button type="submit">Save Item</Button>
                                                    </DialogFooter>
                                                </form>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>
                                    <div className="flex items-center gap-1 rounded-md border p-1">
                                        <Button
                                            variant={view === "list" ? "secondary" : "ghost"}
                                            size="icon"
                                            onClick={() => setView("list")}
                                        >
                                            <LayoutList className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant={view === "grid" ? "secondary" : "ghost"}
                                            size="icon"
                                            onClick={() => setView("grid")}
                                        >
                                            <LayoutGrid className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Menu Items */}
                            {view === "list" ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Menu Items</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Item</TableHead>
                                                        <TableHead>Category</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                            Description
                                                        </TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead className="text-right">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {paginatedItems.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar className="h-9 w-9">
                                                                        <AvatarImage
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                        />
                                                                        <AvatarFallback>
                                                                            {item.name.substring(0, 2)}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="font-medium">{item.name}</div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {getCategoryBadge(item.category)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {parseInt(item.price).toLocaleString()}đ
                                                            </TableCell>
                                                            <TableCell className="hidden max-w-[300px] truncate md:table-cell">
                                                                {item.description}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={item.available ? "default" : "secondary"}
                                                                >
                                                                    {item.available ? "Available" : "Out of Stock"}
                                                                </Badge>
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
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <ImageIcon className="mr-2 h-4 w-4" />
                                                                            Change Image
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem className="text-red-600">
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
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
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {paginatedItems.map((item) => (
                                        <Card key={item.id} className="overflow-hidden">
                                            <div className="aspect-video w-full">
                                                <img
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <CardTitle>{item.name}</CardTitle>
                                                        <div className="flex items-center gap-2">
                                                            {getCategoryBadge(item.category)}
                                                            {item.popular && (
                                                                <Badge variant="secondary">Popular</Badge>
                                                            )}
                                                        </div>
                                                    </div>
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
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <ImageIcon className="mr-2 h-4 w-4" />
                                                                Change Image
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                <div className="text-2xl font-bold">
                                                    {parseInt(item.price).toLocaleString()}đ
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={item.available ? "default" : "secondary"}
                                                    >
                                                        {item.available ? "Available" : "Out of Stock"}
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center space-x-2 py-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <div className="text-sm">
                                        Page {page} of {totalPages}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
