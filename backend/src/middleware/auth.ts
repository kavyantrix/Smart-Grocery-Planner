import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma'

declare global {
  namespace Express {
    interface Request {
      userId?: string;  // Changed from number to string
    }
  }
}

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;  // Changed from id to userId to match token structure
      email: string;
    }


    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }, // Changed from decoded.id to decoded.userId
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = { id: user.id, email: user.email }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token' })
  }
}