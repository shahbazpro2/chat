/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from 'react'
import MessageHeader from './components/MessageHeader'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { activeChatAtom, loggedInUserAtom, setActiveChatAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment/moment';
import { dateTimeShow } from '../../../utils/dateTimeshow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MessageSend from './components/MessageSend';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

const RightSide = ({ filteredMessages }) => {
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const activeChat = useAtomValue(activeChatAtom)
    const oldMessages = useRef(filteredMessages?.length)
    const [meassagesList, setMeassagesList] = useState({})
    const setActiveChat = useSetAtom(activeChatAtom)
    const [fileUploading, setFileUploading] = useState(false)
    const [picUploading, setPicUploading] = useState(false)
    const [messageSent, setMessageSent] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)

        }, 500)
    }, [activeChat])


    useEffect(() => {
        if (!activeChat) return
        const datewiseMessages = {}
        filteredMessages.forEach((message) => {
            const date = moment(message.createdAt).format('DD/MM/YYYY')
            if (datewiseMessages[date]) {
                datewiseMessages[date].push(message)
            } else {
                datewiseMessages[date] = [message]
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

    }, [activeChat, filteredMessages])

    const handleSendMessage = (value) => {
        if (!value) return
        setMessageLoading(true)
        const formData = new FormData()
        formData.append('senderId', loggedInUser.id)
        activeChat?.members ? formData.append('chatId', activeChat.id) : formData.append('receiverId', activeChat.id)
        formData.append('text', value)

        //smooth scroll to bottom
        document.getElementById('msg-body').scrollTo(0, document.getElementById('msg-body').scrollHeight)
        axios.post('/api/messages', formData).then(res => {
            setMessageSent(true)
            if (!activeChat?.members) {
                console.log('ccc', res.data)
                setActiveChat({ ...res.data })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setMessageLoading(false)
        }
        )

    }

    const onAttachUpload = (e, type) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('senderId', loggedInUser.id)
        activeChat?.members ? formData.append('chatId', activeChat.id) : formData.append('receiverId', activeChat.id)
        type === 'file' ?
            setFileUploading(true) : setPicUploading(true)
        axios.post('/api/messages', formData).then(res => {
            if (!activeChat?.members) {
                setActiveChat({ ...res.data })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setPicUploading(false)
            setFileUploading(false)
            setMessageSent(true)
        })
    }

    const onDownload = (file) => {
        window.open(file)
    }

    const renderFile = (file) => {
        if (!file) return
        const ext = file.split('.').pop()
        const allImagesExt = ['jpg', 'png', 'jpeg', 'gif']
        const allVideosExt = ['mp4', 'mkv', 'avi', 'webm']

        if (allImagesExt.includes(ext)) {
            return <Zoom>
                <img src={file} alt={file} className='w-[150px] object-cover' />

            </Zoom>
        } else if (allVideosExt.includes(ext)) {
            return <video src={file} controls className='w-full h-full object-cover' />
        } else {
            return <div className='cursor-pointer'>
                <InsertDriveFileIcon className='w-[50px] h-full object-cover' onClick={() => onDownload(file)} />
                <div className="text-sm">
                    {
                        file.split('/').pop()?.split('-').pop()
                    }
                </div>
            </div>
        }
    }

    return (
        <div className='bg-white rounded-lg '>
            <MessageHeader />
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
                                                        <div>{renderFile(message?.file)}</div>
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
                                                                    message?.read ? <DoneAllIcon color="success" sx={{ fontSize: 14 }} /> : <DoneIcon sx={{ fontSize: 14 }} />
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={message.id} className='flex justify-start items-center h-full'>
                                                    <div className='bg-gray-100 text-black rounded-lg rounded-tl-none p-3'>
                                                        <div>{renderFile(message?.file)}</div>
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

                <MessageSend handleSendMessage={handleSendMessage} onAttachUpload={onAttachUpload} picUploading={picUploading} fileUploading={fileUploading} messageSent={messageSent} setMessageSent={setMessageSent} messageLoading={messageLoading} />
            </div>

        </div >
    )
}

export default RightSide