"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera } from "lucide-react"
import Link from "next/link"

export default function ScanPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let html5QrCode: any

    const startScanner = async () => {
      try {
        setScanning(true)
        const { Html5Qrcode } = await import("html5-qrcode")

        html5QrCode = new Html5Qrcode("qr-reader")

        const qrCodeSuccessCallback = (decodedText: string) => {
          // In a real app, validate the QR code format
          // For demo, we'll assume it contains a table ID
          const tableId = decodedText.includes("table=") ? decodedText.split("table=")[1] : "1" // Default to table 1 if format is incorrect

          // Stop scanning
          html5QrCode.stop()

          // Store table ID in localStorage
          localStorage.setItem("tableId", tableId)

          // Navigate to menu
          router.push(`/menu?table=${tableId}`)
        }

        const config = { fps: 10, qrbox: { width: 250, height: 250 } }

        html5QrCode
          .start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (errorMessage: string) => {
            // Handle QR code scanning errors silently
            console.log(errorMessage)
          })
          .catch((err: Error) => {
            setError("Could not access camera. Please check permissions.")
            setScanning(false)
          })
      } catch (err) {
        setError("Failed to load scanner. Please try again.")
        setScanning(false)
      }
    }

    if (typeof window !== "undefined") {
      startScanner()
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch((err: Error) => console.error(err))
      }
    }
  }, [router])

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold ml-2">Scan QR Code</h1>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            {error ? <div className="text-destructive text-center mb-4">{error}</div> : null}

            <div id="qr-reader" className="w-full aspect-square bg-muted rounded-md overflow-hidden"></div>

            <div className="text-center text-sm text-muted-foreground">
              {scanning ? (
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 animate-pulse" />
                  <span>Point your camera at the QR code</span>
                </div>
              ) : (
                <span>Camera loading...</span>
              )}
            </div>

            <Button variant="outline" className="mt-2" onClick={() => router.push("/menu?table=1")}>
              Skip scanning (Demo)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

