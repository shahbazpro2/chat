/* eslint-disable @next/next/no-img-element */
import { Avatar, Badge } from '@mui/material'
import React from 'react'
import ChatItem from './components/ChatItem'

const LeftSide = () => {
    return (
        <div className='bg-white rounded-lg p-10'>
            <div className="text-lg font-semibold uppercase">Messages</div>
            <div className="my-5 flex items-center relative">
                {/* make seach bar with right side search icon */}
                <input type="text" placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' />

                <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

            </div>
            <ul className='mt-10 space-y-7'>
                <li>
                    <ChatItem />

                </li>
                <li>
                    <ChatItem />

                </li>
            </ul>

        </div>
    )
}

export default LeftSide