'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { VendorComparison } from './VendorComparison'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  brand: string
  vendorProducts: any[]
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onCompare={() => setSelectedProduct(product.id)}
          />
        ))}
      </div>

      {selectedProduct && (
        <VendorComparison 
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}