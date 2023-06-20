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
import { activeGroupAtom, activeUserAtom, loggedInUserAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment/moment';
import { dateTimeShow } from '../../../utils/dateTimeshow';
import GroupMessageHeader from './components/GroupMessageHeader';

const GroupRightSide = ({ messages }) => {
    const [value, setValue] = useState('');
    const [showAttach, setShowAttach] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [activeGroup] = useAtom(activeGroupAtom)
    const oldMessages = useRef(messages?.length)
    const [meassagesList, setMeassagesList] = useState({})

    useEffect(() => {
        document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
    }, [])


    useEffect(() => {
        if (!activeGroup) return
        const datewiseMessages = {}
        messages?.forEach((message) => {
            const date = moment(message.createdAt).format('DD/MM/YYYY')
            if (datewiseMessages[date]) {
                datewiseMessages[date].push(message)
            } else {
                datewiseMessages[date] = [message]
            }
        })
        setMeassagesList(datewiseMessages)
        if (oldMessages?.current < messages?.length) {
            const scroll = setTimeout(() => {
                document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
                oldMessages.current = messages.length
            }, 1000)
        }

        return (() => {
            clearTimeout(scroll)
        })

    }, [activeGroup, messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!value) return
        //smooth scroll to bottom
        document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
        axios.post('/api/messages/group/', {
            senderId: loggedInUser.id,
            groupId: activeGroup.id,
            text: value
        }).then(res => {
            setValue('')
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <div className='bg-white rounded-lg '>
            <GroupMessageHeader />
            <div className='sm:p-10 p-1'>
                <div className='h-[400px] overflow-auto px-2' id="msg-body">
                    {
                        Object.entries(meassagesList).map(([date, messages]) => (
                            <>

                                <div className='flex justify-center items-center'>
                                    <div className='text-gray-500 text-sm'>
                                        {
                                            dateTimeShow(date)
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
                                                        <div className='text-sm font-bold flex items-center gap-1'>
                                                            <Avatar className='w-5 h-5 text-sm' sx={{ background: '#D1D5DB', color: '#6B7280' }}>
                                                                {message.sender?.name[0]}
                                                            </Avatar>
                                                            {message.sender?.name}</div>
                                                        <div className='text-sm mt-3'>{message.text}</div>
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

export default GroupRightSide