import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    //read all messages
    switch (req.method) {
        case 'POST':
            const { senderId, chatId } = req.body;
            const updatedMessages = await prisma.message.updateMany({
                where: {
                    senderId: senderId,
                    chatId: Number(chatId),
                    read: false
                },
                data: {
                    read: true
                }
            });
            return res.status(200).json(updatedMessages);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

