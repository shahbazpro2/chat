
export const loggedInUser = {
    id: 123,
    name: 'shahbaz'
}

export const users = [
    {
        id: 1,
        name: 'John Doe',
        online: true,
    },
    {
        id: 2,
        name: 'Tom Smith',
        online: false,
    },
    {
        id: 3,
        name: 'Tracy Jones',
        online: true,
    },
]

export const messages = [
    {
        id: 1,
        senderId: 1,
        receiverId: loggedInUser.id,
        text: 'Hello Tom',
        createdAt: new Date(2021, 0, 1, 9, 0),
    },
    {
        id: 2,
        senderId: 2,
        receiverId: 1,
        text: 'Hello John',
        createdAt: new Date(2021, 0, 1, 9, 1),
    },
    {
        id: 3,
        senderId: 1,
        receiverId: loggedInUser.id,
        text: 'How are you?',
        createdAt: new Date(2021, 0, 1, 9, 2),
    },
    {
        id: 4,
        senderId: 2,
        receiverId: 1,
        text: 'I am fine',
        createdAt: new Date(2021, 0, 1, 9, 3),
    },
    {
        id: 5,
        senderId: 3,
        receiverId: loggedInUser.id,
        text: 'How about you?',
        createdAt: new Date(2021, 0, 1, 9, 4),
    },
    {
        id: 5,
        senderId: 2,
        receiverId: loggedInUser.id,
        text: 'test',
        createdAt: new Date(2021, 0, 1, 9, 5),
    },
    {
        id: 6,
        senderId: loggedInUser.id,
        receiverId: 2,
        text: 'test',
        createdAt: new Date(2021, 0, 1, 9, 6),
    },
    {
        id: 7,
        senderId: loggedInUser.id,
        receiverId: 1,
        text: 'test',
        createdAt: new Date(2021, 0, 1, 9, 7),
    },

]

export const filteredMessages = messages.filter((m) => m.receiverId === loggedInUser.id || m.senderId === loggedInUser.id)