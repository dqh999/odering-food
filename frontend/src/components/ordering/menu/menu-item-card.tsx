"use client"

import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MenuItem } from "@/lib/types/menu"
import { useCart } from "@/context/cart-provider"

interface MenuItemCardProps {
    item: MenuItem
    onAddToCart: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
    const { items, updateQuantity, removeItem } = useCart()

    const cartItem = items.find((cartItem) => cartItem.id === item.id)

    const handleIncrease = () => {
        if (cartItem) {
            updateQuantity(item.id, cartItem.quantity + 1)
        }
    }

    const handleDecrease = () => {
        if (cartItem) {
            if (cartItem.quantity > 1) {
                updateQuantity(item.id, cartItem.quantity - 1)
            } else {
                removeItem(item.id)
            }
        }
    }

    return (
        <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={item.imageURL || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                {item.isPopular && <Badge className="absolute right-2 top-2 bg-primary">Popular</Badge>}
            </div>
            <CardContent className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground h-10">{item.description}</p>
            </CardContent>
            <CardFooter className="flex flex-row justify-between p-4 pt-0">
                <div className="w-full">
                    <p className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>
                {cartItem ? (
                    <div className="flex w-full items-center justify-between">
                        <Button variant="outline" size="icon" onClick={handleDecrease} className="h-9 w-9">
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{cartItem.quantity}</span>
                        <Button variant="outline" size="icon" onClick={handleIncrease} className="h-9 w-9">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button className="w-full" onClick={() => onAddToCart(item)}>
                        Add to Cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
