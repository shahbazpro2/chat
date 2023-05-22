import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { pinnedBy, pinned } = req.body;
            const newPinned = await prisma.pinned.create({
                data: {
                    pinnedBy,
                    pinned
                },
            });
            return res.status(201).json(newPinned);
        case 'GET':
            const user = req.query.user;
            const pinnedUsers = await prisma.pinned.findMany({
                where: {
                    pinnedBy: Number(user),
                },
                include: {
                    user: true
                }
            });
            return res.status(200).json(pinnedUsers);
        case 'DELETE':
            const { pinnedId } = req.body;
            const deletedPinned = await prisma.pinned.delete({
                where: {
                    id: Number(pinnedId),
                },
            });
            return res.status(200).json(deletedPinned);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}