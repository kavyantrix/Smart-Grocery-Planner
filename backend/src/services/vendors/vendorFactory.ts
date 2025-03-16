import { AmazonFreshAPI } from './amazonFresh';
import { WalmartAPI } from './walmart';
import { VendorAPI } from './types';

export class VendorFactory {
  private static vendors: Map<string, VendorAPI> = new Map();

  static getVendor(vendorName: string): VendorAPI {
    if (!this.vendors.has(vendorName)) {
      switch (vendorName.toLowerCase()) {
        case 'amazon':
          this.vendors.set(vendorName, new AmazonFreshAPI());
          break;
        case 'walmart':
          this.vendors.set(vendorName, new WalmartAPI());
          break;
        default:
          throw new Error(`Unsupported vendor: ${vendorName}`);
      }
    }
    return this.vendors.get(vendorName)!;
  }
}