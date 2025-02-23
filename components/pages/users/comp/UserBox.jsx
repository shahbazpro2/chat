import { Avatar, Button } from '@mui/material'
import React, { useEffect } from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useRouter } from 'next/router';
import { openCloseModalAtom } from '@jotai/modal';
import { useSetAtom } from 'jotai';
import { detailModalKey } from '../UsersList';

export const matchColor = (matchValue) => {
    console.log('mar', matchValue < 50, matchValue)
    if (matchValue < 50) {
        return 'bg-error/20'
    }
    else if (matchValue < 80) {
        return 'bg-warning/20'
    }
    else {
        return 'bg-success/20'
    }
}



const UserBox = ({ user }) => {
    const openCloseModal = useSetAtom(openCloseModalAtom)
    const [matchValue, setMatchValue] = React.useState(0)
    const router = useRouter()

    useEffect(() => {
        const match = Math.floor(Math.random() * 100)
        setMatchValue(match)
    }, [])


    return (
        <div className="box cursor-pointer" onClick={() => openCloseModal({
            key: detailModalKey,
            status: true,
            data: {
                ...user,
                matchValue
            }
        })}>
            <div className="flex gap-2">
                <Avatar src={user.avatar} sx={{ width: 50, height: 50 }}>{user?.name}</Avatar>
                <div>
                    <div className="text-500 text-xs">{user?.username}</div>
                    <div className="text-lg font-bold">{user.name}</div>
                    <div className="text-sm">{user.jobTitle}</div>

                </div>
            </div>
            <div className="flex justify-between my-5 items-center">
                <div className={`rounded py-2 px-4 text-sm font-bold ${matchColor(matchValue)}`}>{matchValue}% match</div>
                <div className="flex gap-3">
                    <LinkedInIcon color="warning" className='text-2xl' />
                    <TwitterIcon color="warning" className='text-2xl' />
                    <InstagramIcon color="warning" className='text-2xl' />
                </div>
            </div>
            <ul className='text-gray-600 space-y-2 mt-7'>
                <li className='flex justify-between items-center'>
                    <div>Job Type</div>
                    <div className='text-black'>{user.jobType}</div>
                </li>
                <li className='flex justify-between items-center'>
                    <div>Age</div>
                    <div className='text-black'>{user.age} Years</div>
                </li>
                <li className='flex justify-between items-center'>
                    <div>Gender</div>
                    <div className='text-black'>{user.gender}</div>
                </li>
                <li className='flex justify-between items-center'>
                    <div>Money Range</div>
                    <div className='text-black'>{user.moneyRange}</div>
                </li>
            </ul>
            <div className="mt-7 flex flex-col xl:flex-row gap-2 xl:gap-5 justify-center">
                <Button disableElevation onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/users/${user.id}`)
                }} variant="outlined" className='capitalize font-bold'>Full Profile</Button>
                <Button disableElevation variant="contained" className='bg-primary px-10 capitalize font-bold' onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/chat/${user.id}`)
                }}>Chat</Button>

            </div>
        </div>
    )
}

export default UserBox