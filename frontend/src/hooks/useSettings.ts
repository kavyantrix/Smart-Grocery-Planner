import { useState } from 'react'
import type { User } from '@/types/user'

interface SettingsData {
  name: string;
  phoneNumber?: string;
  address?: string;
  familySize?: number;
  settings: {
    autoOrder: boolean;
    deliveryFrequency: 'weekly' | 'biweekly' | 'monthly';
    monthlyBudget: number;
  };
}

export function useSettings() {
  const [loading, setLoading] = useState(false)

  const updateSettings = async (data: SettingsData): Promise<User> => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update settings')
      }

      const updatedUser = await response.json()
      return updatedUser
    } finally {
      setLoading(false)
    }
  }

  return { updateSettings, loading }
}