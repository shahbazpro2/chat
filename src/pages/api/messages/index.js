import { upload } from '@backend/utils/awsS3';
import { PrismaClient } from '@prisma/client'
import formidable from 'formidable';
const prisma = new PrismaClient()

export const config = {
    api: {
        bodyParser: false,

    },
};

const createMessage = async (req, res, newChatId) => {
    return new Promise((resolve, reject) => {
        upload.single('file')(req, res, async (err) => {
            const { text, senderId, receiverId, chatId } = req.body || {};
            if (!text && !req?.file?.location) {
                reject('No text or file provided')
                return
            }
            if (err) {
                //failed to upload file
                return reject(err);
            }

            if (Number(chatId)) {
                resolve(await prisma.message.create({
                    data: {
                        text: text || '',
                        file: req?.file?.location || null,
                        senderId: Number(senderId),
                        receiverId: Number(receiverId),
                        chatId: Number(chatId)
                    }
                }));

            } else {
                //create a new chat
                const newChat = await prisma.chat.create({
                    data: {
                        members: {
                            connect: [
                                { id: Number(senderId) },
                                { id: Number(receiverId) }
                            ]
                        }
                    }
                });
                resolve(await prisma.message.create({
                    data: {
                        text: text || '',
                        file: req?.file?.location || null,
                        senderId: Number(senderId),
                        receiverId: Number(receiverId),
                        chatId: newChat.id
                    }
                }));
            }

        });
    })

}

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            try {
                const message = await createMessage(req, res)
                return res.status(200).json(message);
            } catch (err) {
                return res.status(500).json({ error: err })
            }
        case 'GET':
            const { ids } = req.query;
            //split the ids into int and into an array
            const singleChats = ids?.split(',').map(id => parseInt(id));
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