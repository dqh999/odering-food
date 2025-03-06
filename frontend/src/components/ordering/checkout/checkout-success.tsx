import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CheckoutSuccess() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Order Placed Successfully!</h1>
      <p className="mb-4 max-w-md text-muted-foreground">
        Thank you for your order. We've received your payment and will start preparing your food right away.
      </p>
      <p className="mb-8 text-lg font-medium">
        Your order number: <span className="font-bold">ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
      </p>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button size="lg" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button size="lg" variant="outline">
          <Link href="/#menu">Order More</Link>
        </Button>
      </div>
    </div>
  )
}

