'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface VendorComparisonProps {
  productId: string
  onClose: () => void
}

interface VendorPrice {
  name: string
  price: number
  availability: boolean
  deliveryEstimate: string
  offers: string[]
}

export function VendorComparison({ productId, onClose }: VendorComparisonProps) {
  const [comparisons, setComparisons] = useState<VendorPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComparisons()
  }, [productId])

  const fetchComparisons = async () => {
    try {
      const response = await fetch(`/api/vendors/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: [productId] }),
      })
      const data = await response.json()
      setComparisons(data[0]?.vendors || [])
    } catch (error) {
      console.error('Failed to fetch comparisons:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Price Comparison</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-4">Loading comparisons...</div>
        ) : (
          <div className="space-y-4">
            {comparisons.map((vendor) => (
              <div
                key={vendor.name}
                className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{vendor.name}</h4>
                  <p className="text-sm text-gray-400">
                    Delivery: {vendor.deliveryEstimate}
                  </p>
                  {vendor.offers.length > 0 && (
                    <p className="text-sm text-blue-400">{vendor.offers[0]}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">
                    ${vendor.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    {vendor.availability ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}