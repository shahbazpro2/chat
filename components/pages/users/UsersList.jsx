import React, { useEffect } from 'react'
import UserBox from './comp/UserBox';
import { Pagination } from '@mui/material';
import { users } from './users'

const UsersList = () => {
    const [usersList, setUsersList] = React.useState([])
    const [page, setPage] = React.useState(1)

    useEffect(() => {
        //show 10 users per page
        const start = (page - 1) * 10
        const end = start + 10
        setUsersList(users.slice(start, end))
    }, [page])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
                {
                    usersList.map((user, index) => (
                        <UserBox key={user.id} user={user} />
                    ))
                }
            </div>
            <div className="flex justify-center mt-5">
                <Pagination color='warning' count={10} shape="rounded" className='mt-5' onChange={handleChangePage} />
            </div>
        </div>
    )
}

export default UsersList