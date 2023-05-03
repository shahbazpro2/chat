/* eslint-disable @next/next/no-img-element */
import { Avatar } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const MessageHeader = () => {
    return (
        <div className='grid grid-cols-3'>
            <div>
                <Avatar alt="Travis Howard" />
            </div>
            <div className='text-center'>
                <div className="font-semibold">Travis Howard</div>
                <div className="text-gray-500 text-sm">Active 3m ago</div>
            </div>
            <div className='flex justify-end items-center'>
                <MoreHorizIcon />
            </div>

        </div>
    )
}

export default MessageHeader