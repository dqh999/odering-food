import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-yellow-500/10 p-4 rounded-full mb-6">
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Menu Not Found</h1>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
                We couldn't find the menu for this table. The table might not be active or there might be a problem with our system.
            </p>
            <div className="flex gap-4">
                <Link href="/menu/">
                    <Button>Try Another</Button>
                </Link>
                <Link href="/">
                    <Button variant="outline">Go Home</Button>
                </Link>
            </div>
        </div>
    )
}
