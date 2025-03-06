"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RestaurantSettings } from "@/components/admin/settings/restaurant-settings"
import { BranchSettings } from "@/components/admin/settings/branch-settings"
import { UserSettings } from "@/components/admin/settings/user-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <Button>Save Changes</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Settings</CardTitle>
          <CardDescription>Manage your restaurant settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="restaurant" className="space-y-4">
            <TabsList>
              <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
              <TabsTrigger value="branches">Branches</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="restaurant">
              <RestaurantSettings />
            </TabsContent>
            <TabsContent value="branches">
              <BranchSettings />
            </TabsContent>
            <TabsContent value="users">
              <UserSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

