import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { title, members } = req.body;
            const newGroup = await prisma.group.create({
                data: {
                    title,
                    members: {
                        connect: members.map(member => ({ id: member }))
                    }
                },
                include: {
                    members: true
                }
            })

            return res.status(200).json(newGroup);
        case 'GET':
            const { id } = req.query;
            const group = await prisma.group.findMany({
                where: {
                    members: {
                        some: {
                            id: Number(id)
                        }
                    }
                },
                include: {
                    members: true
                }
            })
            return res.status(200).json(group);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}