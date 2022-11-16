import React, { useContext, useState } from 'react'
import "./NavBar.css";
import logoRed from './mflux-red.png'
import logoBlue from './mflux-sky.png'
import defaultAvatar from './avatar-default.png'
import { MoviePosting } from '../RowPost/RowPost'
import useResponsive from '../../Hooks/useResponsive';
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import Iconify from '../../Hooks/Iconify';
import BasicPopover from '../Popover';
import SignUp from '../Register';
import { UserSession } from '../../App';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';



function HomeNavBar() {
    const [toggle, setToggle] = useState(false)
    const [query, doQuery] = useState('')
    const [params, setParams] = useState()
    const [result, setResult] = useState(false)
    const isMobile = useResponsive('down', 'sm')
    // const {user} = useContext(UserSession)
    console.log(isMobile);
    const user = JSON.parse(sessionStorage.getItem('userSession'))
    // PopOver Controls //
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);
    const [loginPopover, setLoginPopOver] = useState(false)
    const route = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleScroll = () => {
        const recents = document.querySelector('#recents')
        recents.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const nav = () => {
        console.log(window.location);
        if (window.location.pathname === "/") {
            window.scroll(0, 0)
        } else {
            route('/')
        }
    }

    return (
        <div >
            <div className="navbar" >
                <Box className='pointer' onClick={nav} component="img"
                    sx={{
                        height: { xs: '2rem', sm: '2.5rem', lg: '3rem', xl: '3.5rem' },
                        width: { xs: '5rem', sm: '7rem', lg: '9rem', xl: '10rem' }
                    }}
                    alt="mFlux_Logo" src={logoRed} />
                <img onClick={(e) => setAnchorEl2(e.currentTarget)} alt="" className="avatar pointer"
                    src={user && user.photoURL ? user.photoURL : defaultAvatar} >
                </img><BasicPopover value={[anchorEl2, setAnchorEl2, setOpenPopover, setLoginPopOver]} />

                {!user && <SignUp value={[openPopover, setOpenPopover]} />}
                {!user && <Login value={[loginPopover, setLoginPopOver]} />}
                <div className="search-box">
                    <div>
                        {isMobile && <> <div>
                            <IconButton color='warning' variant="contained" onClick={handleClick}>
                                <Iconify icon='fluent:search-square-24-filled' width={34} height={34} />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}>
                                <div className="searchBg">
                                    <input maxLength={50} className='notosans search' value={query} placeholder='Search a Movie..'
                                        onChange={(e) => { doQuery(e.target.value) }} type="text" />
                                    <IconButton color='warning' onClick={() => { setParams(query); setResult(true) }} >
                                        <Iconify icon='fluent:search-square-24-filled' width={34} height={34} />
                                    </IconButton>
                                </div>
                            </Popover>
                        </div></>}
                        {!isMobile && <> <input maxLength={50} className='notosans search'
                            placeholder='Search a Title..' value={query}
                            onChange={(e) => { doQuery(e.target.value) }} type="text" />
                            <IconButton color='warning' onClick={() => { setParams(query); setResult(true) }} >
                                <Iconify icon='fluent:search-square-24-filled' width={34} height={34} />
                            </IconButton>
                        </>}
                    </div>
                </div>
            </div>
            {result ? <MoviePosting data={params} value={setResult} /> : <div></div>}
        </div>
    )
}
// export const getResult = searchResult
export default HomeNavBar;
