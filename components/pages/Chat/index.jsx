import Header from '@common/Header'
import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { useAtom } from 'jotai'
import { loggedInUserAtom, setLoggedInUserAtom } from '@jotai/chat'
import axios from 'axios'

const Chat = () => {
    const ref = useRef(true)
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [, setLoggedInUser] = useAtom(setLoggedInUserAtom)
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (!loggedInUser) return
        const messageInterval = setInterval(() => {
            getMessages(loggedInUser?.id)
        }, 3000)

        return () => {
            clearInterval(messageInterval)
        }

    }, [loggedInUser])


    useEffect(() => {
        if (!ref.current) return
        const promptUser = prompt("Enter id of user")
        axios.get(`/api/users/${promptUser}`)
            .then(res => {
                axios.patch(`/api/users/${promptUser}`, { online: true })
                    .then(res => {
                        setLoggedInUser(res.data)
                    })
                    .catch(err => console.log(err))

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
                console.log('users', users)
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <Header />
            <div className="grid grid-cols-12 gap-7 p-16" >
                <div className="col-span-3">
                    <LeftSide users={users} filteredMessages={messages} />
                </div>
                <div className="col-span-9">
                    <RightSide filteredMessages={messages} />
                </div>
            </div>
        </div>
    )
}

export default Chat