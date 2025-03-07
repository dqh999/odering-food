export interface Order {
    id: string
    code: string
    storeId: string
    tableId: string
    userId: string
    items: OrderItem[]
    status: string
    totalPrice: number
    createdAt: Date
    updatedAt: Date
}

export interface OrderItem {
    id: string
    menuItemId: string
    menuItemName: string
    quantity: number
    price: number
}