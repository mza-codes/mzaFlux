import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { ListItem } from '@mui/material';
import axios from 'axios';
import { UserSession } from '../App';
import { useNavigate } from 'react-router-dom';

export default function BasicPopover({ value }) {
    // const {setUser} = React.useContext(UserSession)
    const [anchorEl, setAnchorEl, setPopup, setLoginPopup] = value
    const open = Boolean(anchorEl);
    const route = useNavigate()
    const id = open ? 'simple-popover' : undefined;
    // const { user } = React.useContext(UserSession)
    const user = JSON.parse(sessionStorage.getItem('userSession'))
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logoutSession = () => {
        sessionStorage.removeItem('userSession')
        // setUser(null)
        setTimeout(() => {
            setAnchorEl(null)
        }, 1000);

    }

    const handleScroll = () => {
        route('/recents')
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const lists = [
        <ListItem key='login' onClick={() => { setLoginPopup(true) }} divider button className='pointer'>Login</ListItem>,
        <ListItem key='recents' onClick={handleScroll} divider button className='pointer'>Recents</ListItem>,
        <ListItem key='signup' divider onClick={() => setPopup(true)} button className='pointer'>SignUp</ListItem>,
    ]

    const list2 = [
        <ListItem key='login' onClick={() => route('/account')} divider button className='pointer'>Account</ListItem>,
        <ListItem key='view' onClick={() => route('/view')} divider button className='pointer'>View</ListItem>,
        <ListItem key='recents' onClick={handleScroll} divider button className='pointer'>Recents</ListItem>,
        <ListItem key='logout' divider onClick={logoutSession} button className='pointer'>Logout</ListItem>,
    ]

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                sx={{ mt: 1 }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Box
                    sx={{ display: 'flex', '& > *': {} }} >
                    < ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text" >
                        {user ? list2 : lists}
                    </ButtonGroup>
                </Box>
            </Popover>
        </div >
    );
}

