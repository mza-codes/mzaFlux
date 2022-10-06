import React, { useContext, useState } from 'react'
import "./NavBar.css";
import logoRed from './mflux-red.png'
import logoBlue from './mflux-sky.png'
import defaultAvatar from './avatar-default.png'
import { MoviePosting } from '../RowPost/RowPost'
import useResponsive from '../../Hooks/useResponsive';
import { Button, IconButton, Popover, TextField, Typography } from '@mui/material';
import Iconify from '../../Hooks/Iconify';
import BasicPopover from '../Popover';
import SignUp from '../Register';
import { UserSession } from '../../App';



function NavBar() {
    const [toggle, setToggle] = useState(false)
    const [query, doQuery] = useState('')
    const [params, setParams] = useState()
    const [result, setResult] = useState(false)
    const isMobile = useResponsive('down', 'sm')
    console.log(isMobile);

    // PopOver Controls //
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [openPopover, setOpenPopover] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // Close PopOver Controls //

    // const [search, doSearch] = useState(false)
    // useEffect(() => {
    // function DoSearch(value) {
    //     useEffect(() => {
    //         const options = {
    //             method: 'GET',
    //             url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
    //             params: { q: value },
    //             headers: {
    //                 'X-RapidAPI-Key': 'IMDB_API_KEY', //key disabled as it is sending request in a loop fix issue/use another method
    //                 'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    //             }
    //         }
    //         setParams(options)
    //     }, [params])
    // }

    // }, [result])

    const handleScroll = () => {
        const recents = document.querySelector('#recents')
        recents.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    const {user} = useContext(UserSession)

    return (
        <div>
            <div className="navbar" >
                <img src={logoRed} alt="" className="logo" onClick={() => window.scroll(0, 0)} />

                {/* <img onClick={(e)=> setAnchorEl2(e.currentTarget)} src={logoBlue} alt="" className="logo pointer" /> */}
                <img onClick={(e) => setAnchorEl2(e.currentTarget)} src={defaultAvatar} alt="" className="avatar pointer" >
                </img><BasicPopover value={[anchorEl2, setAnchorEl2, setOpenPopover]} />

                {!user && <SignUp value={[openPopover, setOpenPopover]} />}

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
                                <input className='search' value={query} onChange={(e) => { doQuery(e.target.value) }} type="text" />
                                <IconButton color='warning' onClick={() => { setParams(query); setResult(true) }} >
                                    <Iconify icon='fluent:search-square-24-filled' width={34} height={34} /> </IconButton>
                            </Popover>
                        </div></>}
                        {!isMobile && <><input className='search' placeholder='Enter Movie Name' value={query} onChange={(e) => { doQuery(e.target.value) }} type="text" />
                            <IconButton color='warning' onClick={() => { setParams(query); setResult(true) }} >
                                <Iconify icon='fluent:search-square-24-filled' width={34} height={34} /> </IconButton> </>}
                    </div>
                </div>
            </div>
            {result ? <MoviePosting data={params} value={setResult} /> : <div></div>}
        </div>
    )
}
// export const getResult = searchResult
export default NavBar
