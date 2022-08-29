import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './App.css'
import './Components/RowPost/RowPost.css'
import { API_KEY, TMDB_URL } from './Constants/Constants'

function SearchResult(props) {
    const [items, setItem] = useState([])
    const [ytId, setYtId] = useState('')
    // useEffect(() => {
        console.log(props.value)
        axios.request(props.value).then((response) => {
            response.data.d.success = true
            console.log(response.data.d);
            setItem(response.data.d)
        }).catch((err) => {
            console.log(err)
        })

    // }, [])
    const ytPlayerConfig = {
        height: '720',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const trailerHandler = (id) => {
        console.log(id)
        axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log(response)
            if (response.data.results.length !== 0) {
                let j = Math.floor(Math.random() * response.data.results.length);
                console.log('printing j', j)
                setYtId(response.data.results[j])
                console.log(response.data.results[j])
            } else {
                alert('404 Not Found')
            }
        }).catch((err) => {
            alert('Error Fetching Data')
        })
    }
    return (
        <div className='row pd-1'>
            {items.map((data) => {
                if (data.success) {
                    return (
                        <div>
                            <h2 className='pd-1'>Search Results</h2>
                            <div className='posters'>
                                <div>
                                    <img onClick={() => { trailerHandler(data.id) }} className={props.small ? 'poster-small'
                                        : 'poster'} alt={data.title} srcSet={`${data.imageUrl ? data.imageUrl : ''}`} />
                                </div>
                            </div>
                        </div>
                    )
                }
            })}

            {ytId && <div className='p-custom'> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>}
        </div>
    )
}
// export const moviePosting = moviePost
export default SearchResult