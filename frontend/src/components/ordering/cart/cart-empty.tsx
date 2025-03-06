import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CartEmpty() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-6">
        <ShoppingCart className="h-12 w-12 text-primary" />
      </div>
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Your cart is empty</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Looks like you haven't added any items to your cart yet. Browse our menu and discover delicious meals!
      </p>
      <Button size="lg" asChild>
        <Link href="/">Browse Menu</Link>
      </Button>
    </div>
  )
}

