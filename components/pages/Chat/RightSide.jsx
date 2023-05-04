/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import MessageHeader from './components/MessageHeader'
import { Avatar, Divider, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

const RightSide = () => {
    const [value, setValue] = useState('');
    const [showAttach, setShowAttach] = useState(false);

    function handleInputChange(event) {
        setValue(event.target.value);

        if (event.target.scrollHeight > 50) {
            event.target.style.height = event.target.scrollHeight + 'px';
        } else {
            event.target.style.height = '50px';
        }
    }
    return (
        <div className='bg-white rounded-lg '>
            <MessageHeader />
            <div className='p-10 min-h-[500px]'>
                <div className='min-h-[500px]'>
                    <div className='flex justify-center items-center h-full'>
                        <div className='text-gray-500 text-sm'>18/20/2020</div>
                    </div>

                    {/* show bubbles of both sides */}
                    <div className='flex justify-end items-center h-full'>
                        <div className='bg-primary text-white rounded-lg rounded-br-none p-3'>
                            <div className='text-sm'>K, i'm on my way</div>
                            {/*show time and read text*/}
                            <div className="flex items-center justify-end mt-3 gap-[4px]">
                                <div className='text-xs text-gray-300'>10:00</div>
                                <div className='-mt-2'>.</div>
                                <div className='text-xs text-gray-300'>Read</div>

                            </div>

                        </div>
                    </div>
                    <div className='flex justify-start items-center h-full'>
                        <div className='bg-gray-100 text-black rounded-lg rounded-tl-none p-3'>
                            <div className='text-sm'>Hello</div>
                            <div className='text-xs text-gray-500 mt-3'>10:00</div>
                        </div>
                    </div>



                </div>

                <div className='rounded-xl bg-gray-100 p-7 flex gap-3 relative'>
                    {showAttach &&
                        <div className='absolute space-y-3 -top-40 '>
                            <Avatar sx={{ background: '#D1D5DB', color: '#6B7280' }}>
                                <InsertPhotoOutlinedIcon />
                            </Avatar>
                            <Avatar sx={{ background: '#D1D5DB', color: '#6B7280' }}>
                                <AttachFileOutlinedIcon />
                            </Avatar>
                            <Avatar sx={{ background: '#D1D5DB', color: '#6B7280' }}>
                                <SentimentSatisfiedAltOutlinedIcon />
                            </Avatar>
                        </div>
                    }
                    <Avatar className='mt-1' sx={{ background: '#D1D5DB', color: '#6B7280' }} onClick={() => setShowAttach(!showAttach)}>
                        <AddIcon sx={{ fontSize: 25, cursor: 'pointer' }} />
                    </Avatar>
                    <textarea
                        className="resize-none overflow-hidden w-full h-[50px] py-2 px-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={value}
                        onChange={handleInputChange}
                    />
                    <div className="flex items-end">
                        <div className='bg-primary text-white rounded h-10 w-10 flex justify-center items-center mb-1'>
                            <SendIcon />
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default RightSide