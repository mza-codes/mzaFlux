import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useContext, useState } from "react";
import YouTube from "react-youtube";
import { Data } from "../App";
import NavBar from "../Components/NavBar/NavBar";
import { API_KEY, POSTER_URL, TMDB_URL, w500 } from "../Constants/Constants";
import Iconify from "../Hooks/Iconify";
import useResponsive from "../Hooks/useResponsive";



export default function SingleView() {

    const { data, setData } = useContext(Data)
    const [movie, setMovie] = useState(null)
    const [ytId, setYtId] = useState('')
    const [ytHeight, setYTHeight] = useState('800')
    const isMobile = useResponsive('down', 'sm')
    const isMd = useResponsive('down', 'md')
    const isDesktop = useResponsive('up', 'lg')


    const ytPlayerConfig = {

        height: ytHeight,
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const viewTrailer = (id) => {
        console.log(id)
        axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log(response)
            if (response.data.results.length !== 0) {
                let j = Math.floor(Math.random() * response.data.results.length);
                console.log('printing j', j)
                setYtId(response.data.results[j])
                const page = document.querySelector('#single')
                page.style.overflow = ""
                const anchor = document.querySelector('#ytPlayer')
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                console.log(response.data.results[j])
            } else {
                alert('404 Not Found')
            }
        }).catch((err) => {
            err && alert('Error Fetching Data'); console.log('ERROR OCCURED', err);
        })
    };

    const fetchMovie = () => {
        if (data.length != 0) {
            console.log(data.length);
            let i = data.length - 1
            setMovie(data[i])
            console.log(movie);
        }
    }

    const disableScroll = () => {
        const page = document.querySelector('#single')
        page.style.overflow = "hidden"
        console.log('SCROLL DIABLE DSONE');
    }

    useEffect(() => {
        fetchMovie()
        // document.body.style.overflow = "hidden"
        const page = document.querySelector('#single')
        page.style.overflow = "hidden"
        console.log('SCROLL DIABLE DSONE');
        switch (isMobile) {
            case true:
                setYTHeight('360')
                break;
            case false:
                setYTHeight('800')
                break;
        }
    }, [isMobile, data])





    return (
        <>
            <div id='single' className="bg"
                style={{ backgroundImage: `url(${movie ? POSTER_URL + movie.backdrop_path : ""})` }}>
                <NavBar />
                <Grid className="white" my={2} container item direction='row' alignItems='flex-start' justifyContent='center'
                    textAlign='start' gap={1} >
                    <Grid item xs={12} id='recents' textAlign='center' >
                        {movie && <p className="glorius shadow">{movie.name || movie.original_title || ''}</p>}
                        {!data.length != 0 && <> <p className="glorius" style={{ color: 'red', paddingTop: '10px' }} >
                            There's Nothing to Show Here !</p> </>}
                    </Grid>

                    {movie && <div className="bg">
                        <Grid item xs={12}>
                        {<Box component='img' className="pointer singlePoster" onClick={() => { viewTrailer(movie.id) }}
                            sx={{height:{xs:'30vh',md:'inherit'}}} src={w500 + movie.poster_path} alt={movie.name} />}
                            {/* {<img className="pointer singlePoster" onClick={() => { viewTrailer(movie.id) }}
                                style={{ marginTop: '0.3rem' }} src={w500 + movie.poster_path} alt={movie.name} />} */}
                            <Box justifyContent='flex-end' >
                                <div className="description banner-data pad" >
                                    {/* <h4>{movie.name}</h4> <h4>{movie.original_title}</h4>*/}
                                    {movie.name && <Typography variant='h4' sx={{ fontWeight: 700 }}>
                                        {movie.name.toUpperCase()} </Typography>}
                                    <Typography variant='h4' sx={{ fontWeight: 600 }}> {movie.original_title} </Typography>
                                    <h4>{movie.overview}</h4>
                                    <h4>Release Date: {movie.release_date}</h4>
                                    <h6 style={{ marginTop: '0.5rem' }}>Rating of {movie.popularity} with
                                        vote count {movie.vote_count} and vote average of {movie.vote_average} as per TMDB </h6>
                                </div>
                            </Box>
                        </Grid>
                    </div>}

                    {ytId && <Grid item xs={12} >
                        <div className='background'>
                            <h1 className="glorius" style={{ textAlign: 'center', padding: '1rem' }}>Watch Trailer</h1>
                            <div className="overlayProfile">
                                <IconButton color='error' onClick={() => { setYtId(null); disableScroll() }}>
                                    <Iconify icon='eva:close-square-fill' width={35} height={35} />
                                </IconButton></div> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>
                    </Grid>}
                    <div id='ytPlayer'></div>
                </Grid>
                {/* </Container> */}
            </div></>
    )
}