import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { name, members, adminId } = req.body;
            const newGroup = await prisma.group.create({
                data: {
                    name,
                    adminId,
                    members: {
                        connect: members
                    }
                }
            });
            return res.status(201).json(newGroup);
        case 'GET':
            const { user } = req.query;
            //get all messages and filter using createdAt
            const groups = await prisma.group.findMany({
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    members: true
                },
                where: {
                    members: {
                        some: {
                            id: Number(user)
                        }
                    }
                }
            })
            return res.status(200).json(groups);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}