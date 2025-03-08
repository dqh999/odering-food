"use client"
import Image from "next/image"
import { Plus, Minus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface MenuSectionProps {
  title: string
  description: string
  items: MenuItem[]
}

export function MenuSection({ title, description, items }: MenuSectionProps) {
  const { items: cartItems, addToCart, updateQuantity } = useCart()

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId)
    return item ? item.quantity : 0
  }

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
  }

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => {
          const quantity = getItemQuantity(item.id)
          const isInCart = quantity > 0

          return (
            <Card key={item.id} className="h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="relative h-40 w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {isInCart && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                </div>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {isInCart ? (
                  <div className="flex items-center justify-between w-full">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="mx-3 font-medium">{quantity}</span>

                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>

                    <Button onClick={() => handleAddToCart(item)} className="ml-4">
                      Add More
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleAddToCart(item)} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

