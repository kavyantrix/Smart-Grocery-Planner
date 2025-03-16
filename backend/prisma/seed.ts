import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: await bcrypt.hash('password123', 10),
    },
  })

  // Create vendors
  const amazonVendor = await prisma.vendor.create({
    data: {
      name: 'Amazon Fresh',
      active: true,
    },
  })

  const walmartVendor = await prisma.vendor.create({
    data: {
      name: 'Walmart',
      active: true,
    },
  })

  // Create some products
  const milk = await prisma.product.create({
    data: {
      name: 'Organic Whole Milk',
      description: '1 Gallon, Grade A',
      price: 4.99,
      category: 'Dairy',
      brand: 'Horizon',
      weight: 1,
      unit: 'gallon',
      vendorProducts: {
        create: [
          {
            vendorId: amazonVendor.id,
            price: 4.99,
            vendorSku: 'AMZN-MILK-001',
          },
          {
            vendorId: walmartVendor.id,
            price: 4.79,
            vendorSku: 'WM-MILK-001',
          },
        ],
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    throw new Error('Seeding failed')
  })
  .finally(async () => {
    await prisma.$disconnect()
  })