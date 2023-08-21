/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/router';
const pages = [
    [<HomeIcon className='text-[25px]' />, '/'],
    [<GroupsIcon className='text-[30px]' />, '/users'],
    [<NotificationsIcon className='text-[25px]' />, '/notifications'],
    [<ChatIcon className='text-[25px]' />, '/chat']
]
const settings = [
    [<SettingsIcon />, 'My Account', '/'],
    [<LogoutIcon />, 'Logout', '/']
];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar elevation={0} position="static" sx={{ py: 2, background: 'white', px: { md: 7, xs: 2 } }}>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                    }}
                >
                    <img src='/assets/logo.png' alt='logo' className='h-14' />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: 'black' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map(([Icon, url]) => (
                            <MenuItem key={url}>
                                <div className='text-gray-800 hover:text-primary cursor-pointer group relative px-5 py-2 text-center'>
                                    {Icon}
                                </div>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                    }}
                >
                    <img src='/assets/logo.png' alt='logo' className='h-14' />
                </Typography>

                <Box className="flex items-center justify-end gap-14" sx={{ flexGrow: 1 }}>
                    <Box className="space-x-10" sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(([Icon, url]) => (
                            <Link href={url} key={url}>
                                <div className={`text-gray-800 hover:text-primary cursor-pointer group relative ${router.asPath === url && 'text-primary'}`}>
                                    {Icon}
                                    <div className={`w-full h-[3px] bg-primary mt-1 absolute  group-hover:block transition duration-75 ${router.asPath === url ? '' : 'hidden'}`}></div>
                                </div>
                            </Link>
                        ))}
                    </Box>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem disabled><Avatar alt="test" sx={{ width: 30, height: 30 }} />&nbsp;Test</MenuItem>
                        {settings.map(([Icon, title, url]) => (
                            <MenuItem key={title} onClick={handleCloseUserMenu}>
                                <div className='text-gray-800'>{Icon}&nbsp;{title}</div>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Header;