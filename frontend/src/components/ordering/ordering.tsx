"use client"

import Link from "next/link"
import { MenuItems } from "@/components/ordering/menu/menu-items"
import { Bestsellers } from "@/components/ordering/menu/bestsellers"
import { useMenu } from "@/hooks/ordering/use-menu"
import { Button } from "@/components/ui/button"
export default function Ordering() {
    const { bestsellers, menuItem, loading, error } = useMenu()

    return (
        <div className="flex flex-col">
            <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                                Delicious Food <br />
                                <span className="text-primary">Delivered to You</span>
                            </h1>
                            <p className="text-lg text-muted-foreground md:text-xl">
                                Experience the best culinary delights from the comfort of your home. Fresh ingredients, amazing taste,
                                fast delivery.
                            </p>
                            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <Button size="lg" asChild>
                                    <Link href="/ordering#bestsellers">Order Now</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/ordering#menu">View Menu</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative hidden md:block">
                            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                                <img
                                    src="/placeholder.svg?height=400&width=500"
                                    alt="Delicious food"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 rounded-lg bg-background p-4 shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-primary/20 p-2">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Fast Delivery</p>
                                        <p className="text-xs text-muted-foreground">30 min or less</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-6 top-1/2 rounded-lg bg-background p-4 shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-primary/20 p-2">
                                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Quality Food</p>
                                        <p className="text-xs text-muted-foreground">Fresh ingredients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <Bestsellers bestsellers={bestsellers} loading={loading} error={error} />
                <MenuItems menuItems={menuItem} loading={loading} error={error} />
            </div>
        </div>
    )
}