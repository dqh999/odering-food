"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-provider"

export function Header() {
    const { tableId } = useCart();
    const pathname = usePathname()
    const { items } = useCart()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const routes = [
        {
            label: "Home",
            href: "/",
            active: pathname === "/",
        },
        {
            label: "Menu",
            href: "/#menu",
            active: false,
        },
        {
            label: "About",
            href: "/#about",
            active: false,
        },
        {
            label: "Contact",
            href: "/#contact",
            active: false,
        },
    ]

    return (
        <header
            className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? "bg-background shadow-md" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <ShoppingCart className="h-6 w-6" />
                        <span>FoodDelight</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${route.active ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link href={`/ordering/${tableId}/cart`}>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                    {totalItems}
                                </span>
                            )}
                            <span className="sr-only">Cart</span>
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Button>

                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between py-4">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 font-bold text-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        <span>FoodDelight</span>
                                    </Link>
                                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </div>

                                <nav className="flex flex-col space-y-4 py-6">
                                    {routes.map((route) => (
                                        <Link
                                            key={route.href}
                                            href={route.href}
                                            className={`text-sm font-medium transition-colors hover:text-primary ${route.active ? "text-primary" : "text-muted-foreground"
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto flex flex-col space-y-4 py-6">
                                    <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                                        <Link href="/cart">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Cart ({totalItems})
                                        </Link>
                                    </Button>
                                    <Button variant="outline">
                                        <User className="mr-2 h-4 w-4" />
                                        Account
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

