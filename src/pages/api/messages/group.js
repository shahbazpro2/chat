import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { text, senderId, groupId, file } = req.body;

            const newMessage = await prisma.message.create({
                data: {
                    text,
                    file,
                    senderId,
                    groupId
                }
            });
            return res.status(201).json(newMessage);
        case 'GET':
            const { ids } = req.query;
            //split the ids into int and into an array
            const groups = ids.split(',').map(id => parseInt(id));
            const group = await prisma.message.findMany({
                where: {
                    groupId: {
                        in: groups
                    }
                },
                include: {
                    sender: true
                }
            })
            //seprate all the messages accourding to the group id
            const groupMessages = group?.reduce((acc, message) => {
                const { groupId } = message;
                if (!acc[groupId]) {
                    acc[groupId] = [];
                }
                acc[groupId].push(message);
                return acc;
            }, {});


            return res.status(200).json(groupMessages);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}