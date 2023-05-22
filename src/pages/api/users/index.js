import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { name, email } = req.body;
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            });
            return res.status(201).json(newUser);
        case 'GET':
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

