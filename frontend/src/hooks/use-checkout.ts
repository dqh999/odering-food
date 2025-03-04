import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/use-cart"
import { useToast } from "@/components/ui/use-toast"

export function useCheckout() {
    const router = useRouter()
    const { toast } = useToast()
    const { cart, clearCart } = useCart()
    const [tableId, setTableId] = useState<string>("1")
    const [subtotal, setSubtotal] = useState(0)
    const [serviceFee, setServiceFee] = useState(0)
    const [vat, setVat] = useState(0)
    const [total, setTotal] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState<string>("counter")
    const [paymentType, setPaymentType] = useState<string>("cash")
    const [notes, setNotes] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        // Get table ID from localStorage
        const storedTableId = localStorage.getItem("tableId") || "1"
        setTableId(storedTableId)

        // Calculate subtotal and total
        const subtotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const serviceAmount = Math.round(subtotalAmount * 0.05)
        const vatAmount = Math.round(subtotalAmount * 0.1)
        const totalAmount = subtotalAmount + serviceAmount + vatAmount

        setSubtotal(subtotalAmount)
        setServiceFee(serviceAmount)
        setVat(vatAmount)
        setTotal(totalAmount)

        // Redirect to menu if cart is empty
        if (cart.length === 0) {
            router.push("/order/menu")
        }
    }, [cart, router])

    const handleSubmitOrder = () => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            // In a real app, this would be an API call to submit the order
            const orderId = Math.floor(100000 + Math.random() * 900000) // Generate random order ID

            // Clear cart
            clearCart()

            // Show success toast
            toast({
                title: "Order placed successfully!",
                description: `Your order #${orderId} has been received.`,
            })

            // Redirect to confirmation page
            router.push(`/order/confirmation?orderId=${orderId}&paymentMethod=${paymentMethod}&paymentType=${paymentType}`)

            setIsSubmitting(false)
        }, 1500)
    }

    return {
        cart,
        tableId,
        subtotal,
        serviceFee,
        vat,
        total,
        paymentMethod,
        setPaymentMethod,
        paymentType,
        setPaymentType,
        notes,
        setNotes,
        isSubmitting,
        handleSubmitOrder
    }
}
