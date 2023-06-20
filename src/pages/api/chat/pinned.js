import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    const { id } = req.query || {};
    switch (req.method) {
        case 'POST':
            const { pinnedById, chatId } = req.body;
            const newPinned = await prisma.pinned.create({
                data: {
                    pinnedById,
                    chatId
                },
                include: {
                    chat: {
                        include: {
                            members: true
                        }
                    },
                    pinnedBy: true
                }
            });

            return res.status(201).json({
                ...newPinned.chat.members.filter(member => member.id !== Number(pinnedById))?.[0],
                chatId: newPinned.chatId,
                pinnedId: newPinned.id,
            });
        case 'GET':
            const pinned = await prisma.pinned.findMany({
                where: {
                    pinnedById: Number(id)
                },
                include: {
                    chat: {
                        include: {
                            members: true
                        }
                    },
                    pinnedBy: true
                }
            })

            const modifiyPinned = pinned.map(item => {
                return {
                    ...item.chat.members.filter(member => member.id !== Number(id))?.[0],
                    chatId: item.chatId,
                    pinnedId: item.id,
                }
            })

            return res.status(200).json(modifiyPinned);
        case 'DELETE':
            const deletedPinned = await prisma.pinned.delete({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json(deletedPinned);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}