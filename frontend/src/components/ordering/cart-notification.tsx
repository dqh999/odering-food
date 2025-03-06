"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/ordering/cart-provider"

interface CartNotificationProps {
    isOpen: boolean
    onClose: () => void
    itemName: string
}

export function CartNotification({ isOpen, onClose, itemName }: CartNotificationProps) {
    const { items, totalPrice } = useCart()
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

    // Auto close after 5 seconds
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background p-4 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">
                                <span className="font-bold">{itemName}</span> added to cart
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {totalItems} {totalItems === 1 ? "item" : "items"} · ${totalPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/#menu">Continue Shopping</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/cart">View Cart</Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

