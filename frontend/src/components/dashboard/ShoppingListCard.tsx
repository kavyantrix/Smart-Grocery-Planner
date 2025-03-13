"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/useAuth';
import { shoppingListApi } from "@/services/shoppingList"
import type { ShoppingItem, ShoppingList } from "@/services/shoppingList"

export default function ShoppingListCard() {
  const { user } = useAuth()
  const [list, setList] = useState<ShoppingList | null>(null)
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Remove dependency on user?.id and use a ref to track initialization
  const initialized = useRef(false)

  useEffect(() => {
    if (!user?.id || initialized.current) return
    
    initialized.current = true
,    fetchShoppingList()
  }, []) // Remove all dependencies

  const fetchShoppingList = async () => {
    try {
      const response = await shoppingListApi.getActiveList()
      setList(response.data)
      setItems(response.data?.items || [])
    } catch (error) {
      console.error("Error fetching shopping list:", error)
    }
  }

  const addItem = async () => {
    if (!newItem || !list?.id) return
    setIsLoading(true)

    try {
      const response = await shoppingListApi.addItem(list.id, newItem, newQuantity || "1")
      setItems([...items, response.data])
      setNewItem("")
      setNewQuantity("")
      setIsAdding(false)
    } catch (error) {
      console.error("Error adding item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleItem = async (itemId: string) => {
    if (!list?.id) return
    const item = items.find(i => i.id === itemId)
    if (!item) return

    try {
      await shoppingListApi.updateItem(list.id, itemId, !item.checked)
      setItems(items.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ))
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  const deleteItem = async (itemId: string) => {
    if (!list?.id) return

    try {
      await shoppingListApi.deleteItem(list.id, itemId)
      setItems(items.filter(item => item.id !== itemId))
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Shopping List
          <Switch />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                  className="rounded border-gray-600"
                />
                <span className={`text-gray-400 ${item.checked ? 'line-through' : ''}`}>
                  {item.name} ({item.quantity})
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteItem(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                ×
              </Button>
            </div>
          ))}

          {isAdding ? (
            <div className="space-y-2">
              <Input
                placeholder="Item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <Input
                placeholder="Quantity (optional)"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={addItem} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAdding(false)} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button className="w-full" variant="outline" onClick={() => setIsAdding(true)}>
              Add Item
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

