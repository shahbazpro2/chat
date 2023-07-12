/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarGroup, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { activeChatAtom, activeGroupAtom, loggedInUserAtom, removePinnedUserAtom, setActiveChatAtom, setActiveGroupAtom, setPinnedUserAtom } from '@jotai/chat';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

const GroupMessageHeader = () => {
    const loggedInUser = useAtomValue(loggedInUserAtom)
    const activeChat = useAtomValue(activeChatAtom)
    const setActiveChat = useSetAtom(setActiveChatAtom)
    console.log('gorupacti', activeChat)

    const onPinClick = (popupState) => {
        axios.patch('/api/chat/pinned', {
            pinnedById: loggedInUser.id,
            chatId: activeChat.id,
            pin: activeChat?.isChatPinned ? false : true
        }).then(res => {
            setActiveChat({ ...activeChat, isChatPinned: !activeChat?.isChatPinned })
        }).catch(err => {
            console.log(err)
        })

        popupState.close()
    }

    return (
        <>
            <div className='shadow-sm rounded-lg rounded-bl-none rounded-br-none'>
                <div className='grid grid-cols-3 p-5 '>
                    <div className='flex justify-start'>
                        <AvatarGroup max={3} spacing="small">
                            {
                                activeChat?.members?.map(member => {
                                    return (
                                        <Avatar key={member.id} alt={member.name} src='/test' />
                                    )
                                })
                            }
                        </AvatarGroup>
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold capitalize">{activeChat?.title}</div>

                    </div>
                    <div className='flex justify-end items-center'>
                        <PopupState variant="popover" >
                            {(popupState) => (
                                <React.Fragment>
                                    <MoreHorizIcon {...bindTrigger(popupState)} className='cursor-pointer' />
                                    <Menu {...bindMenu(popupState)} anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}>
                                        <MenuItem onClick={() => onPinClick(popupState)}>
                                            <PushPinOutlinedIcon className='rotate-45' />&nbsp; {activeChat?.isChatPinned ? 'Unpin Chat' : 'Pin Chat'}
                                        </MenuItem>
                                        {/*  <MenuItem onClick={popupState.close}>
                                            <VolumeOffOutlinedIcon />&nbsp; Mute Chat
                                        </MenuItem> */}
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GroupMessageHeader