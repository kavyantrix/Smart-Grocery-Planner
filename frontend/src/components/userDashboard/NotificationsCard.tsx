import { Bell, ShoppingBag, Tag, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNotifications } from "@/hooks/useNotifications"

export default function NotificationsCard() {
  const { notifications, loading } = useNotifications();

  const expiringItems = notifications.filter(n => n.type === 'EXPIRING');
  const lowStockItems = notifications.filter(n => n.type === 'LOW_STOCK');
  const offers = notifications.filter(n => n.type === 'OFFER');

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Notifications & Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringItems.length > 0 && (
            <div className="bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-medium flex items-center mb-2">
                <Bell className="h-4 w-4 mr-2" />
                Expiring Soon
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {expiringItems.map(item => (
                  <li key={item.id}>• {item.message}</li>
                ))}
              </ul>
            </div>
          )}
          
          {lowStockItems.length > 0 && (
            <div className="bg-red-900/20 p-4 rounded-lg">
              <h4 className="text-red-400 font-medium flex items-center mb-2">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Low Stock Alert
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {lowStockItems.map(item => (
                  <li key={item.id}>• {item.message}</li>
                ))}
              </ul>
            </div>
          )}

          {offers.length > 0 && (
            <div className="bg-green-900/20 p-4 rounded-lg">
              <h4 className="text-green-400 font-medium flex items-center mb-2">
                <Tag className="h-4 w-4 mr-2" />
                Special Offers
              </h4>
              <ul className="text-sm text-gray-400 space-y-1">
                {offers.map(item => (
                  <li key={item.id}>• {item.message}</li>
                ))}
              </ul>
            </div>
          )}

          {notifications.length === 0 && (
            <p className="text-gray-400 text-center py-4">No new notifications</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}