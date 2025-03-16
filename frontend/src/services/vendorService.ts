import { api } from '@/lib/axios'

export interface VendorProduct {
  id: string
  name: string
  price: number
  vendor: string
  availability: boolean
  imageUrl: string
  alternativeProducts?: VendorProduct[]
}

export interface OrderFrequency {
  type: 'weekly' | 'biweekly' | 'monthly'
  dayOfWeek?: number
  dayOfMonth?: number
}

export interface VendorComparison {
  productName: string
  vendors: {
    name: string
    price: number
    availability: boolean
    deliveryEstimate: string
    offers?: string[]
  }[]
}

export const vendorService = {
  compareProducts: async (productIds: string[]): Promise<VendorComparison[]> => {
    return api.post('/vendors/compare', { productIds })
  },

  scheduleOrder: async (vendorId: string, items: any[], frequency: OrderFrequency) => {
    return api.post('/vendors/schedule-order', { vendorId, items, frequency })
  },

  getAlternatives: async (productId: string): Promise<VendorProduct[]> => {
    return api.get(`/vendors/alternatives/${productId}`)
  },

  getVendorOffers: async (vendorId: string) => {
    return api.get(`/vendors/${vendorId}/offers`)
  }
}