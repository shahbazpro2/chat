/* eslint-disable @next/next/no-img-element */
import { Avatar, Badge } from '@mui/material'
import React, { useEffect } from 'react'
import ChatItem from './components/ChatItem'
import { filteredMessages, users } from './data'
import { activeUserAtom, setActiveUserAtom } from '@jotai/chat'
import { useAtom } from 'jotai'


const LeftSide = () => {
    const [activeUser] = useAtom(activeUserAtom)
    const [, setActiveUser] = useAtom(setActiveUserAtom)
    const filteredUsers = users.filter(u => filteredMessages.find(m => m.senderId === u.id))

    useEffect(() => {
        if (!activeUser) {
            setActiveUser(filteredUsers[0])
        }
    }, [])

    return (
        <div className='bg-white rounded-lg py-10'>
            <div className="px-10 pb-2">
                <div className="text-lg font-semibold uppercase">Messages</div>
                <div className="my-5 flex items-center relative">
                    <input type="text" placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' />

                    <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

                </div>
            </div>
            <ul>
                {
                    filteredUsers.map((user) => (
                        <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => setActiveUser(user)}>
                            <ChatItem user={user} />
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default LeftSide