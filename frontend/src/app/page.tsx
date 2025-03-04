import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { QrCode, UtensilsCrossed } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="relative h-24 w-24 mx-auto mb-4">
          <Image src="/placeholder.svg?height=96&width=96" alt="Restaurant Logo" fill className="object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Food Order</h1>
          <p className="text-muted-foreground">Scan QR code to order your favorite dishes</p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Link href="/order">
            <Button className="w-full h-16 text-lg gap-2 bg-primary hover:bg-primary/90">
              <QrCode className="h-6 w-6" />
              Scan QR Code
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Link href="/order/menu">
            <Button variant="outline" className="w-full h-16 text-lg gap-2 border-2">
              <UtensilsCrossed className="h-6 w-6" />
              Browse Menu
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mt-8">Scan the QR code at your table to start ordering</p>
      </div>
    </div>
  )
}

