import axios from 'axios';
import { VendorAPI, VendorProduct } from './types';

export class WalmartAPI implements VendorAPI {
  private readonly apiKey: string;
  private readonly apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.WALMART_API_KEY || '';
    this.apiEndpoint = 'https://api.walmart.com/v4';
  }

  private async request(path: string, method = 'GET', data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.apiEndpoint}${path}`,
        headers: {
          'WM_SEC.ACCESS_TOKEN': this.apiKey,
          'Content-Type': 'application/json'
        },
        data
      });
      return response.data;
    } catch (error) {
      console.error('Walmart API Error:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<VendorProduct[]> {
    const response = await this.request(`/products/search?query=${encodeURIComponent(query)}`);
    return response.items.map(this.mapToVendorProduct);
  }

  async getProduct(id: string): Promise<VendorProduct> {
    const response = await this.request(`/products/${id}`);
    return this.mapToVendorProduct(response);
  }

  async checkAvailability(id: string): Promise<boolean> {
    const response = await this.request(`/products/${id}/availability`);
    return response.available;
  }

  async getPrice(id: string): Promise<number> {
    const response = await this.request(`/products/${id}/price`);
    return response.currentPrice.price;
  }

  async placeOrder(items: { id: string; quantity: number; }[]): Promise<string> {
    const response = await this.request('/orders', 'POST', { items });
    return response.orderId;
  }

  private mapToVendorProduct(item: any): VendorProduct {
    return {
      id: item.itemId,
      name: item.name,
      price: item.salePrice,
      availability: item.availabilityStatus === 'IN_STOCK',
      deliveryEstimate: item.shippingEstimate,
      imageUrl: item.images[0].url,
      offers: item.promotions?.map((promo: any) => promo.description)
    };
  }
}