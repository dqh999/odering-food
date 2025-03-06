import { Footer } from "@/components/ordering/layout/footer"
import { Header } from "@/components/ordering/layout/header"
import type React from "react"
import Providers from "./providers"

export default function OrderingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <div className="user-layout flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </Providers>
    )
}