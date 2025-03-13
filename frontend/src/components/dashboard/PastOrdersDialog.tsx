import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { api } from "@/lib/axios"

interface PastOrdersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Order {
  id: string;
  total: number;
  createdAt: string;
  items: any[];
  status: string;
}

export function PastOrdersDialog({ open, onOpenChange }: PastOrdersDialogProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await api.get<Order[]>('/actions/orders/past')
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchOrders()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Past Orders</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-gray-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-400">No past orders found</p>
          ) : (
            <div className="space-y-2">
              {orders.map((order: any) => (
                <div key={order.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="text-green-400">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}