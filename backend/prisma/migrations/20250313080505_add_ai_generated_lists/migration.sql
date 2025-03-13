-- CreateTable
CREATE TABLE "ai_generated_lists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "suggestions" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_generated_lists_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ai_generated_lists" ADD CONSTRAINT "ai_generated_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
