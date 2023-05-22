/*
  Warnings:

  - You are about to drop the column `pinned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pinned",
ADD COLUMN     "lastSeen" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "PinnedUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pinnedById" INTEGER NOT NULL,
    "pinnedId" INTEGER NOT NULL,

    CONSTRAINT "PinnedUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PinnedUser" ADD CONSTRAINT "PinnedUser_pinnedById_fkey" FOREIGN KEY ("pinnedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinnedUser" ADD CONSTRAINT "PinnedUser_pinnedId_fkey" FOREIGN KEY ("pinnedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
