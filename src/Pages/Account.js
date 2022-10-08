import { Alert, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import defaultAvatar from "../Components/NavBar/avatar-default.png";
import Iconify from "../Hooks/Iconify";
import styled from "@emotion/styled";
import avatars from './Avatars.json'
import axios from "axios";
import { BACKEND_URL } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";


export const ProfileImg = styled('img')({
    top: 0,
    maxWidth: '150px',
    maxHeight: '150px',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    // position: 'absolute',
});

export default function Account() {
    // const [user,SetUser] = useState(null)
    const user = JSON.parse(sessionStorage.getItem('userSession'))
    const [img, setImg] = useState(user && user.photoURL ? user.photoURL : defaultAvatar)
    const route = useNavigate()
    const [show, setShow] = useState(
        {
            profile: false,
            complete: false
        })
    // useEffect(() => {
    //     const user = JSON.parse(sessionStorage.getItem('userSession'))
    //     SetUser(user)
    //     console.log('logiing user',user);
    // }, [])

    const handleUpdate = async () => {
        console.log(img);
        await axios.put(`${BACKEND_URL}/updateUser`, {
            photoURL: img,
            userId: user._id
        }).then(async (response) => {
            console.log('Fetched Response', response);
            await sessionStorage.removeItem('userSession')
            await sessionStorage.setItem('userSession', JSON.stringify(response.data.user))
            setShow({complete:true})
            setTimeout(() => {
                route('/')
            }, 2500);

        }).catch(err => console.log(err))
    }

    return (
        <>
            <NavBar />
            <Container className='white'>
                <Grid item container direction='row' justifyContent='center' textAlign='center' alignItems='center'>
                    <Stack textAlign='center'>
                        <h1 className="glorius">Your Account</h1>
                        {show.complete && <Alert severity="success" variant="filled">Update Complete !</Alert>}
                    </Stack>
                    <Grid item container direction='row' justifyContent='center' mt={2} textAlign='start' spacing={2}>
                        <Grid item container xs={12} md={6} direction='column' justifyContent='center' alignItems='center'>
                            <Typography variant="overline" textAlign='center' gutterBottom >Avatar</Typography>
                            <div className="background">
                                <ProfileImg src={img} alt='avatar' />
                                <div className="overlayProfile">
                                    <IconButton color='inherit' onClick={() => { setShow({ profile: !show.profile }) }}>
                                        <Iconify icon='uil:image-edit' width={25} height={25} />
                                    </IconButton>
                                </div>
                            </div>
                            {/* <Tooltip title='Confirm Avatar Update'></Tooltip> */}
                            <IconButton color="inherit" onClick={handleUpdate} >
                                <Iconify icon='charm:circle-tick' /> </IconButton>
                        </Grid>
                        <Grid item container xs={12} md={6} direction='column' justifyContent='center'
                            sx={{ textAlign: { xs: 'center' } }}>
                            <Typography variant="h5" gutterBottom >Name: {user.name}</Typography>
                            <Typography variant="h6" gutterBottom>{user.email}</Typography>
                            <Typography variant="body1" gutterBottom >Country: {user.country}</Typography>
                            <Typography variant="body1" gutterBottom >Join Date: {user.joinDate}</Typography>
                            <Typography variant="body1" gutterBottom >Age: {user.age}</Typography>
                        </Grid>

                        {show.profile && <div className="bord" style={{ marginTop: '1rem' }}>
                            <Grid item container xs={12} marginY={2} textAlign='center' justifyContent='center'>
                                <h6 className="voga">Choose An Avatar</h6>
                            </Grid>
                            <Grid gap={2} item container direction='row' xs={12} alignItems='center' justifyContent='center' >
                                {avatars.map((avatar, i) => {
                                    return (
                                        <Grid key={i} className="roboImg" onClick={() => setImg(avatar.url)} >
                                            <img src={avatar.url} alt={avatar.url} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>}
                        <Grid item container xs={12} mt={3}>
                            lov
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}