import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/database';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

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