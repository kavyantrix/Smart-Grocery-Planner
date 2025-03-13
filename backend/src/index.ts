import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/database';
import authRoutes from './routes/auth';
import notificationsRoutes from './routes/notifications';
import settingsRoutes from './routes/settings';
import shoppingListRoutes from './routes/shoppingList';
import actionsRoutes from './routes/actions';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/user/settings', settingsRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/ai', aiRoutes);


prisma.$connect()
  .then(() => {
    console.log('Connected to PostgreSQL successfully');
  })
  .catch((error: any) => {
    console.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});