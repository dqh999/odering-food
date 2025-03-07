import Ordering from "@/components/ordering/ordering"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jollibee",
  description: "A comprehensive restaurant order management system",
}
export default function OrderingPage() {
  return <Ordering />
}

