import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { vendorService } from '@/services/vendorService'
import { ShoppingCart, Calendar, RefreshCw } from 'lucide-react'

interface SmartCheckoutProps {
  items: any[]
  onCheckout: (vendorId: string, frequency: OrderFrequency) => void
}

export function SmartCheckout({ items, onCheckout }: SmartCheckoutProps) {
  const [selectedVendor, setSelectedVendor] = useState('')
  const [frequency, setFrequency] = useState<OrderFrequency>({ type: 'weekly' })
  const [comparisons, setComparisons] = useState<VendorComparison[]>([])
  const [loading, setLoading] = useState(false)

  const handleCompare = async () => {
    setLoading(true)
    try {
      const productIds = items.map(item => item.id)
      const results = await vendorService.compareProducts(productIds)
      setComparisons(results)
    } catch (error) {
      console.error('Failed to compare vendors:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Smart Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vendor Comparison */}
        <div className="space-y-4">
          <Button 
            onClick={handleCompare} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4 mr-2" />
            )}
            Compare Vendors
          </Button>

          {comparisons.map((comparison) => (
            <div key={comparison.productName} className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">{comparison.productName}</h3>
              <div className="space-y-2">
                {comparison.vendors.map((vendor) => (
                  <div key={vendor.name} className="flex justify-between items-center">
                    <span className="text-gray-300">{vendor.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-green-400">${vendor.price}</span>
                      {vendor.offers && (
                        <span className="text-blue-400 text-sm">
                          {vendor.offers[0]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Frequency */}
        <div className="space-y-4">
          <h3 className="font-medium text-white">Delivery Schedule</h3>
          <Select
            value={frequency.type}
            onValueChange={(value: OrderFrequency['type']) => 
              setFrequency({ type: value })}
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </div>

        {/* Checkout Button */}
        <Button 
          onClick={() => onCheckout(selectedVendor, frequency)}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500"
          size="lg"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Order
        </Button>
      </CardContent>
    </Card>
  )
}