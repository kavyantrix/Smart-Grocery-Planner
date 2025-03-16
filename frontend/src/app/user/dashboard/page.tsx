import { 
  ShoppingBag, 
  Clock, 
  Bell, 
  CreditCard, 
  Home,
  Settings 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Account</h1>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="bg-gray-900/50 p-6 border-gray-800">
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            </div>
            <div className="space-y-3">
              {/* Add recent orders list here */}
              <p className="text-gray-400">No recent orders</p>
            </div>
          </Card>

          {/* Scheduled Deliveries */}
          <Card className="bg-gray-900/50 p-6 border-gray-800">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-green-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Scheduled Deliveries</h2>
            </div>
            <div className="space-y-3">
              {/* Add scheduled deliveries list here */}
              <p className="text-gray-400">No scheduled deliveries</p>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="bg-gray-900/50 p-6 border-gray-800">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-yellow-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-3">
              {/* Add notifications list here */}
              <p className="text-gray-400">No new notifications</p>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-gray-900/50 p-6 border-gray-800">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Add Payment Method</Button>
            </div>
          </Card>

          {/* Delivery Addresses */}
          <Card className="bg-gray-900/50 p-6 border-gray-800">
            <div className="flex items-center mb-4">
              <Home className="w-6 h-6 text-pink-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Delivery Addresses</h2>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">Add Address</Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button>View All Orders</Button>
            <Button variant="outline">Update Profile</Button>
            <Button variant="outline">Manage Subscriptions</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
