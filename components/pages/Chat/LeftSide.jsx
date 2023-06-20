/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import ChatItem from './components/ChatItem'
import { activeUserAtom, loggedInUserAtom, pinnedUserAtom, setActiveGroupAtom, setActiveUserAtom } from '@jotai/chat'
import { useAtom, useSetAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add';
import { useModalState, useSetModal } from '@jotai/modal';
import UserListModal from './components/UserListModal';
import { modalKeys } from '@common/modals/modalKeys';
import axios from 'axios';
import GroupItem from './components/GroupItem';


const LeftSide = ({ users, groups, groupMessages, filteredMessages, setActiveClick, onGroupActiveClick }) => {
    const [activeUser] = useAtom(activeUserAtom)
    const setActiveUser = useSetAtom(setActiveUserAtom)
    const setActiveGroup = useSetAtom(setActiveGroupAtom)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [pinnedUsers] = useAtom(pinnedUserAtom)
    const [unpinnedUsers, setUnpinnedUsers] = useState([])
    const openCloseModal = useSetModal()
    const modalVal = useModalState(modalKeys.userlist)

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

    const onActiveClick = (user) => {
        setActiveUser(user)
        setActiveGroup(null)
        setActiveClick(true)
    }

    const onGroupClick = (group) => {
        setActiveUser(null)
        setActiveGroup(group)
        onGroupActiveClick(group)
    }

    const checkActiveUser = searchUsers.find(u => u.id === activeUser?.id)

    return (
        <div className='bg-white rounded-lg py-10 min-h-[75vh] relative'>
            <div className="pb-2">
                <div className="text-lg font-semibold uppercase px-10">Messages</div>
                <div className="my-5 mx-10 flex items-center relative">
                    <input type="text" value={search} placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' onChange={e => setSearch(e.target.value)} />

                    <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

                </div>
            </div>
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
                        <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user?.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => onActiveClick(user)}>
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
                        <li key={group?.id} className={`py-4 px-10 cursor-pointer ${group?.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => onGroupClick(group)}>
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
                        <li key={user?.chatId} className={`py-4 px-10 cursor-pointer ${user.chatId === activeUser?.chatId && 'bg-gray-100'}`} onClick={() => onActiveClick(user)}>
                            <ChatItem user={user} filteredMessages={filteredMessages?.[user?.chatId] || []} />
                        </li>
                    ))
                }
            </ul>
            <div className="absolute bottom-5 right-5">
                <div className="bg-primary rounded-full p-3 cursor-pointer" onClick={() => openCloseModal({
                    key: modalKeys.userlist,
                    status: true,
                })}>
                    <AddIcon className='text-white' />
                </div>
            </div>
            {
                modalVal?.status &&
                <UserListModal onActiveClick={onActiveClick} />
            }
        </div>
    )
}

export default LeftSide