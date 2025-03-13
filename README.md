# PantryPal AI


A modern AI-driven grocery management system that helps users plan, track, and automate their grocery shopping experience.

## Features

- User Authentication (Email, Google, Apple)
- Smart Grocery List Generation
- AI-Powered Shopping Recommendations
- Budget Tracking
- Family Member Collaboration
- Expiry Date Tracking
- Recipe Suggestions

## Project Structure

smart-grocery-planner/
├── frontend/     # Next.js frontend application
└── backend/      # Node.js backend API

frontend/
├── src/
    ├── app/         # Next.js app router pages
    ├── components/  # Reusable components
    ├── context/     # React context providers
    ├── hooks/       # Custom React hooks
    ├── types/       # TypeScript type definitions
    └── utils/       # Utility functions




## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd smart-grocery-planner

## Setup Backend
cd backend
npm install
cp .env.example .env    # Configure your environment variables
npx prisma migrate dev
npm run dev


## Setup Frontend
cd frontend
npm install
cp .env.example .env    # Configure your environment variables
npm run dev


## API DOCUMENTATION[]: # API Documentation

- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile