import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { ListItem } from '@mui/material';
import axios from 'axios';
import { UserSession } from '../App';

export default function BasicPopover({ value }) {
    const {setUser} = React.useContext(UserSession)
    const [anchorEl, setAnchorEl, setPopup] = value

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logoutSession = () => {
        sessionStorage.removeItem('userSession')
        setUser(null)
        setTimeout(() => {
            setAnchorEl(null)
        }, 1000);
        
    }

    const handleScroll = () => {
        const recents = document.querySelector('#recents')
        recents.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
            setAnchorEl(null)
        }, 1000);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const { user } = React.useContext(UserSession)
    const handleProfile = async () => {
        console.log('handle profile called')
        handleClose()
        await axios.get('http://localhost:5000/profile')
            .then((response) => { console.log('GOT POST RESPONSE', response) })
            .catch((err) => console.log(err))
    }

    const lists = [
        <ListItem key='login' onClick={handleProfile} divider button className='pointer'>Login</ListItem>,
        <ListItem key='recents' onClick={handleScroll} divider button className='pointer'>Recents</ListItem>,
        <ListItem key='signup' divider onClick={() => setPopup(true)} button className='pointer'>SignUp</ListItem>,
    ]

    const list2 = [
        <ListItem key='login' onClick={handleProfile} divider button className='pointer'>Account</ListItem>,
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


// const buttons = [
//   <Button key="one">Account</Button>,
//   <Button key="two">Recent</Button>,
//   <Button key="three">SignUp</Button>,
// ];

// export function GroupOrientation() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         '& > *': {
//           m: 1,
//         },
//       }}
//     >
//       <ButtonGroup
//         orientation="vertical"
//         aria-label="vertical contained button group"
//         variant="contained"
//       >
//          {buttons}
//       </ButtonGroup>
//       <ButtonGroup
//         orientation="vertical"
//         aria-label="vertical contained button group"
//         variant="text"
//       >
//         {buttons}
//       </ButtonGroup>
//     </Box>
//   );
// }
