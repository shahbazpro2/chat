/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { activeGroupAtom } from '@jotai/chat';
import { useAtom } from 'jotai';

const GroupMessageHeader = () => {
    const [activeGroup] = useAtom(activeGroupAtom)


    return (
        <>
            <div className='shadow-sm rounded-lg rounded-bl-none rounded-br-none'>
                <div className='grid grid-cols-3 p-5 '>
                    <div className='flex justify-start'>
                        <AvatarGroup max={3}>
                            {
                                activeGroup?.members?.map(member => {
                                    return (
                                        <Avatar key={member.id} alt={member.name} src='/test' />
                                    )
                                })
                            }
                        </AvatarGroup>
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold capitalize">{activeGroup?.title}</div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default GroupMessageHeader