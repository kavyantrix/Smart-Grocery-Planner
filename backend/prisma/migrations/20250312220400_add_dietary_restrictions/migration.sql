-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dietaryRestrictions" TEXT[] DEFAULT ARRAY[]::TEXT[];
