/* eslint-disable @next/next/no-img-element */
import { Avatar, Menu, MenuItem } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { activeUserAtom, pinnedUserAtom, setPinnedUserAtom } from '@jotai/chat';
import { useAtom } from 'jotai';
import { removePinnedUserAtom } from '@jotai/chat';

const MessageHeader = () => {
    const [activeUser] = useAtom(activeUserAtom)
    const [, setPinUser] = useAtom(setPinnedUserAtom)
    const [, removePinUser] = useAtom(removePinnedUserAtom)
    const [pinnedUsers] = useAtom(pinnedUserAtom)

    const onPinClick = (popupState) => {
        isActiveUserPinned ? removePinUser(activeUser) :
            setPinUser(activeUser)
        popupState.close()
    }

    const isActiveUserPinned = pinnedUsers?.find(p => p.id === activeUser?.id)

    return (
        <>
            <div className='shadow-sm rounded-lg rounded-bl-none rounded-br-none'>
                <div className='grid grid-cols-3 p-5 '>
                    <div>
                        <Avatar alt="Travis Howard" />
                    </div>
                    <div className='text-center'>
                        <div className="font-semibold">{activeUser?.name}</div>
                        <div className="text-gray-500 text-sm">Active 3m ago</div>
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