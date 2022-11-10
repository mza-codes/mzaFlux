import { Grid, Typography } from '@mui/material'
import { Container, Stack } from "@mui/system";
import logoRed from './NavBar/mflux-red.png'
// import { Alert } from "bootstrap";
import Alert from 'react-bootstrap/Alert';
import NavBar from './NavBar/NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../Constants/Constants';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function WishList() {

    const user = JSON.parse(sessionStorage.getItem('userSession'))

    const fetchData = () => {
        const values = {
            userId: user._id
        }
        axios.post(`${BACKEND_URL}/mflux/wishlist/view`,values).then((response) => {
            console.log('data Logging', response);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        if (user !== null || undefined) {
            fetchData()
        }

    }, [])


    return (
        <>
            <NavBar />
            <Container className='white' sx={{ mt: 3 }} >

                <Grid item container justifyContent='center'>
                    <Stack textAlign='center' direction='column' >
                        {/* <Typography className='voga' variant="subtitle1" gutterBottom> Your  Wishlist</Typography> */}
                        <h1 className="voga">Your Wishlist</h1>
                    </Stack>
                    <Grid item container xs={12}>
                        <Stack></Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}