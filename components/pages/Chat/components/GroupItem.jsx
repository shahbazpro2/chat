import { loggedInUserAtom } from '@jotai/chat'
import { Avatar, AvatarGroup, Badge } from '@mui/material'
import { useAtom } from 'jotai'
import moment from 'moment'
import React from 'react'

const GroupItem = ({ group, filteredMessages }) => {
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const { title, updatedAt } = group || {}
    const senderMessages = filteredMessages?.filter(message => (message.senderId !== loggedInUser?.id)).slice(-1)


    return (
        <div className='flex items-center justify-between'>
            <div className="flex items-center">
                <AvatarGroup max={2} spacing="small">
                    {
                        group?.members?.map(member => {
                            return (
                                <Avatar key={member.id} alt={member.name} src='/test' />
                            )
                        })
                    }
                </AvatarGroup>
                <div className="ml-3 space-y-1">
                    <div className={` capitalize`}>{title}</div>
                    <div className="text-gray-500 text-sm">{senderMessages?.[0]?.file ? 'Attachment' : senderMessages?.[0]?.text}</div>
                </div>
            </div>
            <div className='text-right'>
                <div className="text-gray-500 text-sm">
                    {
                        //make formate like 3m ago
                        moment(updatedAt).fromNow()
                    }
                </div>
                {/*   <Badge color="error" badgeContent={unreadMessages} className='mr-4' /> */}

            </div>

        </div>
    )
}

export default GroupItem