"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, LogIn, Store, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { user, logout, isAdmin } = useAuth()
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if we're on the admin page
  const isAdminPage = pathname?.startsWith("/admin")

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
    // // .split(" ")
    // .map((part) => part[0])
    // .join("")
    // .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold">
            {isAdminPage ? "Admin Dashboard" : "Delicious Restaurant"}
          </Link>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {totalItems}
                      </span>
                    )}
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Store className="h-5 w-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                            alt={user.name}
                          />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAdminPage ? (
              <Link href="/">
                <Button variant="outline" size="sm" className="flex gap-2 items-center">
                  <Store className="h-4 w-4" />
                  <span>View Shop</span>
                </Button>
              </Link>
            ) : (
              <Link href="/cart">
                <Button variant="outline" size="sm" className="flex gap-2 items-center">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                {!isAdminPage && isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        alt={user.name}
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-muted-foreground text-sm">{user.email}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm" className="flex gap-2 items-center">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

