/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
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

const RightSide = ({ filteredMessages }) => {
    const [value, setValue] = useState('');
    const [showAttach, setShowAttach] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [activeUser] = useAtom(activeUserAtom)
    const [meassagesList, setMeassagesList] = useState([])

    useEffect(() => {
        if (!activeUser) return

        const filterMessages = filteredMessages.filter((message) => {
            return message.senderId === activeUser.id || message.receiverId === activeUser.id
        })
        setMeassagesList(filterMessages)

    }, [activeUser, filteredMessages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!value) return
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


    return (
        <div className='bg-white rounded-lg '>
            <MessageHeader />
            <div className='p-10 min-h-[500px]'>
                <div className='min-h-[500px]'>
                    <div className='flex justify-center items-center h-full'>
                        <div className='text-gray-500 text-sm'>18/20/2020</div>
                    </div>
                    <div className="space-y-2">

                        {
                            meassagesList.map((message, index) => (
                                message.senderId === loggedInUser.id ? (
                                    <div key={message.id} className='flex justify-end items-center h-full'>
                                        <div className='bg-primary text-white rounded-lg rounded-br-none p-3'>
                                            <div className='text-sm'>{message.text}</div>
                                            <div className="flex items-center justify-end mt-3 gap-[4px]">
                                                <div className='text-xs text-gray-300'>10:00</div>
                                                <div className='-mt-2'>.</div>
                                                <div className='text-xs text-gray-300'>Read</div>

                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div key={message.id} className='flex justify-start items-center h-full'>
                                        <div className='bg-gray-100 text-black rounded-lg rounded-tl-none p-3'>
                                            <div className='text-sm'>{message.text}</div>
                                            <div className='text-xs text-gray-500 mt-3'>10:00</div>
                                        </div>
                                    </div>
                                )))
                        }
                    </div>
                </div>

                <ClickAwayListener onClickAway={() => {
                    setShowAttach(false)
                    setShowEmoji(false)
                }}>
                    <div className='rounded-xl bg-gray-100 p-7 flex gap-3 relative mt-5'>
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

                        <Avatar className='mt-1' sx={{ background: '#D1D5DB', color: '#6B7280' }} onClick={() => {
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

export default RightSide