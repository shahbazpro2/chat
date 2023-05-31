/* eslint-disable react-hooks/exhaustive-deps */
import Header from '@common/Header'
import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { useAtom, useSetAtom } from 'jotai'
import { activeUserAtom, loggedInUserAtom, pinnedUserAtom, setActiveUserAtom, setLoggedInUserAtom, setPinnedUserAtom, setPinnedUsersAtom } from '@jotai/chat'
import axios from 'axios'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Chat = () => {
    const ref = useRef(true)
    const [activeUser] = useAtom(activeUserAtom)
    const setActiveUser = useSetAtom(setActiveUserAtom)
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const setLoggedInUser = useSetAtom(setLoggedInUserAtom)
    const setPinnedUsers = useSetAtom(setPinnedUsersAtom)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [activeClick, setActiveClick] = useState(false)
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
            getMessages(loggedInUser?.id)
            if (!activeUser || !activeClick) return
            axios.get(`/api/users/${activeUser?.id}`)
                .then(res => {
                    setActiveUser(res.data)
                })
                .catch(err => console.log(err))
        }, 3000)

        return () => {
            clearInterval(messageInterval)
        }

    }, [loggedInUser, activeClick])


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
                axios.get(`/api/users/pinned?id=${promptUser}`)
                    .then(res => {
                        setPinnedUsers(res.data)
                    })


                getMessages(promptUser)

            })
            .catch(err => console.log(err))

        return () => {
            ref.current = false
        }
    }, [])

    const getMessages = (id) => {
        axios.get(`/api/messages?user=${id}`)
            .then(msgs => {
                setMessages(msgs.data)
                let users = {}
                msgs.data.forEach(msg => {
                    if (!users[msg.senderId] && msg.senderId !== Number(id)) {
                        users[msg.senderId] = msg.sender
                    }
                })
                setUsers(Object.values(users))
            })
            .catch(err => console.log(err))
    }

    const onBackClick = () => {
        setActiveClick(false)
        setActiveUser(null)
    }



    return (
        <div>
            <Header />
            <div className="grid grid-cols-12 gap-2 xl:gap-7 p-3 sm:p-5 2xl:p-16" >
                <div className="col-span-12 block xl:hidden">
                    {
                        activeClick ?
                            <Button disableElevation variant="text" sx={{ fontSize: 18, fontWeight: 500 }} startIcon={<ArrowBackIcon />} onClick={onBackClick} >Users</Button> :
                            <LeftSide users={users} filteredMessages={messages} setActiveClick={setActiveClick} />
                    }
                </div>
                <div className="xl:col-span-4 2xl:col-span-3 hidden xl:block">
                    <LeftSide users={users} filteredMessages={messages} setActiveClick={setActiveClick} />
                </div>
                <div className="xl:col-span-8 2xl:col-span-9 col-span-12">
                    {
                        activeClick &&
                        <RightSide filteredMessages={messages} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat