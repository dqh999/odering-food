"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Users, Square, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Table {
  id: number
  name: string
  capacity: number
  status: "available" | "occupied" | "reserved" | "maintenance"
  shape: "square" | "round" | "rectangle"
  location: "indoor" | "outdoor" | "private"
}

export default function TablesPage() {
  const { toast } = useToast()
  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: "Table 1", capacity: 2, status: "available", shape: "square", location: "indoor" },
    { id: 2, name: "Table 2", capacity: 4, status: "occupied", shape: "round", location: "indoor" },
    { id: 3, name: "Table 3", capacity: 6, status: "reserved", shape: "rectangle", location: "indoor" },
    { id: 4, name: "Table 4", capacity: 2, status: "available", shape: "square", location: "outdoor" },
    { id: 5, name: "Table 5", capacity: 8, status: "maintenance", shape: "rectangle", location: "private" },
    { id: 6, name: "Table 6", capacity: 4, status: "available", shape: "round", location: "outdoor" },
  ])

  const [newTable, setNewTable] = useState<Omit<Table, "id">>({
    name: "",
    capacity: 2,
    status: "available",
    shape: "square",
    location: "indoor",
  })

  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [tableToDelete, setTableToDelete] = useState<number | null>(null)

  const handleAddTable = () => {
    const id = Math.max(0, ...tables.map((t) => t.id)) + 1
    setTables([...tables, { id, ...newTable }])
    setNewTable({
      name: "",
      capacity: 2,
      status: "available",
      shape: "square",
      location: "indoor",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Table added",
      description: `${newTable.name} has been added successfully.`,
    })
  }

  const handleEditTable = () => {
    if (!editingTable) return

    setTables(tables.map((table) => (table.id === editingTable.id ? editingTable : table)))
    setIsEditDialogOpen(false)
    toast({
      title: "Table updated",
      description: `${editingTable.name} has been updated successfully.`,
    })
  }

  const handleDeleteTable = (id: number) => {
    setTables(tables.filter((table) => table.id !== id))
    setTableToDelete(null)
    toast({
      title: "Table deleted",
      description: `Table has been deleted successfully.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Available
          </Badge>
        )
      case "occupied":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Occupied
          </Badge>
        )
      case "reserved":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Reserved
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Maintenance
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case "square":
        return <Square className="h-4 w-4" />
      case "round":
        return <Circle className="h-4 w-4" />
      case "rectangle":
        return <div className="w-5 h-3 border-2 rounded-sm"></div>
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tables Management</h1>
          <p className="text-muted-foreground">Manage restaurant tables and seating arrangements</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Table</DialogTitle>
              <DialogDescription>Create a new table for your restaurant.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Table Name</Label>
                <Input
                  id="name"
                  value={newTable.name}
                  onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                  placeholder="e.g. Table 7"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({ ...newTable, capacity: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTable.status}
                    onValueChange={(value: any) => setNewTable({ ...newTable, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select
                    value={newTable.shape}
                    onValueChange={(value: any) => setNewTable({ ...newTable, shape: value })}
                  >
                    <SelectTrigger id="shape">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="round">Round</SelectItem>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={newTable.location}
                    onValueChange={(value: any) => setNewTable({ ...newTable, location: value })}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="private">Private Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTable}>Add Table</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{table.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Users className="h-3 w-3" /> {table.capacity} seats
                  </CardDescription>
                </div>
                {getStatusBadge(table.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {getShapeIcon(table.shape)}
                  <span className="capitalize">{table.shape}</span>
                </div>
                <div className="text-muted-foreground">|</div>
                <div className="capitalize">{table.location}</div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Dialog
                open={isEditDialogOpen && editingTable?.id === table.id}
                onOpenChange={(open) => {
                  setIsEditDialogOpen(open)
                  if (open) setEditingTable(table)
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Table</DialogTitle>
                    <DialogDescription>Update table information.</DialogDescription>
                  </DialogHeader>
                  {editingTable && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Table Name</Label>
                        <Input
                          id="edit-name"
                          value={editingTable.name}
                          onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-capacity">Capacity</Label>
                          <Input
                            id="edit-capacity"
                            type="number"
                            min="1"
                            value={editingTable.capacity}
                            onChange={(e) =>
                              setEditingTable({ ...editingTable, capacity: Number.parseInt(e.target.value) })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-status">Status</Label>
                          <Select
                            value={editingTable.status}
                            onValueChange={(value: any) => setEditingTable({ ...editingTable, status: value })}
                          >
                            <SelectTrigger id="edit-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="occupied">Occupied</SelectItem>
                              <SelectItem value="reserved">Reserved</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-shape">Shape</Label>
                          <Select
                            value={editingTable.shape}
                            onValueChange={(value: any) => setEditingTable({ ...editingTable, shape: value })}
                          >
                            <SelectTrigger id="edit-shape">
                              <SelectValue placeholder="Select shape" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="square">Square</SelectItem>
                              <SelectItem value="round">Round</SelectItem>
                              <SelectItem value="rectangle">Rectangle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-location">Location</Label>
                          <Select
                            value={editingTable.location}
                            onValueChange={(value: any) => setEditingTable({ ...editingTable, location: value })}
                          >
                            <SelectTrigger id="edit-location">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="indoor">Indoor</SelectItem>
                              <SelectItem value="outdoor">Outdoor</SelectItem>
                              <SelectItem value="private">Private Room</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditTable}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex items-center gap-1">
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {table.name}. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteTable(table.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

