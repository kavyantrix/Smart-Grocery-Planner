import express, { Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import prisma from '../config/database';

const router = express.Router();

// Get user settings
router.get('/', authMiddleware, async (req: Request, res: Response) => {

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        settings: true,
        familySize: true,
        dietaryRestrictions: true,
        allergies: true,
      },
    });
    res.json(user);
  } catch (error) {
    console.error('Settings GET Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user settings
router.put('/', authMiddleware, async (req: Request, res: Response) => {
  
  try {
    const { name, phoneNumber, address, settings, familySize, dietaryRestrictions, allergies } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        phoneNumber,
        address,
        settings,
        familySize,
        dietaryRestrictions,
        allergies,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;