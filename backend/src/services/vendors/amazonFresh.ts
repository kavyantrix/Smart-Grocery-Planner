import axios from 'axios';
import { VendorAPI, VendorProduct } from './types';

export class AmazonFreshAPI implements VendorAPI {
  private readonly apiKey: string;
  private readonly apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.AMAZON_FRESH_API_KEY || '';
    this.apiEndpoint = 'https://api.amazon.com/fresh/v1';
  }

  private async request(path: string, method = 'GET', data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.apiEndpoint}${path}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data
      });
      return response.data;
    } catch (error) {
      console.error('Amazon Fresh API Error:', error);
      throw error;
    }
  }

  async searchProducts(query: string): Promise<VendorProduct[]> {
    const response = await this.request(`/products/search?q=${encodeURIComponent(query)}`);
    return response.items.map(this.mapToVendorProduct);
  }

  async getProduct(id: string): Promise<VendorProduct> {
    const response = await this.request(`/products/${id}`);
    return this.mapToVendorProduct(response);
  }

  async checkAvailability(id: string): Promise<boolean> {
    const response = await this.request(`/products/${id}/availability`);
    return response.inStock;
  }

  async getPrice(id: string): Promise<number> {
    const response = await this.request(`/products/${id}/price`);
    return response.amount;
  }

  async placeOrder(items: { id: string; quantity: number; }[]): Promise<string> {
    const response = await this.request('/orders', 'POST', { items });
    return response.orderId;
  }

  private mapToVendorProduct(item: any): VendorProduct {
    return {
      id: item.asin,
      name: item.title,
      price: item.price.amount,
      availability: item.availability === 'IN_STOCK',
      deliveryEstimate: item.delivery.estimate,
      imageUrl: item.images.primary,
      offers: item.offers?.map((offer: any) => offer.description)
    };
  }
}