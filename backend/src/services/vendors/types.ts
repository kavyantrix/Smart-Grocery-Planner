export interface VendorProduct {
  id: string;
  name: string;
  price: number;
  availability: boolean;
  deliveryEstimate: string;
  imageUrl: string;
  offers?: string[];
}

export interface VendorAPI {
  searchProducts(query: string): Promise<VendorProduct[]>;
  getProduct(id: string): Promise<VendorProduct>;
  checkAvailability(id: string): Promise<boolean>;
  getPrice(id: string): Promise<number>;
  placeOrder(items: { id: string; quantity: number; }[]): Promise<string>;
}