/* eslint-disable @next/next/no-img-element */
import { Avatar, Badge } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChatItem from './components/ChatItem'
import { activeUserAtom, pinnedUserAtom, setActiveUserAtom } from '@jotai/chat'
import { useAtom } from 'jotai'


const LeftSide = ({ users, filteredMessages }) => {
    const [activeUser] = useAtom(activeUserAtom)
    const [, setActiveUser] = useAtom(setActiveUserAtom)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [pinnedUsers] = useAtom(pinnedUserAtom)
    const [unpinnedUsers, setUnpinnedUsers] = useState([])


    useEffect(() => {
        const filteredUsers = users?.filter(u => filteredMessages.find(m => {
            if (m.senderId === u.id && !pinnedUsers?.find(p => p.id === u.id)) {
                return true
            }
        })
        )

        setUnpinnedUsers(filteredUsers)

    }, [pinnedUsers, users, filteredMessages])

    useEffect(() => {
        if (!activeUser) {
            setActiveUser(unpinnedUsers[0])
        }
    }, [])

    useEffect(() => {
        setSearchUsers(unpinnedUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase())))
    }, [search, unpinnedUsers])

    return (
        <div className='bg-white rounded-lg py-10'>
            <div className="pb-2">
                <div className="text-lg font-semibold uppercase px-10">Messages</div>
                {
                    pinnedUsers?.length > 0 && (
                        <div className="my-3 font-medium px-10" >
                            Pinned Users
                        </div>
                    )
                }
                <ul>
                    {
                        pinnedUsers?.map((user) => (
                            <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => setActiveUser(user)}>
                                <ChatItem user={user} filteredMessages={filteredMessages} />
                            </li>
                        ))
                    }
                </ul>
                <div className="my-5 mx-10 flex items-center relative">
                    <input type="text" value={search} placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' onChange={e => setSearch(e.target.value)} />

                    <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

                </div>
            </div>
            <ul>
                {
                    searchUsers.map((user) => (
                        <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => setActiveUser(user)}>
                            <ChatItem user={user} filteredMessages={filteredMessages} />
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default LeftSide