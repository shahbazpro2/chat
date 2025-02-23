/* eslint-disable @next/next/no-img-element */
import BasicModal from '@common/modals/BasicModal'
import { modalKeys } from '@common/modals/modalKeys'
import { activeUserAtom, loggedInUserAtom, setActiveUserAtom } from '@jotai/chat'
import { useModalState, useSetModal } from '@jotai/modal'
import { Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField } from '@mui/material'
import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import React, { memo, useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';

const UserListModal = ({ onActiveClick }) => {
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [isSelecting, setIsSelecting] = useState(true)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [title, setTitle] = useState('')
    const openCloseModal = useSetModal()
    const [search, setSearch] = useState('')
    const [loggedInUser] = useAtom(loggedInUserAtom)
    const modalVal = useModalState(modalKeys.userlist)

    useEffect(() => {
        //serach users
        const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
        setUsers(filteredUsers)
    }, [search])

    useEffect(() => {
        if (modalVal?.status)
            setUsersLoading(true)
        axios.get('/api/users').then(res => {
            setUsers(res.data)
            setAllUsers(res.data)
        })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                setUsersLoading(false)
            })
    }, [modalVal])

    const onChange = (e, id) => {
        const alreadySelected = selectedUsers.includes(id)
        if (e.target.checked && !alreadySelected) {
            setSelectedUsers(prev => [...prev, id])
        }
        else if (!e.target.checked && alreadySelected) {
            setSelectedUsers(prev => prev.filter(i => i !== id))
        }
    }

    const onCancelMake = () => {
        if (isSelecting) setSelectedUsers([])
        setIsSelecting(!isSelecting)
    }

    const onCreateGroup = () => {

        if (!title) return alert('Please enter a group title')
        if (selectedUsers.length < 2) return alert('Please select at least 2 users')

        axios.post('/api/chat', {
            title,
            members: [...selectedUsers, loggedInUser?.id],
            group: true
        }).then(res => {
            console.log(res.data)
            setSelectedUsers([])
            setIsSelecting(false)
            openCloseModal({
                key: modalKeys.userlist,
                status: false
            })
        })
            .catch(err => {
                console.log(err)
            })
    }

    const onSingleMessage = (user) => {
        openCloseModal({
            key: modalKeys.userlist,
            status: false,
            data: null
        })
        onActiveClick(user, modalVal?.data)
    }


    return (
        <BasicModal modalKey={modalKeys.userlist}>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <TextField size="small" label="Group Title" variant='outlined' value={title} onChange={e => setTitle(e.target.value)} />
                    {/*   <Button size="small" disableElevation variant='contained' className="bg-primary" onClick={onCancelMake}>{
                        isSelecting ? 'Cancel' : 'Make Group'
                    }</Button> */}
                    {
                        isSelecting &&
                        <Button size="small" disableElevation variant='contained' className="bg-primary" onClick={onCreateGroup}>Create</Button>
                    }

                </div>
                <div className="my-5  flex items-center relative">
                    <input type="text" value={search} placeholder='Search' className='bg-gray-100 pl-5 pr-12 py-3 w-full' onChange={e => setSearch(e.target.value)} />

                    <img src="/assets/search.png" alt="search" className='w-5 h-5 ml-2 absolute right-5' />

                </div>
                <div className="h-[40vh] overflow-y-auto">
                    {
                        usersLoading ?
                            <div className='flex justify-center items-center h-full'>
                                <CircularProgress />
                            </div>
                            :
                            users.map(u => (
                                u.id !== loggedInUser?.id &&
                                <>
                                    <div key={u.id} className="flex items-center bg-gray-100 py-2 px-3 my-3">
                                        <div className='flex gap-2 items-start'>
                                            {
                                                isSelecting &&
                                                <Checkbox size='small' checked={selectedUsers.includes(u.id)} onChange={(e) => onChange(e, u.id)} />
                                            }
                                            <div>
                                                <div className='font-bold'>{u.name}</div>
                                                <div>{u.email}</div>
                                            </div>
                                        </div>
                                        <Button size="small" variant='outlined' className='ml-auto cursor-pointer text-xs' onClick={() => onSingleMessage(u)}>
                                            Message
                                        </Button>
                                    </div>
                                </>
                            ))

                    }
                </div>

            </div>
        </BasicModal>
    )
}

export default memo(UserListModal)