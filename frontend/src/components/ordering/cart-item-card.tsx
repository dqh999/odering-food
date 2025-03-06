"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartItemCardProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1)
    } else {
      onRemove()
    }
  }

  return (
    <Card className="overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-24 w-full sm:h-auto sm:w-24 md:w-32">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={onRemove}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecrement}>
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncrement}>
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

