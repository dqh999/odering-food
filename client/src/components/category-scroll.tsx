"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  id: number
  name: string
  description: string
}

interface CategoryScrollProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryScroll({ categories, activeCategory }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 200

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }

      // Check if we need to show/hide arrows after scrolling
      setTimeout(() => {
        if (current) {
          setShowLeftArrow(current.scrollLeft > 0)
          setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { current } = scrollRef
      setShowLeftArrow(current.scrollLeft > 0)
      setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
    }
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        className="flex overflow-x-auto scrollbar-hide py-2 px-1 -mx-1 scroll-smooth"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full border mx-1 whitespace-nowrap transition-colors",
              activeCategory === category.name ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted",
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

