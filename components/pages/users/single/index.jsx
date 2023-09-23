/* eslint-disable @next/next/no-img-element */
import { Avatar, Button, Tab, Tabs, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import WineBarIcon from '@mui/icons-material/WineBar';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import GroupIcon from '@mui/icons-material/Group';
import PetsIcon from '@mui/icons-material/Pets';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';
import { matchColor } from '../comp/UserBox';
import { users } from '../users';

const SingleUser = () => {
    const [matchValue, setMatchValue] = React.useState(0)
    const [value, setValue] = React.useState('0');
    const [user, setUser] = React.useState({})
    const isSmall = useMediaQuery('(max-width:800px)')
    const router = useRouter()
    const id = router.query?.id

    useEffect(() => {
        const user = users.find(user => user.id == id)
        setUser(user)
    }, [id])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const match = Math.floor(Math.random() * 100)
        setMatchValue(match)
    }, [])



    return (
        <div className='container text-gray-800'>
            <Button disableElevation onClick={() => router.push(`/`)} variant="text" className='underline' sx={{ fontSize: 16, fontWeight: 500 }} startIcon={<ArrowBackIcon />} >Back to dashboard</Button>
            <div className="space-y-2">
                <div>
                    <div className="rounded-xl"></div>
                    <div className="rounded-t-xl profile-cover mt-5">

                    </div>
                    <div className="bg-white grid grid-cols-6 py-5">
                        <div className="col-span-6 lg:col-span-1 text-center">
                            <div className="rounded-full bg-gray-300 w-32 h-32 mx-auto -mt-16 shadow-lg border-4 border-white">
                                <Avatar alt="" className="rounded-full w-full h-full object-cover" />
                            </div>
                            <div className="text-lg mt-3">{user?.username}</div>
                            <div className="text-lg text-gray-500">{user?.jobTitle}</div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 p-7 lg:p-0">
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="text-3xl font-bold text-gray-700">{user?.name}</div>
                                <div className={`rounded py-2 px-4 text-sm font-bold max-w-[120px] ${matchColor(matchValue)}`}>{matchValue}% match</div>
                            </div>
                            <div className="flex gap-10 mt-3 px-1">
                                {/*  <div className="">test@test.com</div> */}
                                <div className="flex gap-3">
                                    <LinkedInIcon color="warning" className='text-2xl' />
                                    <TwitterIcon color="warning" className='text-2xl' />
                                    <InstagramIcon color="warning" className='text-2xl' />
                                </div>
                            </div>
                            <div className="my-5 flex gap-20">
                                <div>
                                    <div className="text-primary">Location</div>
                                    <div className="text-gray-700">{user?.location}</div>
                                </div>
                                <div>
                                    <div className="text-primary">Age</div>
                                    <div className="text-gray-700">{user?.age} Years</div>
                                </div>

                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur...
                            </p>

                        </div>
                        <div className="col-span-12 lg:col-span-1">
                            <div className="flex flex-col lg:flex-col sm:flex-row 2xl:flex-row  justify-center lg:justify-start gap-2 items-center">
                                <Button disableElevation variant="contained" className='bg-primary px-10 capitalize font-bold' >Invite</Button>
                                <Button disableElevation onClick={() => router.push(`/chat`)} variant="outlined" className='capitalize font-bold px-10'>Chat</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <TabContext value={value}>
                    <div className="bg-white grid grid-cols-6 lg:pt-5 pb-5">
                        <div className="col-span-6 lg:col-span-1">

                            <TabList
                                orientation={isSmall ? "horizontal" : "vertical"}
                                variant="scrollable"
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                className='w-[80%]'
                                sx={{ borderLeft: 1, fontWeight: 700, borderColor: 'divider', '& .Mui-selected': { background: '#eaeaea', fontWeight: 'bold' }, '& .MuiTabs-indicator': { left: 0, width: 3 } }}
                            >
                                <Tab label="Personal" value='0' />
                                <Tab label="Property" value="1" />
                            </TabList>

                        </div>
                        <div className="col-span-6 lg:col-span-5">
                            <TabPanel value="0">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-5 text-gray-600 p-5">
                                        <div className="flex gap-2">
                                            <CakeIcon color="primary" />
                                            <div >25</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <WcIcon color="primary" />
                                            <div>{user?.gender}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <SelfImprovementIcon color="primary" />
                                            <div>Catholic</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <FavoriteBorderIcon color="primary" />
                                            <div>Single</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <BusinessCenterIcon color="primary" />
                                            <div>{user?.jobType}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <LanguageIcon color="primary" />
                                            <div>Black/Afican-American</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <SchoolIcon color="primary" />
                                            <div>University of Lagos</div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="text-lg font-bold">Social Habits</div>
                                        <div className="flex flex-wrap gap-5 mt-3 text-gray-600">
                                            <div className="flex gap-2 ">
                                                <SmokingRoomsIcon />
                                                <div>Never</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <WineBarIcon />
                                                <div>Sometimes</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <GroupIcon />
                                                <div>Often</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <PetsIcon />
                                                <div>No</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="rounded-lg p-5 shadow">
                                        <div className="text-lg font-bold">Preferences</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3 text-gray-600">
                                            <div>
                                                <div className='text-primary'>Money Range</div>
                                                <div>Never</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>#</div>
                                                <div>2</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Length of Stay</div>
                                                <div>Indefinite</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Date</div>
                                                <div>July 2023</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Age</div>
                                                <div>25-30</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Gender</div>
                                                <div>Male</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Text</div>
                                                <div>Text</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="rounded-lg p-5 shadow">
                                            <div className="text-xl font-bold">I traveled recently to...</div>
                                            <div className="mt-2">Barcelona</div>
                                        </div>
                                        <div className="rounded-lg p-5 shadow">
                                            <div className="text-xl font-bold">I decompress my day to day by...</div>
                                            <div className="mt-2">Netflix</div>
                                        </div>
                                        <div className="rounded-lg p-5 shadow">
                                            <div className="text-xl font-bold">I want a roommate relationship that is...</div>
                                            <div className="mt-2">Chill</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="sm:text-xl mb-4 font-bold mt-10 flex items-center gap-1"><InstagramIcon />Latest Posts @chrisbrown</div>
                                        <Swiper
                                            slidesPerView={isSmall ? 1 : 3}
                                            centeredSlides={false}
                                            spaceBetween={20}
                                            navigation={true}
                                            modules={[Pagination, Navigation]}
                                            className="h-52"
                                        >
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value="1">
                                <div className="space-y-7">
                                    <div>
                                        <div className="sm:text-xl mb-4 font-bold flex items-center gap-1">123 Main Street NE Washington, DC</div>
                                        <Swiper
                                            slidesPerView={isSmall ? 1 : 3}
                                            centeredSlides={false}
                                            spaceBetween={20}
                                            navigation={true}
                                            modules={[Pagination, Navigation]}
                                            className="h-52"
                                        >
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="rounded-lg overflow-hidden h-full">
                                                    <img src="/assets/insta.jpeg" alt="" className='w-full' />
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                    <div className="rounded-lg p-5 shadow">
                                        <div className="text-lg font-bold">Property Details</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3 text-gray-600">
                                            <div>
                                                <div className='text-primary'>Property Type</div>
                                                <div>House</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Monthly Rent</div>
                                                <div>$1,200</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Bedrooms</div>
                                                <div>3</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Bathrooms</div>
                                                <div>2.5</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Capacity</div>
                                                <div>3</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Utilities Included</div>
                                                <div>No</div>
                                            </div>
                                            <div>
                                                <div className='text-primary'>Lease Period</div>
                                                <div>August 2023 - Ongoing</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="rounded-lg p-5 shadow">
                                        <div className="text-lg font-bold">Amenities & Additional Information</div>
                                        <div className=" mt-3 text-gray-600">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                </TabContext>
            </div>
        </div>
    )
}

export default SingleUser