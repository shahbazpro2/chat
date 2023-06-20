import BasicModal from '@common/modals/BasicModal'
import { modalKeys } from '@common/modals/modalKeys'
import { activeUserAtom, loggedInUserAtom, setActiveUserAtom } from '@jotai/chat'
import { useSetModal } from '@jotai/modal'
import { Button, Checkbox, Divider, FormControlLabel, TextField } from '@mui/material'
import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import React, { memo, useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';

const UserListModal = ({ onActiveClick }) => {
    const [users, setUsers] = useState([])
    const [isSelecting, setIsSelecting] = useState(true)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [title, setTitle] = useState('')
    const openCloseModal = useSetModal()
    const [loggedInUser] = useAtom(loggedInUserAtom)

    useEffect(() => {
        axios.get('/api/users').then(res => {
            setUsers(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

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

        axios.post('/api/group', {
            title,
            members: [...selectedUsers, loggedInUser?.id]
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
            status: false
        })
        onActiveClick(user)
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

                {
                    users.map(u => (
                        u.id !== loggedInUser?.id &&
                        <>
                            <div key={u.id} className="flex items-start bg-gray-100 py-2 px-3">
                                {
                                    isSelecting &&
                                    <Checkbox size='small' checked={selectedUsers.includes(u.id)} onChange={(e) => onChange(e, u.id)} />
                                }
                                <div>
                                    <div className='font-bold'>{u.name}</div>
                                    <div>{u.email}</div>
                                </div>
                                <div className='ml-auto cursor-pointer' onClick={() => onSingleMessage(u)}>
                                    <MessageIcon />
                                </div>
                            </div>
                        </>
                    ))

                }
            </div>
        </BasicModal>
    )
}

export default memo(UserListModal)