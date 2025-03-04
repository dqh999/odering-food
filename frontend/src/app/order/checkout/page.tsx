"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Wallet, Building, CheckCircle2 } from "lucide-react"
import { useCheckout } from "@/hooks/use-checkout"

export default function CheckoutPage() {
  const {
    cart,
    tableId,
    subtotal,
    serviceFee,
    vat,
    total,
    paymentMethod,
    setPaymentMethod,
    paymentType,
    setPaymentType,
    notes,
    setNotes,
    isSubmitting,
    handleSubmitOrder,
  } = useCheckout()

  return (
    <div className="flex flex-col min-h-screen pb-6 items-center">
      <div className="sticky top-0 z-10 bg-background border-b w-full">
        <div className="max-w-4xl w-full mx-auto px-4 flex items-center py-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold ml-2">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-4 flex-1">
        <div className="grid gap-6 lg:grid-cols-2 w-full">
          {/* Order Summary Section - Full width on mobile, half width on desktop */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card>
              <CardHeader className="sm:flex sm:items-center sm:justify-between">
                <CardTitle>Order Summary</CardTitle>
                <div className="text-sm text-muted-foreground mt-1 sm:mt-0">Table #{tableId}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || `/placeholder.svg?height=48&width=48`}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service fee (5%)</span>
                    <span>{serviceFee.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (10%)</span>
                    <span>{vat.toLocaleString()}đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{total.toLocaleString()}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any special requests or notes for your order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Payment Options Section - Full width on mobile, half width on desktop */}
          <div className="order-1 lg:order-2">
            <Card className="sticky top-[85px]">
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">When to pay?</h3>
                  <RadioGroup
                    defaultValue="counter"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex items-center h-5 pt-0.5">
                        <RadioGroupItem value="counter" id="counter" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="counter" className="flex items-center gap-2 cursor-pointer font-medium">
                          <Building className="h-5 w-5 text-primary" />
                          Pay at Counter
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Place your order now and pay at the counter when you're ready
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex items-center h-5 pt-0.5">
                        <RadioGroupItem value="now" id="now" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="now" className="flex items-center gap-2 cursor-pointer font-medium">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          Pay Now
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Complete your payment now to speed up your order
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "now" && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                    <RadioGroup
                      defaultValue="cash"
                      value={paymentType}
                      onValueChange={setPaymentType}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex items-center h-5 pt-0.5">
                          <RadioGroupItem value="cash" id="cash" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer font-medium">
                            <Wallet className="h-5 w-5 text-primary" />
                            Cash
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pay with cash when your order is delivered to your table
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <div className="flex items-center h-5 pt-0.5">
                          <RadioGroupItem value="card" id="card" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer font-medium">
                            <CreditCard className="h-5 w-5 text-primary" />
                            Card Payment
                          </Label>
                          <p className="text-sm text-muted-foreground">Pay with credit/debit card</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {paymentMethod === "now" && paymentType === "card" && (
                  <div className="space-y-4 pt-2">
                    <Separator className="my-2" />
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="Name on card" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="number">Card Number</Label>
                        <Input id="number" placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" size="lg" onClick={handleSubmitOrder} disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : `Place Order • ${total.toLocaleString()}đ`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

