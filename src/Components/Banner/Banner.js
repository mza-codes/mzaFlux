import React, { useEffect, useState } from 'react'
import './Banner.css'
import { API_KEY, TMDB_URL, IMAGE_URL, POSTER_URL } from '../../Constants/Constants'
import { trending } from '../../url'
import axios from 'axios'
import YouTube from 'react-youtube'
import Iconify from '../../Hooks/Iconify'
import { IconButton } from '@mui/material'
import { useContext } from 'react'
import { Data } from '../../App'


const ytPlayerConfig = {
    height: '720',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
};
function allert() { alert('under Development') }
function Banner() {
    const [ytId, setYtId] = useState('')
    const [movie, setMovie] = useState()
    const {data,setData} = useContext(Data)
    function ytPlay(id) {
        console.log(id)
        axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            if (response.data.results.length !== 0) {
                let j = Math.floor(Math.random() * response.data.results.length);
                // console.log('printing j from banner', j)
                setYtId(response.data.results[j])
                // console.log(response.data.results[j])
            } else {
                alert('404 Not Found')
            }
        })
    }

    const fetchData = () => {
        console.log('fetchdata called');
        axios.get(trending).then((response) => {
            let results = response.data.results
            console.log('LOGGING AFTER LET');
            console.log(results)
            for (let i = 0; i <= results.length; i++) {
                if (results[i]?.original_title) {
                    console.log('Status OK')
                } else {
                    console.log('log from true inside');
                    if (results[i]?.name) {
                        results[i].original_title = results[i].name
                    } else if (results[i]?.original_name) {
                        results[i].original_title = results[i].original_name
                    }
                }
            }
            sessionStorage.setItem('trending', JSON.stringify(results))
            let j = Math.floor(Math.random() * results.length);
            console.log(j);
            setMovie(results[j])
            console.log('RESPONSE -->!! ')
            console.log(results);
            console.log('END');
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const data = sessionStorage.getItem('trending')
        if (data === null) {
            fetchData()
        } else {
            const array = JSON.parse(data)
            let j = Math.floor(Math.random() * array.length);
            console.log('sessionstorage found', j);
            setMovie(array[j])
        }
    }, [])

    const storeData = (data) => {
        setData(current => [...current, data])
    }

    return (
        <div>
            <div style={{ backgroundImage: `url(${movie ? POSTER_URL + movie.backdrop_path : ""})` }}
                className='banner'>
                <div className='content ' >
                    <h1 className='title'> {movie ? movie.original_title : "The Originals"} </h1>
                    <div className='banner_buttons' >
                        <button onClick={() => { ytPlay(movie && movie.id);storeData(movie) }} className='button' >Play</button>
                        <button onClick={allert} className='button' >My list</button>
                    </div>

                    <div className='description'>
                        <h1 className='description banner-data'> {movie ? movie.overview : "The Originals is a popular Movie released in 2019, telling the ..."} </h1>
                    </div>
                </div>
                <div className="fade_bottom"></div>
            </div>
            {ytId && <div className='pd-1'>
                <h1 className='pd-1' style={{ color: '#fff', textAlign: 'center' }}>Watch Trailer
                    <IconButton color='error' onClick={() => { setYtId(null) }}>
                        <Iconify icon='eva:close-square-fill' width={35} height={35} />
                    </IconButton></h1>

                <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>}
        </div>
    )

}

export default Banner
