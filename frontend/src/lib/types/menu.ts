import { PageResponse } from "./api"

export interface Menu {
    storeId: string
    categories: Category[]
    bestSeller: MenuItem[]
    menuItems: PageResponse<MenuItem>
}

export interface Category {
    id: string
    brandId: string
    type: string
    name: string
    description: string
}
export interface MenuItem {
    id: string
    storeId: string
    categoryId: string
    name: string
    description: string
    price: number
    imageURL: string
    isPopular: boolean
    isBestseller: boolean
    available: boolean
}
