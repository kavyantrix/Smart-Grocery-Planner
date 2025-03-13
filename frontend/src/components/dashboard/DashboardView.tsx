"use client"

import { useEffect, useState } from "react"
import { useAppSelector } from '@/hooks/redux' // Add useAppDispatch
import { LogOut } from "lucide-react" // Add LogOut icon
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ShoppingCart, Settings, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRouter } from "next/navigation"
import NotificationsCard from "./NotificationsCard"
import SettingsCard from "./SettingsCard"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import ShoppingListCard from "./ShoppingListCard"
import ChatBot from '@/components/chat/ChatBot';
import { CreateShoppingListDialog } from "./CreateShoppingListDialog"
import { PastOrdersDialog } from "./PastOrdersDialog"
import AIGroceryGenerator from '../grocery/AIGroceryGenerator'

export default function DashboardView() {
  const { user } = useAppSelector((state) => state.auth)
  const router = useRouter()
  const [greeting, setGreeting] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCreateList, setShowCreateList] = useState(false)
  const [showPastOrders, setShowPastOrders] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])


  const handleLogout = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}


  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {greeting}, {user?.name}!
                </h1>
                <p className="text-sm text-gray-400">
                  Here&apos;s your grocery plan for the week
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5 text-gray-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-5 w-5 text-gray-400" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-400">
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Family Size: {user?.familySize || 1}</p>
                <p>Dietary Restrictions: {user?.dietaryRestrictions?.join(", ") || "None"}</p>
                <p>Allergies: {user?.allergies?.join(", ") || "None"}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-green-400 to-blue-500"
                onClick={() => setShowCreateList(true)}
              >
                Create Shopping List
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setShowPastOrders(true)}
              >
                View Past Orders
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/ai-lists')}
              >
                View AI Lists
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">No recent activity</p>
            </CardContent>
          </Card>

          {/* Smart Grocery Summary */}
          <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Smart Grocery Summary
                <Button variant="outline" size="sm" className="text-green-400">
                  <Calendar className="mr-2 h-4 w-4" />
                  Next Order: March 15
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Budget Used</span>
                    <span>₹4,500 / ₹6,000</span>
                  </div>
                  <Progress value={75} className="bg-gray-700" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-900/20 p-4 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-2">Running Low</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>🥛 Milk (2 Days)</li>
                      <li>🍞 Bread (3 Days)</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-medium mb-2">Expiring Soon</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>🥦 Spinach (Tomorrow)</li>
                      <li>🍎 Apples (2 Days)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shopping List */}
          <ShoppingListCard />

          {/* Monthly Budget */}
          <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Monthly Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', amount: 4000 },
                      { month: 'Feb', amount: 3500 },
                      { month: 'Mar', amount: 4500 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#34D399" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pantry Status */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Pantry Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rice</span>
                  <Progress value={80} className="w-1/2 bg-gray-700" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Flour</span>
                  <Progress value={45} className="w-1/2 bg-gray-700" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sugar</span>
                  <Progress value={30} className="w-1/2 bg-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Preferences */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Family Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Dietary Restrictions</h4>
                  <div className="flex flex-wrap gap-2">
                    {user?.dietaryRestrictions?.map((restriction) => (
                      <span key={restriction} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {restriction}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {user?.allergies?.map((allergy) => (
                      <span key={allergy} className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <AIGroceryGenerator />
        </div>
      </main>

      {/* Dialogs moved outside main content */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800">
          <NotificationsCard />
        </DialogContent>
      </Dialog>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-4xl bg-gray-900 border-gray-800">
          <SettingsCard />
        </DialogContent>
      </Dialog>
      <ChatBot />

      <CreateShoppingListDialog 
  open={showCreateList} 
  onOpenChange={setShowCreateList}
/>
<PastOrdersDialog 
  open={showPastOrders} 
  onOpenChange={setShowPastOrders}
/>  

    </div>
  )
}






