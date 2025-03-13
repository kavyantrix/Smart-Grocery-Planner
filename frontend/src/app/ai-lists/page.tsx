"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import AIGroceryGenerator from "@/components/grocery/AIGroceryGenerator"
import AIGroceryLists from "@/components/grocery/AIGroceryLists"

export default function AIListsPage() {
  const router = useRouter()
  const [showGenerator, setShowGenerator] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5 text-gray-400" />
              </Button>
              <h1 className="text-xl font-semibold text-white">AI-Generated Lists</h1>
            </div>
            <Button 
              onClick={() => setShowGenerator(true)}
              className="bg-gradient-to-r from-green-400 to-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Generate New List
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showGenerator ? (
          <div className="mb-8">
            <AIGroceryGenerator onSuccess={() => setShowGenerator(false)} />
          </div>
        ) : null}
        <AIGroceryLists />
      </main>
    </div>
  )
}