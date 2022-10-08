import { Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Breaker, Data } from "../App";
import { POSTER_URL, w500 } from "../Constants/Constants";
import * as _ from "lodash";
import './Banner/Banner.css'
import Iconify from "../Hooks/Iconify";
import { useContext } from "react";
import NavBar from "./NavBar/NavBar";

export default function Recent() {
    const { data, setData } = useContext(Data)
    const [err, setErr] = useState('')
    const [showErr, setShowErr] = useState(false)
    console.log(data);

    const sort = () => {
        let sorted = _.sortBy(data).reverse()
        setData(sorted)
        setTimeout(() => {
            let sorted = _.sortBy(data).reverse()
            setData(sorted)
        }, 7400);
    }

    useEffect(() => {
        if (data.length === 0) {
            console.log('data 0 no items');
            setErr('No Data To Display')
            setShowErr(true)
        }
        sort()
        setShowErr(false)
    }, [])

    return (
        <>
            <NavBar />
            <Grid className="white" my={2} container item direction='row' alignItems='flex-start' justifyContent='center'
                textAlign='start' gap={1} >
                <Grid item xs={12} id='recents' textAlign='center' >
                    <h1 className="glorius">Recent Activity</h1>
                    {data.length != 0 ? <> <Typography variant="subtitle2" color='green' gutterBottom>
                        You have viewed these recently ! </Typography>
                        <IconButton color='primary' onClick={sort} > <Iconify icon='bx:sort' width={34} height={34} /> </IconButton>
                    </> : <> <p className="glorius" style={{color:'red',paddingTop:'10px'}} >There's Nothing to Show Here !</p> </> }
                    {showErr && <Typography color='error' textAlign='center' variant="overline" gutterBottom> {err} </Typography>}
                </Grid>
                {data.map((movie, index) => {
                    return (
                        <div key={movie.id} className="bg"
                            style={{ backgroundImage: `url(${movie ? POSTER_URL + movie.backdrop_path : ""})` }}>
                            <Grid key={index} item xs={12} maxWidth='xl'>
                                <img style={{ marginTop: '0.3rem' }} src={w500 + movie.poster_path} alt={movie.name} />
                                <div className="description banner-data pad" >
                                    <h4>{movie.name}</h4>
                                    <h4>{movie.original_title}</h4>
                                    <h4>{movie.overview}</h4>
                                    <h4>Release Date: {movie.release_date}</h4>
                                    <h6 style={{ marginTop: '0.5rem' }}>Rating of {movie.popularity} with
                                        vote count {movie.vote_count} and vote average of {movie.vote_average} as per TMDB </h6>
                                </div>
                            </Grid>
                        </div>
                    )
                })}
                <Grid id='edit'> </Grid>
            </Grid>
        </>
    )
}
