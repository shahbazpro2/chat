/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Header = () => {
    return (
        <div className='h-32 shadow px-20 py-5 flex items-center bg-white'>
            <img src='/assets/logo.png' alt='logo' className='h-14' />
        </div>
    )
}

export default Header