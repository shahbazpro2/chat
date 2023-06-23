/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@common/Header'
import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { useAtom, useSetAtom } from 'jotai'
import { activeGroupAtom, activeUserAtom, loggedInUserAtom, pinnedUserAtom, setActiveGroupAtom, setActiveUserAtom, setLoggedInUserAtom, setPinnedUserAtom, setPinnedUsersAtom } from '@jotai/chat'
import axios from 'axios'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupRightSide from './GroupRightSide'
import UserListModal from './components/UserListModal'

const Chat = () => {
    const ref = useRef(true)
    const [activeUser] = useAtom(activeUserAtom)
    const setActiveUser = useSetAtom(setActiveUserAtom)
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const setLoggedInUser = useSetAtom(setLoggedInUserAtom)
    const setPinnedUsers = useSetAtom(setPinnedUsersAtom)
    const setActiveGroup = useSetAtom(setActiveGroupAtom)
    const [activeGroup] = useAtom(activeGroupAtom)
    const [messages, setMessages] = useState([])
    const [groupMessages, setGroupMessages] = useState([])
    const [users, setUsers] = useState([])
    const [activeClick, setActiveClick] = useState(false)
    const [activeGroupClick, setActiveGroupClick] = useState(false)
    const [groups, setGroups] = useState([])

    const firstMountRef = useRef(true)

    useEffect(() => {
        let groupInterval
        if (loggedInUser?.id) {
            groupInterval = setInterval(() => {
                axios.get(`/api/group?id=${loggedInUser?.id}`).then(res => {
                    setGroups(res.data)
                })
                    .catch(err => {
                        console.log(err)
                    })
                axios.get(`/api/chat?id=${loggedInUser?.id}`).then(res => {
                    console.log('users', res.data)
                    let usersData = {}
                    res.data?.forEach(chat => {
                        chat?.members.forEach(member => {
                            if (member.id !== loggedInUser?.id) {
                                if (!usersData[chat.id]) usersData[chat.id] = {
                                    chatId: chat.id,
                                    ...member
                                }
                            }
                        })
                    })
                    const usersList = Object.values(usersData)
                    setUsers(usersList)
                    /* if (activeUser || activeClick || !usersList.length || !firstMountRef) return
                    setActiveUser(usersList?.[0])
                    setActiveClick(true)
                    firstMountRef.current = false */
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 3000)

        }

        return () => {
            clearInterval(groupInterval)
        }
    }, [loggedInUser, activeUser, activeClick])

    useEffect(() => {
        const handleBeforeUnload = async () => {
            localStorage.getItem('userId')
            console.log('beforeunload', loggedInUser)
            axios.patch(`/api/users/${loggedInUser?.id || localStorage.getItem('userId')}`, { online: false })
                .then(res => {
                    localStorage.removeItem('userId')
                }
                )
                .catch(err => console.log(err))
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (!loggedInUser) return
        const messageInterval = setInterval(() => {
            getMessages(users)
            getGroupMessages(groups)
            if (!activeUser || !activeClick) return
            /*   axios.get(`/api/users/${activeUser?.id}`)
                  .then(res => {
                      setActiveUser(res.data)
                  })
                  .catch(err => console.log(err)) */
        }, 1000)

        return () => {
            clearInterval(messageInterval)
        }

    }, [loggedInUser, activeClick, groups, users])


    useEffect(() => {
        if (!ref.current) return
        const promptUser = prompt("Enter id of user")
        localStorage.setItem('userId', promptUser)
        axios.get(`/api/users/${promptUser}`)
            .then(res => {
                axios.patch(`/api/users/${promptUser}`, { online: true })
                    .then(res => {
                        setLoggedInUser(res.data)
                    })
                    .catch(err => console.log(err))
                axios.get(`/api/chat/pinned?id=${promptUser}`)
                    .then(res => {
                        setPinnedUsers(res.data)
                    })
            })
            .catch(err => console.log(err))

        return () => {
            ref.current = false
        }
    }, [])

    const getMessages = (users) => {
        if (users.length) {

            axios.get(`/api/messages/?ids=${users.map(user => user.chatId).join(',')}`)
                .then(msgs => {
                    console.log('mmmmsgs', msgs.data)
                    setMessages(msgs.data)
                })
                .catch(err => console.log(err))
        }
    }

    const getGroupMessages = (groups) => {
        console.log('groups', groups)
        if (groups.length) {
            axios.get(`/api/messages/group?ids=${groups.map(group => group.id).join(',')}`)
                .then(msgs => {
                    setGroupMessages(msgs.data)
                })
                .catch(err => console.log(err))
        }
    }

    const onBackClick = () => {
        setActiveClick(false)
        setActiveGroupClick(false)
        setActiveUser(null)
    }

    const onActiveClick = (user, searchUsers) => {
        let chatId = user?.chatId || null
        if (!user?.chatId) {
            chatId = searchUsers.find(u => u.id === user.id)?.chatId

        }
        setActiveUser({
            ...user,
            chatId
        })
        setActiveGroupClick(false)
        setActiveClick(true)
        setActiveGroup(null)
    }

    const onGroupActiveClick = () => {
        setActiveClick(false)
        setActiveGroupClick(true)
    }


    return (
        <div>
            <Header />
            <div className="grid grid-cols-12 gap-2 xl:gap-7 p-3 sm:p-5 2xl:p-16" >
                <div className="col-span-12 block xl:hidden">
                    {
                        activeClick || activeGroupClick ?
                            <Button disableElevation variant="text" sx={{ fontSize: 18, fontWeight: 500 }} startIcon={<ArrowBackIcon />} onClick={onBackClick} >Users</Button> :
                            <LeftSide users={users} groups={groups} groupMessages={groupMessages} filteredMessages={messages} setActiveClick={onActiveClick} onGroupActiveClick={onGroupActiveClick} />
                    }
                </div>
                <div className="xl:col-span-4 2xl:col-span-3 hidden xl:block">
                    <LeftSide users={users} groups={groups} groupMessages={groupMessages} filteredMessages={messages} setActiveClick={onActiveClick} onGroupActiveClick={onGroupActiveClick} />
                </div>
                <div className="xl:col-span-8 2xl:col-span-9 col-span-12">
                    {
                        activeClick &&
                        <RightSide filteredMessages={messages?.[activeUser?.chatId] || []} />
                    }
                    {
                        activeGroupClick &&
                        <GroupRightSide messages={groupMessages?.[activeGroup?.id] || []} />
                    }
                </div>
            </div>
            <UserListModal onActiveClick={onActiveClick} />
        </div>
    )
}

export default Chat