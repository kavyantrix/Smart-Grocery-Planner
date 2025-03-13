import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Notification {
  id: string;
  type: 'EXPIRING' | 'LOW_STOCK' | 'OFFER';
  message: string;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Notification[]>('http://localhost:8000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  return { notifications, loading, refetch: fetchNotifications };
}