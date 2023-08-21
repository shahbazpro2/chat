/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@common/Header'
import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { useAtomValue, useSetAtom } from 'jotai'
import { activeChatAtom, loggedInUserAtom, pinnedUserAtom } from '@jotai/chat'
import axios from 'axios'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupRightSide from './GroupRightSide'
import UserListModal from './components/UserListModal'

const Chat = () => {
    const ref = useRef(true)
    const activeChat = useAtomValue(activeChatAtom)
    const setActiveChat = useSetAtom(activeChatAtom)
    const loggedInUser = useAtomValue(loggedInUserAtom)
    const setLoggedInUser = useSetAtom(loggedInUserAtom)
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [groups, setGroups] = useState([])
    const pinnedChat = useAtomValue(pinnedUserAtom)

    const firstMountRef = useRef(true)


    useEffect(() => {
        let groupInterval
        if (loggedInUser?.id) {
            getChats()
            groupInterval = setInterval(() => {
                getChats()
            }, 3000)

        }

        return () => {
            clearInterval(groupInterval)
        }
    }, [loggedInUser, activeChat])

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
        getMessages([...chats, ...groups])
        const messageInterval = setInterval(() => {
            getMessages([...chats, ...groups])
        }, 1000)

        return () => {
            clearInterval(messageInterval)
        }

    }, [loggedInUser, groups, chats])


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
                /*  axios.get(`/api/chat/pinned?id=${promptUser}`)
                     .then(res => {
                         setPinnedUsers(res.data)
                     }) */
            })
            .catch(err => console.log(err))

        return () => {
            ref.current = false
        }
    }, [])


    const getChats = () => {
        axios.get(`/api/chat?id=${loggedInUser?.id}`).then(res => {
            console.log('users', res.data)
            let singleChats = [], groupChats = []
            res.data.forEach(chat => {
                if (!chat.group) {
                    singleChats.push({
                        ...chat,
                        members: chat.members.filter(member => member.id !== loggedInUser?.id)
                    })
                } else {
                    groupChats.push({
                        ...chat,
                        members: chat.members.filter(member => member.id !== loggedInUser?.id)
                    })
                }
            })
            setChats(singleChats)
            setGroups(groupChats)
            /* if (activeUser || activeClick || !usersList.length || !firstMountRef) return
            setActiveUser(usersList?.[0])
            setActiveClick(true)
            firstMountRef.current = false */
        })
            .catch(err => {
                console.log(err)
            })
    }

    const getMessages = (chat) => {
        if (chat.length) {
            axios.get(`/api/messages/?ids=${chat.map(user => user.id).join(',')}`)
                .then(msgs => {
                    setMessages(msgs.data)
                })
                .catch(err => console.log(err))
        }
    }

    const onBackClick = () => {
        setActiveChat(null)
    }

    const onActiveClick = (chat, searchUsers) => {
        console.log('chat', chat)
        if (chat?.members) return setActiveChat(chat)
        const getChat = [...searchUsers, ...pinnedChat].filter(user => user?.members?.[0]?.id === chat?.id)
        if (getChat.length) return setActiveChat(getChat[0])

        setActiveChat({
            ...chat
        })

    }

    const LeftsideProps = {
        chats,
        groups,
        filteredMessages: messages,
        setActiveClick: onActiveClick,
    }


    return (
        <div>
            <div className="grid grid-cols-12 gap-2 xl:gap-7 p-3 sm:p-5 2xl:p-16" >
                <div className="col-span-12 block xl:hidden">
                    {
                        activeChat ?
                            <Button disableElevation variant="text" sx={{ fontSize: 18, fontWeight: 500 }} startIcon={<ArrowBackIcon />} onClick={onBackClick} >Users</Button> :
                            <LeftSide {...LeftsideProps} />
                    }
                </div>
                <div className="xl:col-span-4 2xl:col-span-3 hidden xl:block">
                    <LeftSide  {...LeftsideProps} />
                </div>
                <div className="xl:col-span-8 2xl:col-span-9 col-span-12">
                    {
                        (!activeChat?.group) &&
                        <RightSide filteredMessages={messages?.[activeChat?.id] || []} />
                    }
                    {
                        (activeChat?.group) &&
                        <GroupRightSide messages={messages?.[activeChat?.id] || []} />
                    }
                </div>
            </div>
            <UserListModal onActiveClick={onActiveClick} />
        </div>
    )
}

export default Chat