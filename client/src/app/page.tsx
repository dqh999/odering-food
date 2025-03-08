"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuSection } from "@/components/menu-section"
import { CategoryScroll } from "@/components/category-scroll"

// Sample categories data
const categories = [
  { id: 1, name: "Appetizers", description: "Start your meal with these delicious options" },
  { id: 2, name: "Main Courses", description: "Delicious entrées prepared by our expert chefs" },
  { id: 3, name: "Desserts", description: "Sweet treats to end your meal" },
  { id: 4, name: "Drinks", description: "Refreshing beverages to complement your meal" },
  { id: 5, name: "Sides", description: "Perfect accompaniments to your main course" },
  { id: 6, name: "Specials", description: "Our chef's special creations" },
  { id: 7, name: "Breakfast", description: "Start your day right" },
  { id: 8, name: "Lunch", description: "Midday favorites" },
  { id: 9, name: "Dinner", description: "Evening dining options" },
]

// Sample menu items with more data
const generateMenuItems = (categoryName: string, count: number, startId: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    name: `${categoryName} Item ${i + 1}`,
    description: `Delicious ${categoryName.toLowerCase()} with premium ingredients`,
    price: 5.99 + i * 2,
    image: `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(categoryName + (i + 1))}`,
  }))
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <Card className="mb-8">
          <CardHeader className="bg-muted/50">
            <CardTitle>Welcome to Delicious Restaurant</CardTitle>
            <CardDescription>Browse our menu and place your order online</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p>
              Our restaurant offers a wide variety of delicious dishes prepared with the freshest ingredients. Place
              your order online and enjoy a wonderful dining experience!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="#menu">View Menu</a>
            </Button>
          </CardFooter>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <CategoryScroll categories={categories} />
        </div>

        <div id="menu" className="space-y-10">
          <MenuSection
            title="Appetizers"
            description="Start your meal with these delicious options"
            items={generateMenuItems("Appetizer", 8, 1)}
          />

          <MenuSection
            title="Main Courses"
            description="Delicious entrées prepared by our expert chefs"
            items={generateMenuItems("Main", 8, 100)}
          />

          <MenuSection
            title="Desserts"
            description="Sweet treats to end your meal"
            items={generateMenuItems("Dessert", 8, 200)}
          />
        </div>
      </main>
    </div>
  )
}

