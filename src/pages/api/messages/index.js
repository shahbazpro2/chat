import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            const { text, senderId, receiverId, file, chatId } = req.body;
            if (chatId) {
                const message = await prisma.message.create({
                    data: {
                        text,
                        senderId,
                        receiverId,
                        chatId
                    }
                });
                return res.status(200).json(message);
            } else {
                const crateSingleChat = await prisma.chat.create({
                    data: {
                        members: {
                            connect: [
                                { id: senderId },
                                { id: receiverId }
                            ]
                        }
                    }
                });
                const message = await prisma.message.create({
                    data: {
                        text,
                        file,
                        senderId,
                        receiverId,
                        chatId: crateSingleChat.id
                    }
                });
                return res.status(200).json(message);
            }

        case 'GET':
            const { ids } = req.query;
            //split the ids into int and into an array
            const singleChats = ids.split(',').map(id => parseInt(id));
            //get all measseges according to single chats and sperate them according to the single chat id while querying
            const singleChat = await prisma.message.findMany({

                where: {
                    chatId: {
                        in: singleChats
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    sender: true,
                    receiver: true
                }
            })
            //seprate all the messages accourding to the single chat id
            const singleChatMessages = singleChat.reduce((acc, message) => {
                const { chatId } = message;
                if (!acc[chatId]) {
                    acc[chatId] = [];
                }
                acc[chatId].push(message);
                return acc;
            }, {});

            return res.status(200).json(singleChatMessages);
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}