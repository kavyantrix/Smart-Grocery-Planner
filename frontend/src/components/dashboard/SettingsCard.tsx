import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from "@/hooks/useSettings"
import { toast } from "sonner"
import type { User } from "@/types/user"

export default function SettingsCard() {
  const { user, updateUser } = useAuth()
  const { updateSettings, loading } = useSettings()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    familySize: user?.familySize || 1,
    autoOrder: user?.settings?.autoOrder || false,
    deliveryFrequency: user?.settings?.deliveryFrequency || 'weekly',
    monthlyBudget: user?.settings?.monthlyBudget || 6000,
  })

  const handleSubmit = async () => {
    try {
      const updatedUser = await updateSettings({
        ...formData,
        settings: {
          autoOrder: formData.autoOrder,
          deliveryFrequency: formData.deliveryFrequency as 'weekly' | 'biweekly' | 'monthly',
          monthlyBudget: formData.monthlyBudget,
        },
      }) as User // Type assertion here

      updateUser(updatedUser)
      setIsEditing(false)
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Settings & Preferences
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditing ? 'Save' : 'Edit'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400">Personal Details</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400">Auto-Order Preferences</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-order">Enable Auto-Order</Label>
                <Switch 
                  id="auto-order" 
                  checked={formData.autoOrder}
                  onCheckedChange={(checked) => handleChange('autoOrder', checked)}
                  disabled={!isEditing} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Delivery Frequency</Label>
                <select 
                  id="frequency" 
                  value={formData.deliveryFrequency}
                  onChange={(e) => handleChange('deliveryFrequency', e.target.value)}
                  className="w-full bg-gray-800 border-gray-700 rounded-md p-2 text-gray-300"
                  disabled={!isEditing}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-400">Budget Settings</h4>
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.monthlyBudget}
                onChange={(e) => handleChange('monthlyBudget', Number(e.target.value))}
                disabled={!isEditing}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}