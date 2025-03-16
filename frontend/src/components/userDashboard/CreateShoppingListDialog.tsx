import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { api } from "@/lib/axios"
import { toast } from "sonner"

export function CreateShoppingListDialog({ 
  open, 
  onOpenChange,
  onSuccess 
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter a list name')
      return
    }

    try {
      setIsLoading(true)
      await api.post('/api/shopping-list', { name }) // Updated endpoint
      toast.success('Shopping list created!')
      setName("")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Create list error:', error)
      toast.error('Failed to create shopping list')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Create Shopping List</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter list name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button 
            className="w-full bg-gradient-to-r from-green-400 to-blue-500"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create List'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}