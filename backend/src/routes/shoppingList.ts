import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticateUser } from '../middleware/auth';
import { Request, Response } from 'express';

const router = Router();

// Get user's active shopping list
router.get('/', authenticateUser, async (req: Request, res: Response) => {
  
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const list = await prisma.shoppingList.findFirst({
      where: {
        userId: req.user.id,
        isActive: true,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shopping list' });
  }
});

// Create new shopping list
router.post('/', authenticateUser, async (req: Request, res: Response) => {
  try {
    const list = await prisma.shoppingList.create({
      data: {
        userId: req.user!.id,
        name: req.body.name || 'Shopping List',
      },
    });
  

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create shopping list' });
  }
});

// Add item to shopping list
router.post('/:listId/items', authenticateUser, async (req: Request, res: Response) => {
  try {
    const { name, quantity } = req.body;
    const item = await prisma.shoppingItem.create({
      data: {
        name,
        quantity,
        shoppingListId: req.params.listId,
      },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update item status
router.patch('/:listId/items/:itemId', authenticateUser, async (req: Request, res: Response) => {
  try {
    const item = await prisma.shoppingItem.update({
      where: {
        id: req.params.itemId,
      },
      data: {
        checked: req.body.checked,
      },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete item
router.delete('/:listId/items/:itemId', authenticateUser, async (req: Request, res: Response) => {
  try {
    await prisma.shoppingItem.delete({
      where: {
        id: req.params.itemId,
      },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;