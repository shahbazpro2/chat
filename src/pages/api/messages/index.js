import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { text, senderId, receiverId } = req.body;
            const newMessage = await prisma.message.create({
                data: {
                    text,
                    senderId,
                    receiverId
                }
            });
            return res.status(201).json(newMessage);
        case 'GET':
            const { user } = req.query;
            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        {
                            senderId: Number(user),
                        },
                        {
                            receiverId: Number(user),
                        },
                    ],
                },
                include: {
                    sender: true,
                    receiver: true,
                }
            });
            return res.status(200).json(messages);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}