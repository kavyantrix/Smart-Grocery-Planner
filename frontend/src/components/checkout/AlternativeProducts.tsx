import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { vendorService, VendorProduct } from '@/services/vendorService'
import Image from 'next/image'

interface AlternativeProductsProps {
  productId: string
  onSelect: (product: VendorProduct) => void
}

export function AlternativeProducts({ productId, onSelect }: AlternativeProductsProps) {
  const [alternatives, setAlternatives] = useState<VendorProduct[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAlternatives()
  }, [productId])

  const loadAlternatives = async () => {
    setLoading(true)
    try {
      const results = await vendorService.getAlternatives(productId)
      setAlternatives(results)
    } catch (error) {
      console.error('Failed to load alternatives:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <h3 className="text-white font-medium mb-4">Alternative Products</h3>
        {loading ? (
          <p className="text-gray-400">Loading alternatives...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {alternatives.map((product) => (
              <div 
                key={product.id} 
                className="bg-gray-800/50 p-4 rounded-lg cursor-pointer hover:bg-gray-800"
                onClick={() => onSelect(product)}
              >
                <div className="relative h-32 mb-2">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-white font-medium">{product.name}</h4>
                <p className="text-green-400">${product.price}</p>
                <p className="text-sm text-gray-400">{product.vendor}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                >
                  Select Alternative
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}