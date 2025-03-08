"use client"

import { useState } from "react"
import { format } from "date-fns"
import { BarChart3, DollarSign, Users, Utensils, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function AdminDashboard() {
  const { isAdmin } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 156,
    totalRevenue: 4289.45,
    totalCustomers: 78,
    totalMenuItems: 42,
    recentOrders: [
      { id: 1001, customer: "John Doe", total: 42.99, status: "delivered", date: new Date().toISOString() },
      { id: 1002, customer: "Jane Smith", total: 35.5, status: "preparing", date: new Date().toISOString() },
      { id: 1003, customer: "Robert Johnson", total: 68.25, status: "pending", date: new Date().toISOString() },
      { id: 1004, customer: "Emily Davis", total: 29.99, status: "ready", date: new Date().toISOString() },
    ],
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your restaurant performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">12%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">8.2%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">5.3%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMenuItems}</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">2.1%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Order #{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{format(new Date(order.date), "MMM d, h:mm a")}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most ordered items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Beef Steak</div>
                    <div className="text-sm text-muted-foreground">Main Course</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">42 orders</div>
                  <div className="text-sm text-muted-foreground">$968.58</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Chicken Wings</div>
                    <div className="text-sm text-muted-foreground">Appetizer</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">38 orders</div>
                  <div className="text-sm text-muted-foreground">$341.62</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Utensils className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Chocolate Cake</div>
                    <div className="text-sm text-muted-foreground">Dessert</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">29 orders</div>
                  <div className="text-sm text-muted-foreground">$231.71</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

