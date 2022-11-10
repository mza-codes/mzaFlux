import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from 'formik';
import { Box, Container } from '@mui/system';
import { Alert, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup'
import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import CustomInput from '../Hooks/CustomInput';
import Iconify from '../Hooks/Iconify';
import { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { UserSession } from '../App';
import { BACKEND_URL } from '../Constants/Constants';

export default function SignUp({ value }) {
    const [complete, setComplete] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [err, setErr] = useState('')
    // const { user, setUser } = useContext(UserSession)
    const [open, setOpen] = value

    const handleClose = () => {
        if (window.confirm('Entered Data Will be Lost! Continue ?')) {
            setOpen(false);
        }
    }

    const profileSchema = Yup.object().shape({
        name: Yup.string().min(5, 'Username too short').max(15, 'Username character exceeds')
            .required('Required Field').lowercase('Must be Lowercase'),
        email: Yup.string().email('Email must be a valid email address').required('Required Field').lowercase('Must be Lowercase'),
        password: Yup.string().min(6, 'Minimum 6 Characters Required').max(15, 'Max 12 Characters').required('Required Field')
            .required('Required Field'),
        country: Yup.string().min(3, 'Must be a minimum of 3 Characters').max(10, 'Must not exceed 10 Characters')
            .required('Required Field'),
        age: Yup.string().min(2, 'Age not Valid').max(2, 'Age not Valid').required('Required Field'),
    })

    // useEffect(() => {
    //   console.log('useEff cld hr');
    // }, [])
    const handleUpdate = async (values, actions) => {
        console.log('Updating User Data')
        console.log(values)
        const old = `${BACKEND_URL}/register`;
        const newURL = `${BACKEND_URL}/mFlux/auth/register`;
        
        await axios.post(newURL, values)
            .then((response) => {
                console.log('FETCHED RESPONSE :', response);
                console.log('USER sTATUS :', response.data);
                if (response.data.success) {
                    setErr(null)
                    setComplete(true)
                    setUpdated(true)
                    // setUser(response.data.user)
                    sessionStorage.setItem('userSession', JSON.stringify(response.data.data))
                    setTimeout(() => {
                        setComplete(false)
                        setOpen(false)
                    }, 2500);
                } else if (response.data.message && !response.data.success) {
                    console.log('ERROR ie email exists');
                    setErr(response.data.message)
                } else if (!response.data.success) {
                    setErr('Error Occured')
                    console.log('ERROR ie success=false');
                }else {
                    setErr(response.data.error)
                }
            }).catch((err) => {console.log(err);console.log('ERR CC');setErr(err?.response?.data?.error)})

    }
    return (
        <div>
            <Dialog open={open}>
                <div className="dialogBox">
                    <DialogActions className='bg-Dialog'>
                        <IconButton
                            onClick={handleClose}
                            color='error' > <Iconify icon='eva:close-square-fill' /> </IconButton>
                    </DialogActions>
                    <DialogContent className='bg-Dialog'>
                        <Container >
                            <Grid container item xs={12} direction='column' justifyContent='center' textAlign='center'
                                alignContent='center' alignItems='center' gap={1}>
                                <Grid item xs={12}>
                                    <p className="voga">Sign Up</p>
                                </Grid>

                                {/* FORM Content */}

                                <Formik initialValues={{
                                    name: '', email: '', password: '', country: '', age: ''
                                }}
                                    validationSchema={profileSchema} onSubmit={handleUpdate} >
                                    {props => (
                                        <Form spellCheck >
                                            {/* {console.log(props)} */}
                                            <Grid container item direction='row' textAlign='center' justifyContent='center' gap={2} >
                                                <CustomInput label='User Name' name='name' type='text'
                                                    variant="outlined" id="outlined-name" />
                                                <CustomInput label='E Mail' name='email' type='email'
                                                    variant="outlined" id="outlined-email" />
                                                <CustomInput label='Password' name='password' type='password'
                                                    variant="outlined" id="outlined-password" />
                                                <CustomInput label='Country' name='country' type='text' fullWidth
                                                    variant="outlined" id="outlined-country" />
                                                <CustomInput label='Age' name='age' type='number' fullWidth
                                                    variant="outlined" id="outlined-alt" />
                                                <Grid container item direction='column' alignItems='center' xs={12}
                                                    textAlign='center' justifyContent='center'>
                                                    {!complete && <LoadingButton sx={{ mb: 2 }} variant='contained'
                                                        type='submit' color={props.isValid ? 'success' : 'error'}
                                                        loading={props.isSubmitting} > <Iconify width={46} height={36}
                                                            icon='fluent:save-arrow-right-24-filled' /> </LoadingButton>}
                                                    <h5 className='errorText'>{err}</h5>
                                                    <IconButton
                                                        onClick={props.handleReset}
                                                        color='warning' > <Iconify icon='pajamas:clear-all' /> </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>

                                {/* Close FORM Content  */}

                            </Grid>
                        </Container>
                    </DialogContent>
                    <DialogActions className='bg-Dialog'>
                        {complete && <Alert variant='filled' sx={{ width: '100%', justifyContent: 'center' }} severity='success' >
                            User Login Success !</Alert>}
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
