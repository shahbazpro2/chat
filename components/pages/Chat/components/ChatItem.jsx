import { Avatar, Badge } from '@mui/material'
import moment from 'moment'
import React from 'react'

const ChatItem = ({ user, filteredMessages }) => {
    const { name, online } = user || {}
    console.log('filterere', filteredMessages)
    const senderMessages = filteredMessages.filter(message => message.senderId === user?.id).slice(-1)
    const unreadMessages = senderMessages.filter(message => !message.read).length

    console.log('senderMessages', senderMessages)

    return (
        <div className='flex items-center justify-between'>
            <div className="flex items-center">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color='success'
                    sx={{ '.MuiBadge-badge': { border: '1.5px solid #fff', minWidth: 10, height: 10, borderRadius: '100%' } }}
                    invisible={!online}
                >
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </Badge>
                <div className="ml-3 space-y-1">
                    <div className="font-semibold">{name}</div>
                    <div className="text-gray-500 text-sm">{senderMessages?.[0]?.text}</div>
                </div>
            </div>
            <div className='text-right'>
                <div className="text-gray-500 text-sm">
                    {
                        //make formate like 3m ago
                        moment(senderMessages?.[0]?.createdAt).fromNow()
                    }
                </div>
                <Badge color="error" badgeContent={unreadMessages} className='mr-4' />

            </div>

        </div>
    )
}

export default ChatItem