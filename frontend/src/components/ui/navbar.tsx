import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart, User } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            PantryPal AI
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/user/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/shopping-list">
              <Button variant="ghost">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shopping List
              </Button>
            </Link>
            <Link href="/user/profile">
              <Button variant="ghost">
                <User className="w-5 h-5 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}