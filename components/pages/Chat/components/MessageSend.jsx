import { ClickAwayListener } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, CircularProgress, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { activeChatAtom, loggedInUserAtom } from '@jotai/chat';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';

const MessageSend = ({ onAttachUpload, handleSendMessage, fileUploading, picUploading, messageSent, setMessageSent }) => {
    const [showAttach, setShowAttach] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [value, setValue] = useState('')
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const activeChat = useAtomValue(activeChatAtom)
    const attachRef = useRef(null)
    const picRef = useRef(null)

    useEffect(() => {
        if (messageSent) {
            setValue('')
            setShowAttach(false)
            setMessageSent(false)
        }

    }, [messageSent])


    const onFocusBlur = () => {
        if (!activeChat?.members && activeChat.group) return
        axios.post('/api/messages/read', {
            senderId: activeChat.members?.[0].id,
            chatId: activeChat.id
        }).catch(err => {
            console.log(err)
        })
    }

    return (
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
                            <Avatar sx={{ background: '#D1D5DB', color: '#6B7280', cursor: 'pointer' }} onClick={
                                () => picRef.current.click()
                            }>

                                {
                                    picUploading ? <CircularProgress size={20} /> : <InsertPhotoOutlinedIcon />
                                }

                                <input ref={picRef} accept="image/*" type="file" hidden InputLabelProps={{ shrink: true }} onChange={(e) => onAttachUpload(e, 'pic')} />
                            </Avatar>
                            <Avatar sx={{ background: '#D1D5DB', color: '#6B7280', cursor: 'pointer' }} onClick={
                                () => attachRef.current.click()
                            }>
                                {
                                    fileUploading ? <CircularProgress size={20} /> : <AttachFileOutlinedIcon />
                                }

                                <input ref={attachRef} accept=".pdf,.docx" type="file" hidden InputLabelProps={{ shrink: true }} onChange={(e) => onAttachUpload(e, 'file')} />
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
                    maxRows={3}
                    onChange={e => setValue(e.target.value)}
                    onFocus={onFocusBlur}
                    onBlur={onFocusBlur}
                />
                <div className="flex items-end">
                    <div className='bg-primary text-white rounded h-10 w-10 flex justify-center items-center mb-1 cursor-pointer' onClick={() => handleSendMessage(value)}>
                        <SendIcon />
                    </div>
                </div>

            </div>
        </ClickAwayListener>
    )
}

export default MessageSend