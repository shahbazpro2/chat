/* eslint-disable @next/next/no-img-element */
import { Avatar, Menu, MenuItem } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { activeUserAtom, loggedInUserAtom, pinnedUserAtom, setPinnedUserAtom } from '@jotai/chat';
import { useAtom } from 'jotai';
import { removePinnedUserAtom } from '@jotai/chat';
import axios from 'axios';
import moment from 'moment';

const MessageHeader = () => {
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const [activeUser] = useAtom(activeUserAtom)
    const [, setPinUser] = useAtom(setPinnedUserAtom)
    const [, removePinUser] = useAtom(removePinnedUserAtom)
    const [pinnedUsers] = useAtom(pinnedUserAtom)

    const onPinClick = (popupState) => {
        if (isActiveUserPinned?.id) {
            axios.delete(`/api/users/pinned?id=${isActiveUserPinned?.id}`).then(res => {
                removePinUser(isActiveUserPinned)
            })
            return
        }
        axios.post('/api/users/pinned', {
            pinnedById: loggedInUser.id,
            pinnedId: activeUser.id
        }).then(res => {
            setPinUser(res.data)
        })

        popupState.close()
    }
    const isActiveUserPinned = pinnedUsers?.filter(p => p?.pinned?.id === activeUser?.id)?.[0]

    return (
        <>
            <div className='shadow-sm rounded-lg rounded-bl-none rounded-br-none'>
                <div className='grid grid-cols-3 p-5 '>
                    <div>
                        <Avatar alt="Travis Howard" />
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold capitalize">{activeUser?.name}</div>
                        <div className="text-gray-500 text-sm">
                            {/*Active 3m ago*/}
                            {
                                activeUser?.online ? 'Online' : moment(activeUser?.lastSeen).fromNow()
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
                                            <PushPinOutlinedIcon className='rotate-45' />&nbsp; {isActiveUserPinned ? 'Unpin Chat' : 'Pin Chat'}
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <VolumeOffOutlinedIcon />&nbsp; Mute Chat
                                        </MenuItem>
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