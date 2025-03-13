import express from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Create Shopping List
router.post('/shopping-list/create', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'List name is required' });
    }

    const shoppingList = await prisma.shoppingList.create({
      data: {
        user: {
          connect: {
            id: req.userId
          }
        },
        name,
        items: {
          create: []
        }
      }
    });
    res.json(shoppingList);
  } catch (error) {
    console.error('Shopping list creation error:', error);
    res.status(500).json({ message: 'Failed to create shopping list' });
  }
});

// Get All Shopping Lists
router.get('/shopping-list/all', authMiddleware, async (req, res) => {
  try {
    const lists = await prisma.shoppingList.findMany({
      where: {
        userId: req.userId
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(lists);
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
    res.status(500).json({ message: 'Failed to fetch shopping lists' });
  }
});

// Get Past Orders
router.get('/orders/past', authMiddleware, async (req, res) => {
  try {
    const pastOrders = await prisma.order.findMany({
      where: {
        userId: req.userId,
        status: 'COMPLETED'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    res.json(pastOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch past orders' });
  }
});

export default router;