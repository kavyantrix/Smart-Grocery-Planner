import { ProductGrid } from "@/components/products/ProductGrid"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Available Products</h1>
        <ProductGrid />
      </div>
    </main>
  )
}