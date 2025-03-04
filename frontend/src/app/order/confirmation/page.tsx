"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Home, Receipt, ArrowRight } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "123456"
  const paymentMethod = searchParams.get("paymentMethod") || "counter"
  const paymentType = searchParams.get("paymentType") || "cash"
  const [tableId, setTableId] = useState<string>("1")

  useEffect(() => {
    // Get table ID from localStorage
    const storedTableId = localStorage.getItem("tableId") || "1"
    setTableId(storedTableId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <div>
            <p className="text-muted-foreground">Your order has been received</p>
            <p className="text-xl font-medium mt-1">Order #{orderId}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Table</div>
              <div className="font-medium">#{tableId}</div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Payment</div>
              <div className="font-medium">
                {paymentMethod === "counter" && "At Counter"}
                {paymentMethod === "now" && paymentType === "cash" && "Cash"}
                {paymentMethod === "now" && paymentType === "card" && "Card"}
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Receipt className="h-5 w-5" />
              <span className="font-medium">Order Status</span>
            </div>
            <div className="mt-2 text-sm">
              {paymentMethod === "counter" ? (
                <p>Your order has been sent to the kitchen. Please pay at the counter when you're ready.</p>
              ) : (
                <p>Your order has been paid and sent to the kitchen. It will be served to your table shortly.</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Link href="/menu" className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              Order More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

