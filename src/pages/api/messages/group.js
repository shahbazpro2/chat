import { upload } from '@backend/utils/awsS3';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const config = {
    api: {
        bodyParser: false,

    },
};

const createMessage = async (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single('file')(req, res, async (err) => {
            const { text, senderId, groupId } = req.body || {};
            if (!text && !req?.file?.location) {
                reject('No text or file provided')
                return
            }
            if (err) {
                //failed to upload file
                return reject(err);
            }

            if (Number(groupId)) {
                resolve(await prisma.message.create({
                    data: {
                        text: text || '',
                        file: req?.file?.location || null,
                        senderId: Number(senderId),
                        groupId: Number(groupId),
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
            const groups = ids.split(',').map(id => parseInt(id));
            const group = await prisma.message.findMany({
                where: {
                    groupId: {
                        in: groups
                    }
                },
                orderBy: {
                    createdAt: 'asc'
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