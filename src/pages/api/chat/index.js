import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { title, members, group = false } = req.body;
            const newGroup = await prisma.chat.create({
                data: {
                    title,
                    members: {
                        connect: members.map(member => ({ id: member }))
                    },
                    group
                },
                include: {
                    members: true
                }
            })

            return res.status(200).json(newGroup);
        case 'GET':
            const { id } = req.query;
            const users = await prisma.chat.findMany({
                where: {
                    members: {
                        some: {
                            id: Number(id)
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                include: {
                    pinned: true,
                    members: true,
                }
            })
            const addPinned = users.map(user => {
                const isChatPinned = user.pinned.find(pinned => pinned.id === Number(id))
                //remove pinned object
                delete user.pinned
                return {
                    ...user,
                    isChatPinned: isChatPinned ? true : false
                }
            })
            return res.status(200).json(addPinned);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}