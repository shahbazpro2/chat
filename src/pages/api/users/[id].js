
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            const userId = req.query.id;
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(userId),
                },
            });
            return res.status(200).json(user);
        case 'PATCH':
            const patchUser = await prisma.user.update({
                where: {
                    id: Number(req.query.id),
                },
                data: req.body,
            });
            return res.status(200).json(patchUser);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

