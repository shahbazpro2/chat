import { Avatar, Badge } from '@mui/material'
import React from 'react'

const ChatItem = () => {
    return (
        <div className='flex items-center justify-between cursor-pointer'>
            <div className="flex items-center">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color='success'
                    sx={{ '.MuiBadge-badge': { border: '1.5px solid #fff', minWidth: 10, height: 10, borderRadius: '100%' } }}
                >
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </Badge>
                <div className="ml-3 space-y-1">
                    <div className="font-semibold">Travis Howard</div>
                    <div className="text-gray-500 text-sm">Hey! How are you?</div>
                </div>
            </div>
            <div className='text-right'>
                <div className="text-gray-500 text-sm">3m ago</div>
                <Badge color="error" badgeContent={10} className='mr-4' />

            </div>

        </div>
    )
}

export default ChatItem