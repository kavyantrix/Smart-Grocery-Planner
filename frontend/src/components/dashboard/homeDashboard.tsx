
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  ClipboardList, 
  Settings, 
  History,
  Store,
  Users
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/products" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors">
              <Store className="w-8 h-8 text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Products</h2>
              <p className="text-gray-400">Browse and compare products from different vendors</p>
            </div>
          </Link>

          <Link href="/shopping-list" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-green-500 transition-colors">
              <ShoppingCart className="w-8 h-8 text-green-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Shopping List</h2>
              <p className="text-gray-400">Manage your current shopping lists</p>
            </div>
          </Link>

          <Link href="/inventory" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors">
              <ClipboardList className="w-8 h-8 text-purple-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Inventory</h2>
              <p className="text-gray-400">Track your pantry and household items</p>
            </div>
          </Link>

          <Link href="/order-history" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-yellow-500 transition-colors">
              <History className="w-8 h-8 text-yellow-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Order History</h2>
              <p className="text-gray-400">View past orders and reorder items</p>
            </div>
          </Link>

          <Link href="/family" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-pink-500 transition-colors">
              <Users className="w-8 h-8 text-pink-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Family</h2>
              <p className="text-gray-400">Manage family members and sharing settings</p>
            </div>
          </Link>

          <Link href="/settings" className="block">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-orange-500 transition-colors">
              <Settings className="w-8 h-8 text-orange-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Settings</h2>
              <p className="text-gray-400">Configure your account preferences</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              New Shopping List
            </Button>
            <Button variant="outline">
              <ClipboardList className="w-4 h-4 mr-2" />
              Update Inventory
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
