"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { aiService } from "@/services/aiService"
import { shoppingListApi } from "@/services/shoppingList"
import { toast } from "sonner"

export default function AIGroceryGenerator({ onSuccess }: { onSuccess?: () => void }) {
  const [familySize, setFamilySize] = useState(1)
  const [budget, setBudget] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])
  const [preferences, setPreferences] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendation, setRecommendation] = useState<any>(null)

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Keto", "Gluten-Free",
    "Dairy-Free", "Low-Carb", "Diabetic-Friendly"
  ]

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      const response = await aiService.generateGroceryList({
        familySize,
        dietaryRestrictions,
        preferences,
        budget: budget ? parseFloat(budget) : undefined
      })

      const listName = `${dietaryRestrictions.length ? dietaryRestrictions.join(', ') : 'Regular'} - Family of ${familySize} - ${new Date().toLocaleString()}`

      // Create a shopping list with the generated items
      const shoppingList = await shoppingListApi.createList(listName)
      
      // Add all items at once using the batch endpoint
      const itemsToAdd = response.data.items.map((item: any) => ({
        name: item.item || item.name, // Handle both possible response formats
        quantity: item.quantity?.toString() || '1'
      }))

      console.log('Items to add:', itemsToAdd) // Add logging to check mapped items

      await shoppingListApi.addMultipleItems(
        shoppingList.data.id, 
        itemsToAdd
      )

      // Save the generated list to the database
      await aiService.saveGeneratedList({
        name: listName,
        items: response.data.items,
        suggestions: response.data.suggestions
      })

      setRecommendation(response.data)
      toast.success("List generated and saved!")
      onSuccess?.()
    } catch (error) {
      console.error('Generation error:', error)
      toast.error("Failed to generate recommendations")
    } finally {
      setIsGenerating(false)
    }
  }

  const createShoppingList = async () => {
    if (!recommendation) return

    try {
      const listName = `${dietaryRestrictions.length ? dietaryRestrictions.join(', ') : 'Regular'} - Family of ${familySize} - ${new Date().toLocaleString()}`
      const list = await shoppingListApi.createList(listName)
      
      // Add all items at once
      await shoppingListApi.addMultipleItems(
        list.data.id,
        recommendation.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity
        }))
      )
      
      toast.success("Shopping list created!")
      setRecommendation(null)
    } catch (error) {
      console.error('Shopping list creation error:', error)
      toast.error("Failed to create shopping list")
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">AI Grocery List Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Family Size</label>
            <Input
              type="number"
              min={1}
              value={familySize}
              onChange={(e) => setFamilySize(parseInt(e.target.value))}
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Budget (Optional)</label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget"
              className="bg-gray-800 border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Dietary Restrictions</label>
            <Select
              onValueChange={(value) => 
                setDietaryRestrictions(prev => [...prev, value])
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select restrictions" />
              </SelectTrigger>
              <SelectContent>
                {dietaryOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {dietaryRestrictions.map(restriction => (
                <Badge
                  key={restriction}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setDietaryRestrictions(prev => 
                    prev.filter(r => r !== restriction)
                  )}
                >
                  {restriction} ×
                </Badge>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-green-400 to-blue-500"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate List'
            )}
          </Button>

          {recommendation && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-3">Recommended Items</h3>
                <ul className="space-y-2">
                  {recommendation.items.map((item: any, index: number) => (
                    <li key={index} className="text-gray-300">
                      • {item.name} ({item.quantity}) - {item.reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-3">Smart Suggestions</h3>
                <ul className="space-y-2">
                  {recommendation.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-gray-300">
                      • {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={createShoppingList}
              >
                Create Shopping List
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}