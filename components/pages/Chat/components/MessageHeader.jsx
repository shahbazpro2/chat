/* eslint-disable @next/next/no-img-element */
import { Avatar, Menu, MenuItem } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { activeUserAtom, loggedInUserAtom, pinnedUserAtom, setPinnedUserAtom } from '@jotai/chat';
import { useAtom, useSetAtom } from 'jotai';
import { removePinnedUserAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment';

const MessageHeader = () => {
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [activeUser] = useAtom(activeUserAtom)
    const setPinUser = useSetAtom(setPinnedUserAtom)
    const removePinUser = useSetAtom(removePinnedUserAtom)
    const [pinnedUsers] = useAtom(pinnedUserAtom)
    const setActiveUser = useSetAtom(activeUserAtom)

    const onPinClick = (popupState) => {
        if (activeUser?.pinnedId) {
            axios.delete(`/api/chat/pinned?id=${activeUser?.pinnedId}`).then(res => {
                removePinUser(activeUser)
                setActiveUser({ ...activeUser, pinnedId: null })
            })
            return
        }
        axios.post('/api/chat/pinned', {
            pinnedById: loggedInUser.id,
            chatId: activeUser.chatId
        }).then(res => {
            setPinUser(res.data)
            setActiveUser(res.data)
        })

        popupState.close()
    }

    console.log('activeuser', pinnedUsers)

    return (
        <>
            <div className='shadow-sm rounded-lg rounded-bl-none rounded-br-none'>
                <div className='grid grid-cols-3 p-5 '>
                    <div>
                        <Avatar alt={activeUser?.name} src='/test' />
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold capitalize">{activeUser?.name}</div>
                        <div className="text-gray-500 text-sm">
                            {/*Active 3m ago*/}
                            {
                                activeUser?.online ? 'Online' : activeUser?.lastSeen ? moment(activeUser?.lastSeen).fromNow() : 'Offline'
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
                                            <PushPinOutlinedIcon className='rotate-45' />&nbsp; {activeUser?.pinnedId ? 'Unpin Chat' : 'Pin Chat'}
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