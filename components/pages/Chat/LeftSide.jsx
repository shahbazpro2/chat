/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import ChatItem from './components/ChatItem'
import { activeGroupAtom, activeUserAtom, loggedInUserAtom, pinnedUserAtom, setActiveGroupAtom, setActiveUserAtom } from '@jotai/chat'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add';
import { useModalState, useSetModal } from '@jotai/modal';
import UserListModal from './components/UserListModal';
import { modalKeys } from '@common/modals/modalKeys';
import axios from 'axios';
import GroupItem from './components/GroupItem';
import { Button } from '@mui/material';


const LeftSide = ({ users, groups, groupMessages, filteredMessages, setActiveClick, onGroupActiveClick }) => {
    const [activeUser] = useAtom(activeUserAtom)
    const setActiveUser = useSetAtom(setActiveUserAtom)
    const setActiveGroup = useSetAtom(setActiveGroupAtom)
    const activeGroup = useAtomValue(activeGroupAtom)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [pinnedUsers] = useAtom(pinnedUserAtom)
    const [unpinnedUsers, setUnpinnedUsers] = useState([])
    const openCloseModal = useSetModal()
    const modalVal = useModalState(modalKeys.userlist)

    console.log('moooo', modalVal)

    useEffect(() => {
        const filteredUsers = users.filter(u => !pinnedUsers.find(p => p.chatId === u.chatId))
        setUnpinnedUsers(filteredUsers)

    }, [pinnedUsers, users])

    useEffect(() => {
        if (!activeUser) {
            setActiveUser(unpinnedUsers[0])
        }
    }, [])


    useEffect(() => {
        setSearchUsers(unpinnedUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase())))
        //setSearchUsers(users)
    }, [search, unpinnedUsers, users])



    const onGroupClick = (group) => {
        setActiveUser(null)
        setActiveGroup(group)
        onGroupActiveClick(group)
    }

    console.log('gorup', activeGroup)
    const checkActiveUser = searchUsers.find(u => u.id === activeUser?.id)

    return (
        <div className='bg-white rounded-lg py-10 min-h-[75vh] relative'>
            <div className="pb-2">
                <div className="flex justify-between px-5">
                    <div className="text-lg font-semibold uppercase">Messages</div>
                    <div className="flex justify-end ">
                        <Button size="small" disableElevation variant='contained' startIcon={<AddIcon className='text-white' />} className="bg-primary rounded cursor-pointer" onClick={() => openCloseModal({
                            key: modalKeys.userlist,
                            status: true,
                            data: searchUsers
                        })}>
                            New Chat
                        </Button>
                    </div>
                </div>
                <div className="my-5 mx-5 flex items-center relative">
                    <input type="text" value={search} placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' onChange={e => setSearch(e.target.value)} />

                    <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

                </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
                {
                    pinnedUsers?.length > 0 && (
                        <div className="my-3 font-bold px-10" >
                            Pinned Users
                        </div>
                    )
                }
                <ul>
                    {
                        pinnedUsers?.map((user) => (
                            <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user?.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => setActiveClick(user)}>
                                <ChatItem user={user} filteredMessages={filteredMessages?.[user?.chatId] || []} />
                            </li>
                        ))
                    }
                </ul>
                <div className="my-3 font-bold px-10" >
                    Groups
                </div>
                <ul>
                    {
                        groups?.map((group) => (
                            <li key={group?.id} className={`py-4 px-10 cursor-pointer ${group?.id === activeGroup?.id && 'bg-gray-100'}`} onClick={() => onGroupClick(group)}>
                                <GroupItem group={group} filteredMessages={groupMessages?.[group?.id]} />
                            </li>
                        ))
                    }
                </ul>
                <div className="my-3 font-bold px-10" >
                    Chat
                </div>
                <ul>
                    {
                        ((!checkActiveUser && activeUser?.id) && !activeUser?.groupId) && !pinnedUsers?.find(p => p.id === activeUser?.id) && <li className='py-4 px-10 cursor-pointer bg-gray-100'>
                            <ChatItem user={activeUser} filteredMessages={filteredMessages?.[activeUser?.chatId] || []} />
                        </li>
                    }
                    {
                        searchUsers.map((user) => (
                            <li key={user?.chatId} className={`py-4 px-10 cursor-pointer ${user.chatId === activeUser?.chatId && 'bg-gray-100'}`} onClick={() => setActiveClick(user)}>
                                <ChatItem user={user} filteredMessages={filteredMessages?.[user?.chatId] || []} />
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default LeftSide