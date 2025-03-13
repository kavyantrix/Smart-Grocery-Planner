"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { aiService } from "@/services/aiService"
import { shoppingListApi } from "@/services/shoppingList"

// Add interface for AI generated list items
interface AIListItem {
  name: string;
  quantity: string;
  reason: string;
}

// Add interface for AI generated list
interface AIGeneratedList {
  id: string;
  name: string;
  items: AIListItem[];
  suggestions: string[];
  createdAt: string;
}

export default function AIGroceryLists() {
  const [lists, setLists] = useState<AIGeneratedList[]>([])
  const [expandedLists, setExpandedLists] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLists()
  }, [])

  const fetchLists = async () => {
    try {
      const response = await aiService.getGeneratedLists()
      setLists(response.data as AIGeneratedList[])
    } catch (error) {
      toast.error("Failed to fetch AI-generated lists")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleList = (listId: string) => {
    setExpandedLists(prev => 
      prev.includes(listId) 
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    )
  }

  const createShoppingList = async (items: any[]) => {
    try {
      const list = await shoppingListApi.createList("AI Generated List")
      
      for (const item of items) {
        await shoppingListApi.addItem(list.data.id, item.name, item.quantity)
      }
      
      toast.success("Shopping list created!")
    } catch (error) {
      toast.error("Failed to create shopping list")
    }
  }

  return (
    <div className="space-y-6">
      {isLoading ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="py-6">
            <p className="text-gray-400 text-center">Loading lists...</p>
          </CardContent>
        </Card>
      ) : lists.length === 0 ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="py-6">
            <p className="text-gray-400 text-center">No AI-generated lists yet</p>
          </CardContent>
        </Card>
      ) : (
        lists.map((list: any) => (
          <Card key={list.id} className="bg-gray-900/50 border-gray-800">
            <CardHeader className="cursor-pointer" onClick={() => toggleList(list.id)}>
              <CardTitle className="text-white flex items-center justify-between">
                <div>
                  <span>{list.name}</span>
                  <p className="text-sm text-gray-400 mt-1">
                    Generated on {new Date(list.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedLists.includes(list.id) ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            {expandedLists.includes(list.id) && (
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-3">Recommended Items</h3>
                    <ul className="space-y-2">
                      {list.items.map((item: any, index: number) => (
                        <li key={index} className="text-gray-300">
                          • {item.name} ({item.quantity}) - {item.reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-3">Smart Suggestions</h3>
                    <ul className="space-y-2">
                      {list.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-gray-300">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => createShoppingList(list.items)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create Shopping List
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  )
}