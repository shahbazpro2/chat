import BasicModal from '@common/modals/BasicModal'
import { modalKeys } from '@common/modals/modalKeys'
import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material'
import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'

const UserListModal = () => {
    const [users, setUsers] = useState([])
    const [isSelecting, setIsSelecting] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])

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

    return (
        <BasicModal modalKey={modalKeys.userlist}>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Button size="small" disableElevation variant='contained' className="bg-primary" onClick={onCancelMake}>{
                        isSelecting ? 'Cancel' : 'Make Group'
                    }</Button>
                    {
                        isSelecting &&
                        <Button size="small" disableElevation variant='contained' className="bg-primary">Create</Button>
                    }

                </div>
                {
                    users.map(u => (
                        <>
                            <div key={u.id} className="flex items-start bg-gray-100 py-2 px-3 cursor-pointer">
                                {
                                    isSelecting &&
                                    <Checkbox size='small' checked={selectedUsers.includes(u.id)} onChange={(e) => onChange(e, u.id)} />
                                }
                                <div>
                                    <div className='font-bold'>{u.name}</div>
                                    <div>{u.email}</div>
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