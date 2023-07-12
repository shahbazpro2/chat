import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    switch (req.method) {
        case 'PATCH':
            const { chatId, pinnedById, pin } = req.body;
            if (!pin) {
                //remove from pinned array
                const deletedPinnedChat = await prisma.chat.update({
                    where: {
                        id: Number(chatId)
                    },
                    data: {
                        pinned: {
                            disconnect: {
                                id: Number(pinnedById)
                            }
                        },
                    },
                    include: {
                        pinned: true
                    }
                })
                return res.status(200).json(deletedPinnedChat);
            }
            //add to pinned array
            const pinnedChat = await prisma.chat.update({
                where: {
                    id: Number(chatId)
                },
                data: {
                    pinned: {
                        connect: {
                            id: Number(pinnedById)
                        }
                    },
                },
                include: {
                    pinned: true
                }
            })
            return res.status(200).json(pinnedChat);



        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}