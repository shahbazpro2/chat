import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { pinnedById, pinnedId } = req.body;
            const newPinned = await prisma.pinnedUser.create({
                data: {
                    pinnedById,
                    pinnedId
                },
                include: {
                    pinned: true,
                    pinnedBy: true
                }
            });
            return res.status(201).json(newPinned);
        case 'GET':
            const user = req.query.id;
            const pinnedUsers = await prisma.pinnedUser.findMany({
                where: {
                    pinnedById: Number(user),
                },
                include: {
                    pinned: true,
                    pinnedBy: true
                }
            });
            return res.status(200).json(pinnedUsers);
        case 'DELETE':
            const id = req.query.id;
            const deletedPinned = await prisma.pinnedUser.delete({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json(deletedPinned);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }

}