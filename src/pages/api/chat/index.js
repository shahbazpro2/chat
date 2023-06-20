import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
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
                include: {
                    pinned: true,
                    members: true,
                }
            })
            return res.status(200).json(users);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}