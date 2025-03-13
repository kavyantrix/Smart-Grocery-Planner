import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.userId,
        isRead: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;