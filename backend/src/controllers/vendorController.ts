import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { VendorFactory } from '../services/vendors/vendorFactory'
import { Prisma } from '@prisma/client'

export const vendorController = {
  // Update the compareProducts method
  async compareProducts(req: Request, res: Response) {
    try {
      const { productIds } = req.body;
      const vendors = ['amazon', 'walmart'];
      
      const comparisons = await Promise.all(productIds.map(async (id: string) => {
        const vendorResults = await Promise.all(
          vendors.map(async (vendorName) => {
            const vendor = VendorFactory.getVendor(vendorName);
            const product = await vendor.getProduct(id);
            return {
              name: vendorName,
              price: product.price,
              availability: product.availability,
              deliveryEstimate: product.deliveryEstimate,
              offers: product.offers
            };
          })
        );
        
        return {
          productId: id,
          vendors: vendorResults
        };
      }));
      
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to compare products' });
    }
  },

  async scheduleOrder(req: Request, res: Response) {
    try {
      const { vendorId, items, frequency } = req.body
      const userId = req.user?.id

      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' })
      }

      const order = await prisma.scheduledOrder.create({
        data: {
          user: {
            connect: { id: userId }
          },
          vendor: {
            connect: { id: vendorId }
          },
          frequency: frequency.type,
          items: {
            create: items.map((item: { id: string; quantity: number }) => ({
              product: {
                connect: { id: item.id }
              },
              quantity: item.quantity,
              price: 0 // You might want to fetch the actual price here
            }))
          }
        }
      })

      res.json(order)
    } catch (error) {
      res.status(500).json({ error: 'Failed to schedule order' })
    }
  },

  async getAlternatives(req: Request, res: Response) {
    try {
      const { productId } = req.params

      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { category: true }
      })

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      const alternatives = await prisma.product.findMany({
        where: {
          category: product.category,
          NOT: {
            id: productId
          }
        },
        take: 4,
        include: {
          vendorProducts: true
        }
      })

      res.json(alternatives)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch alternatives' })
    }
  },

  async getVendorOffers(req: Request, res: Response) {
    try {
      const { vendorId } = req.params
      // TODO: Implement actual vendor API integration
      const offers = [
        { id: 1, description: '10% off on first order', code: 'FIRST10' },
        { id: 2, description: 'Free delivery on orders above $50', code: 'FREEDEL50' }
      ]
      res.json(offers)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch vendor offers' })
    }
  }
}