/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import ChatItem from './components/ChatItem'
import { activeUserAtom, pinnedUserAtom, setActiveUserAtom } from '@jotai/chat'
import { useAtom } from 'jotai'
import AddIcon from '@mui/icons-material/Add';
import { useModalState, useSetModal } from '@jotai/modal';
import UserListModal from './components/UserListModal';
import { modalKeys } from '@common/modals/modalKeys';


const LeftSide = ({ users, filteredMessages, setActiveClick }) => {
    const [activeUser] = useAtom(activeUserAtom)
    const [, setActiveUser] = useAtom(setActiveUserAtom)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const [pinnedUsers] = useAtom(pinnedUserAtom)
    const [unpinnedUsers, setUnpinnedUsers] = useState([])
    const openCloseModal = useSetModal()
    const modalVal = useModalState(modalKeys.userlist)


    useEffect(() => {
        const filteredUsers = users?.filter(u => filteredMessages.find(m => {
            if (m.senderId === u.id && !pinnedUsers?.find(p => p?.pinned?.id === u.id)) {
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

    const onActiveClick = (user) => {
        setActiveUser(user)
        setActiveClick(true)
    }

    return (
        <div className='bg-white rounded-lg py-10 min-h-[75vh] relative'>
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
                            <li key={user?.pinned?.id} className={`py-4 px-10 cursor-pointer ${user?.pinned?.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => onActiveClick(user?.pinned)}>
                                <ChatItem user={user?.pinned} filteredMessages={filteredMessages} />
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
                        <li key={user?.id} className={`py-4 px-10 cursor-pointer ${user.id === activeUser?.id && 'bg-gray-100'}`} onClick={() => onActiveClick(user)}>
                            <ChatItem user={user} filteredMessages={filteredMessages} />
                        </li>
                    ))
                }
            </ul>
            <div className="absolute bottom-5 right-5">
                <div className="bg-primary rounded-full p-3 cursor-pointer">
                    <AddIcon className='text-white' onClick={() => openCloseModal({
                        key: modalKeys.userlist,
                        status: true,
                    })} />
                </div>
            </div>
            {
                modalVal?.status &&
                <UserListModal />
            }
        </div>
    )
}

export default LeftSide