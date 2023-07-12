/* eslint-disable @next/next/no-img-element */
import { Avatar, Badge, Menu, MenuItem } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { activeChatAtom, loggedInUserAtom, pinnedUserAtom, setActiveChatAtom, setPinnedUserAtom } from '@jotai/chat';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { removePinnedUserAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment';

const MessageHeader = () => {
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const activeChat = useAtomValue(activeChatAtom)
    const setActiveChat = useSetAtom(setActiveChatAtom)

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
                    <div>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color='success'
                            sx={{ '.MuiBadge-badge': { border: '1.5px solid #fff', minWidth: 10, height: 10, borderRadius: '100%' } }}
                            invisible={!activeChat?.members?.[0]?.online}
                        >

                            <Avatar alt={activeChat?.name || activeChat?.members?.[0]?.name} src='/test' />
                        </Badge>
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold capitalize">{activeChat?.name || activeChat?.members?.[0]?.name}</div>
                        <div className="text-gray-500 text-sm">
                            {/*Active 3m ago*/}
                            {
                                activeChat?.members ?
                                    activeChat?.members[0]?.online ? 'Online' : activeChat?.members?.[0]?.lastSeen ? `last seen ${moment(activeChat?.members?.[0]?.lastSeen).fromNow()}` : 'Offline' :
                                    activeChat?.online ??
                                        activeChat?.online ? 'Online' : activeChat?.lastSeen ? `last seen ${moment(activeChat?.lastSeen).fromNow()} ` : 'Offline'

                            }
                        </div>
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

export default MessageHeader