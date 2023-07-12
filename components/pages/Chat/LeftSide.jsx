/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import ChatItem from './components/ChatItem'
import { activeChatAtom, activeGroupAtom, activeUserAtom, loggedInUserAtom, pinnedGroupAtom, pinnedUserAtom, setActiveChatAtom, setActiveGroupAtom } from '@jotai/chat'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add';
import { useModalState, useSetModal } from '@jotai/modal';
import UserListModal from './components/UserListModal';
import { modalKeys } from '@common/modals/modalKeys';
import axios from 'axios';
import GroupItem from './components/GroupItem';
import { Button } from '@mui/material';


const LeftSide = ({ chats, groups, filteredMessages, setActiveClick }) => {
    const activeChat = useAtomValue(activeChatAtom)
    const setActiveChat = useSetAtom(activeChatAtom)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const pinnedUsers = useAtomValue(pinnedUserAtom)
    const setPinnedChats = useSetAtom(pinnedUserAtom)
    const setGroupPinnedChats = useSetAtom(pinnedGroupAtom)
    const pinnedGroupChats = useAtomValue(pinnedGroupAtom)
    const [unpinnedUsers, setUnpinnedUsers] = useState([])
    const [unpinnedGroups, setUnpinnedGroups] = useState([])
    const openCloseModal = useSetModal()


    useEffect(() => {
        let unpinnedChats = [], pinnedChats = []
        chats.forEach(chat => {
            if (chat.isChatPinned) {
                pinnedChats.push(chat)
            } else {
                unpinnedChats.push(chat)
            }
        })
        setUnpinnedUsers(unpinnedChats)
        setPinnedChats(pinnedChats)
    }, [chats])

    useEffect(() => {
        let unpinnedGroupChats = [], pinnedGroupChats = []
        groups.forEach(chat => {
            if (chat.isChatPinned) {
                pinnedGroupChats.push(chat)
            } else {
                unpinnedGroupChats.push(chat)
            }
        })
        setUnpinnedGroups(unpinnedGroupChats)
        setGroupPinnedChats(pinnedGroupChats)
    }, [chats])

    useEffect(() => {
        if (!activeChat && (unpinnedUsers?.length > 0)) {
            setActiveChat(unpinnedUsers[0])
        }
    }, [unpinnedUsers])


    useEffect(() => {
        setSearchUsers(unpinnedUsers.filter(u => u?.members?.[0]?.name?.toLowerCase()?.includes(search.toLowerCase())))
        //setSearchUsers(users)
    }, [search, unpinnedUsers])


    console.log('gorup', searchUsers, pinnedUsers)
    const checkActiveUser = searchUsers.find(u => u.id === activeChat?.id)

    return (
        <div className='bg-white rounded-lg py-10 h-full relative'>
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
                    (pinnedUsers?.length > 0 || pinnedGroupChats?.length > 0) && (
                        <div className="my-3 font-bold px-10" >
                            Pinned
                        </div>
                    )
                }
                <ul>
                    {
                        pinnedGroupChats?.map((group) => (
                            <li key={group?.id} className={`py-4 px-10 cursor-pointer ${group?.id === activeChat?.id && 'bg-gray-100'}`} onClick={() => setActiveClick(group)}>
                                <GroupItem group={group} filteredMessages={filteredMessages?.[group?.id]} />
                            </li>
                        ))
                    }
                    {
                        pinnedUsers?.map((user) => (
                            <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user?.id === activeChat?.id && 'bg-gray-100'}`} onClick={() => setActiveClick(user)}>
                                <ChatItem user={user} filteredMessages={filteredMessages?.[user?.id] || []} />
                            </li>
                        ))
                    }
                </ul>
                {
                    unpinnedGroups?.length > 0 &&
                    <>
                        <div className="my-3 font-bold px-10" >
                            Groups
                        </div>
                        <ul>
                            {
                                unpinnedGroups?.map((group) => (
                                    <li key={group?.id} className={`py-4 px-10 cursor-pointer ${group?.id === activeChat?.id && 'bg-gray-100'}`} onClick={() => setActiveClick(group)}>
                                        <GroupItem group={group} filteredMessages={filteredMessages?.[group?.id]} />
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
                <div className="my-3 font-bold px-10" >
                    Chat
                </div>
                <ul>
                    {
                        ((!checkActiveUser && !search) && !activeChat?.group && !pinnedUsers?.find(p => p.id === activeChat?.id) && !activeChat?.members) && <li className='py-4 px-10 cursor-pointer bg-gray-100'>
                            <ChatItem user={activeChat} filteredMessages={filteredMessages?.[activeChat?.chatId] || []} />
                        </li>
                    }
                    {
                        searchUsers.map((user) => (
                            <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user.id === activeChat?.id && 'bg-gray-100'}`} onClick={() => setActiveClick(user)}>
                                <ChatItem user={user} filteredMessages={filteredMessages?.[user?.id] || []} />
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default LeftSide