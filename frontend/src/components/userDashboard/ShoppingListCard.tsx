"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/useAuth'
import { shoppingListApi } from "@/services/shoppingList"
import type {  ShoppingList } from "@/services/shoppingList"

export default function ShoppingListCard() {
  const { user } = useAuth()
  const [lists, setLists] = useState<ShoppingList[]>([])
  const [expandedLists, setExpandedLists] = useState<string[]>([])
  const [activeList, setActiveList] = useState<string | null>(null)
  const [newItem, setNewItem] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialized = useRef(false)

  useEffect(() => {
    if (!user?.id || initialized.current) return
    initialized.current = true
    fetchShoppingLists()
  }, [])

  const fetchShoppingLists = async () => {
    try {
      const response = await shoppingListApi.getAllLists()
      setLists(response.data)
      if (response.data.length > 0) {
        setActiveList(response.data[0].id)
      }
    } catch (error) {
      console.error("Error fetching shopping lists:", error)
    }
  }

  const toggleList = (listId: string) => {
    setExpandedLists(prev => 
      prev.includes(listId) 
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    )
  }

  const addItem = async (listId: string) => {
    if (!newItem) return
    setIsLoading(true)

    try {
      const response = await shoppingListApi.addItem(listId, newItem, newQuantity || "1")
      setLists(lists.map(list => 
        list.id === listId 
          ? { ...list, items: [...(list.items || []), response.data] }
          : list
      ))
      setNewItem("")
      setNewQuantity("")
      setIsAdding(false)
    } catch (error) {
      console.error("Error adding item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleItem = async (listId: string, itemId: string) => {
    const list = lists.find(l => l.id === listId)
    const item = list?.items?.find(i => i.id === itemId)
    if (!list || !item) return

    try {
      await shoppingListApi.updateItem(listId, itemId, !item.checked)
      setLists(lists.map(list => 
        list.id === listId 
          ? {
              ...list,
              items: list.items?.map(item =>
                item.id === itemId 
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          : list
      ))
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  const deleteItem = async (listId: string, itemId: string) => {
    try {
      await shoppingListApi.deleteItem(listId, itemId)
      setLists(lists.map(list => 
        list.id === listId 
          ? { ...list, items: list.items?.filter(item => item.id !== itemId) }
          : list
      ))
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Shopping Lists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lists.map((list) => (
            <div key={list.id} className="border border-gray-800 rounded-lg">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleList(list.id)}
              >
                <div>
                  <h3 className="text-white font-medium">{list.name}</h3>
                  <p className="text-sm text-gray-400">
                    {list.items?.length || 0} items
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedLists.includes(list.id) ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              {expandedLists.includes(list.id) && (
                <div className="p-4 border-t border-gray-800">
                  {list.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between space-x-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(list.id, item.id)}
                          className="rounded border-gray-600"
                        />
                        <span className={`text-gray-400 ${item.checked ? 'line-through' : ''}`}>
                          {item.name} ({item.quantity})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteItem(list.id, item.id)
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </Button>
                    </div>
                  ))}

                  {isAdding && activeList === list.id ? (
                    <div className="space-y-2 mt-4">
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
                          onClick={() => addItem(list.id)} 
                          className="flex-1"
                          disabled={isLoading}
                        >
                          {isLoading ? "Adding..." : "Add"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsAdding(false)
                            setActiveList(null)
                          }} 
                          className="flex-1"
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full mt-4" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsAdding(true)
                        setActiveList(list.id)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

