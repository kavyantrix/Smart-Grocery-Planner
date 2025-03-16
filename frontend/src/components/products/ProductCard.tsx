import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ShoppingCart, ArrowRightLeft } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
    brand: string
  }
  onCompare: () => void
}

export function ProductCard({ product, onCompare }: ProductCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardContent className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.brand}</p>
        <p className="text-lg font-bold text-green-400 mt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" onClick={onCompare}>
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Compare
        </Button>
        <Button size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}