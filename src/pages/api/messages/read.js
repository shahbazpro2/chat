import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    //read all messages
    switch (req.method) {
        case 'POST':
            const { messagesIds } = req.body;
            const updatedMessages = await prisma.message.updateMany({
                where: {
                    id: {
                        in: messagesIds
                    }
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

