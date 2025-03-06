"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCards } from "@/components/admin/orders/order-cards"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("new")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <Button>Create New Order</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>View and manage all customer orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 lg:w-auto">
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="preparing">Preparing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <OrderCards status="new" />
            </TabsContent>
            <TabsContent value="confirmed">
              <OrderCards status="confirmed" />
            </TabsContent>
            <TabsContent value="preparing">
              <OrderCards status="preparing" />
            </TabsContent>
            <TabsContent value="ready">
              <OrderCards status="ready" />
            </TabsContent>
            <TabsContent value="completed">
              <OrderCards status="completed" />
            </TabsContent>
            <TabsContent value="paid">
              <OrderCards status="paid" />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderCards status="cancelled" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

