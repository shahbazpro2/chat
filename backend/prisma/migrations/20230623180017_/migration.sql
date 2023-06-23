-- DropForeignKey
ALTER TABLE "Pinned" DROP CONSTRAINT "Pinned_chatId_fkey";

-- AddForeignKey
ALTER TABLE "Pinned" ADD CONSTRAINT "Pinned_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
