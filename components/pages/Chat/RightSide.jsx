/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react'
import MessageHeader from './components/MessageHeader'
import { Avatar, ClickAwayListener, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useAtom } from 'jotai';
import { activeUserAtom, loggedInUserAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment/moment';

const RightSide = ({ filteredMessages }) => {
    const [value, setValue] = useState('');
    const [showAttach, setShowAttach] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [activeUser] = useAtom(activeUserAtom)
    const oldMessages = useRef(filteredMessages.length)
    const [meassagesList, setMeassagesList] = useState({})

    useEffect(() => {
        document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
    }, [])


    useEffect(() => {
        if (!activeUser) return
        const datewiseMessages = {}
        filteredMessages.forEach((message) => {
            if (message.senderId === activeUser.id || message.receiverId === activeUser.id) {
                const date = moment(message.createdAt).format('DD/MM/YYYY')
                if (datewiseMessages[date]) {
                    datewiseMessages[date].push(message)
                } else {
                    datewiseMessages[date] = [message]
                }
            }
        })
        setMeassagesList(datewiseMessages)
        if (oldMessages.current < filteredMessages.length) {
            const scroll = setTimeout(() => {
                document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
                oldMessages.current = filteredMessages.length
            }, 1000)
        }

        return (() => {
            clearTimeout(scroll)
        })

    }, [activeUser, filteredMessages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!value) return
        //smooth scroll to bottom
        document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
        axios.post('/api/messages', {
            senderId: loggedInUser.id,
            receiverId: activeUser.id,
            text: value
        }).then(res => {
            setValue('')
        }).catch(err => {
            console.log(err)
        })
    }

    const onFocusBlur = () => {
        axios.post('/api/messages/read', {
            senderId: activeUser.id,
            receiverId: loggedInUser.id
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className='bg-white rounded-lg '>
            <MessageHeader />
            <div className='sm:p-10 p-1'>
                <div className='h-[500px] overflow-auto px-2' id="msg-body">
                    {
                        Object.entries(meassagesList).map(([date, messages]) => (
                            <>

                                <div className='flex justify-center items-center'>
                                    <div className='text-gray-500 text-sm'>
                                        {
                                            moment(date, 'DD/MM/YYYY').isSame(moment(), 'day') ? 'Today' : moment(date, 'DD/MM/YYYY').isSame(moment().subtract(1, 'days'), 'day') ? 'Yesterday' : moment(date, 'DD/MM/YYYY').isSame(moment(), 'week') ? moment(date, 'DD/MM/YYYY').format('dddd') : date
                                        }
                                    </div>
                                </div>
                                <div className="space-y-2" >

                                    {
                                        messages.map((message, index) => (
                                            message.senderId === loggedInUser.id ? (
                                                <div key={message.id} className='flex justify-end items-center h-full'>
                                                    <div className='bg-primary text-white rounded-lg rounded-br-none p-3'>
                                                        <div className='text-sm'>{message.text}</div>
                                                        <div className="flex items-center justify-end mt-3 gap-[4px]">
                                                            <div className='text-xs text-gray-300'>
                                                                {
                                                                    moment(message.createdAt).format('hh:mm a')
                                                                }
                                                            </div>
                                                            <div className='-mt-2'>.</div>
                                                            <div className='text-xs text-gray-300'>
                                                                {
                                                                    message?.read ? 'read' : 'sent'
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={message.id} className='flex justify-start items-center h-full'>
                                                    <div className='bg-gray-100 text-black rounded-lg rounded-tl-none p-3'>
                                                        <div className='text-sm'>{message.text}</div>
                                                        <div className='text-xs text-gray-500 mt-3'>
                                                            {
                                                                moment(message.createdAt).format('hh:mm a')
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )))
                                    }
                                </div>
                            </>
                        ))
                    }
                </div>

                <ClickAwayListener onClickAway={() => {
                    setShowAttach(false)
                    setShowEmoji(false)
                }}>
                    <div className='rounded-xl bg-gray-100 p-3 sm:p-7 flex gap-3 relative mt-5'>
                        <>

                            {
                                showEmoji && <div className='absolute -top-[450px] left-0'>
                                    <Picker data={data} onEmojiSelect={(emojiObject) => {
                                        setValue(value + emojiObject.native)
                                        setShowEmoji(false)
                                    }} />
                                </div>
                            }
                            {showAttach &&
                                <div className='absolute space-y-3 -top-40 '>
                                    <Avatar sx={{ background: '#D1D5DB', color: '#6B7280', cursor: 'pointer' }}>
                                        <InsertPhotoOutlinedIcon />
                                    </Avatar>
                                    <Avatar sx={{ background: '#D1D5DB', color: '#6B7280', cursor: 'pointer' }}>
                                        <AttachFileOutlinedIcon />
                                    </Avatar>
                                    <Avatar sx={{ background: '#D1D5DB', color: '#6B7280', cursor: 'pointer' }} onClick={
                                        () => {
                                            setShowEmoji(true)
                                            setShowAttach(false)
                                        }
                                    } >
                                        <SentimentSatisfiedAltOutlinedIcon />
                                    </Avatar>
                                </div>
                            }
                        </>

                        <Avatar className='mt-1' sx={{ background: '#D1D5DB', color: '#6B7280', width: 35, height: 35 }} onClick={() => {
                            setShowEmoji(false)
                            setShowAttach(!showAttach)
                        }}>
                            <AddIcon sx={{ fontSize: 25, cursor: 'pointer' }} />
                        </Avatar>
                        <TextField
                            value={value}
                            fullWidth
                            multiline
                            onChange={e => setValue(e.target.value)}
                            onFocus={onFocusBlur}
                            onBlur={onFocusBlur}
                        />
                        <div className="flex items-end">
                            <div className='bg-primary text-white rounded h-10 w-10 flex justify-center items-center mb-1 cursor-pointer' onClick={handleSendMessage}>
                                <SendIcon />
                            </div>
                        </div>

                    </div>
                </ClickAwayListener>
            </div>

        </div >
    )
}

export default RightSide