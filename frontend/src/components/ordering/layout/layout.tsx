import type React from "react"
import { UserHeader } from "@/components/ordering/user-header"
import { UserFooter } from "@/components/ordering/user-footer"

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="user-layout flex min-h-screen flex-col">
            <UserHeader />
            <main className="flex-1">{children}</main>
            <UserFooter />
        </div>
    )
}
