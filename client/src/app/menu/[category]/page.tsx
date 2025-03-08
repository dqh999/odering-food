"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuSection } from "@/components/menu-section"
import { useApi } from "@/lib/use-api"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  categoryId: number
}

interface Category {
  id: number
  name: string
  description: string
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.category as string

  // Fetch category details
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
    execute: fetchCategory,
  } = useApi<Category>({
    url: `http://localhost:8080/api/categories/${categoryId}`,
    immediate: true,
    customErrorMap: {
      ENTITY_NOT_FOUND: "This category doesn't exist.",
    },
  })

  // Fetch menu items for this category
  const {
    data: menuItems,
    isLoading: itemsLoading,
    error: itemsError,
    execute: fetchMenuItems,
  } = useApi<MenuItem[]>({
    url: `http://localhost:8080/api/categories/${categoryId}/items`,
    immediate: true,
    customErrorMap: {
      ENTITY_NOT_FOUND: "No menu items found for this category.",
    },
  })

  const isLoading = categoryLoading || itemsLoading

  if (
    (categoryError && categoryError.type === "ENTITY_NOT_FOUND") ||
    (itemsError && itemsError.type === "ENTITY_NOT_FOUND")
  ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Link>
        </div>

        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The category you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">Browse All Categories</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
          <p className="text-muted-foreground mb-8">{category?.description}</p>

          {menuItems && menuItems.length > 0 ? (
            <MenuSection title={category?.name || ""} description={category?.description || ""} items={menuItems} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No items available in this category</p>
              <Button asChild>
                <Link href="/">Browse Other Categories</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

