import React from 'react'
import Filters from './Filters'
import UsersList from './UsersList'
import { Drawer, MenuItem, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const Users = () => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    return (
        <div className="container">
            <div className='grid grid-cols-5 gap-7'>
                <div className="col-span-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex justify-end gap-3 ">
                        <div className=" bg-white 2xl:hidden py-2 px-4 rounded-lg border border-[#c4c4c4] flex items-center gap-2 cursor-pointer" onClick={setIsDrawerOpen}>
                            <FilterListIcon className='text-gray-600' />
                            <div className="text-base">Filter</div>
                        </div>
                        <Drawer
                            sx={{ '& .MuiDrawer-paper:focus-visible': { outline: 'none' } }}
                            anchor={'left'}
                            open={isDrawerOpen}
                            onClose={() => setIsDrawerOpen(false)}
                        >

                            <div className="p-4">
                                <div className="flex justify-between">
                                    <div className="text-lg font-bold">Filters</div>
                                    <CloseIcon className='cursor-pointer' onClick={() => setIsDrawerOpen(false)} />
                                </div>
                                <Filters isDrawer={isDrawerOpen} />

                            </div>
                        </Drawer>
                        <TextField size="small" variant="outlined" placeholder='Search handles' className='order-last md:order-first col-span-2' sx={{ '& .MuiOutlinedInput-root': { paddingRight: 0 }, '& .MuiOutlinedInput-root:focus-visible': { outline: 'none' } }} InputProps={{
                            startAdornment: <SearchIcon />,
                            /* endAdornment: <div className='bg-warning p-3 text-white rounded-r-lg '>Username</div> */
                        }} />
                        {/* <Select size="small" value="users" className='md:w-32'>
                            <MenuItem value="users">Users</MenuItem>
                            <MenuItem value="groups">Groups</MenuItem>
                        </Select> */}
                    </div>
                </div>
                <div className="col-span-1 hidden 2xl:block">
                    <div className="box">
                        <div className="text-lg font-bold">Filters</div>
                        <Filters />

                    </div>
                </div>
                <div className='col-span-5 2xl:col-span-4'>
                    <UsersList />
                </div>

            </div>
        </div>
    )
}

export default Users