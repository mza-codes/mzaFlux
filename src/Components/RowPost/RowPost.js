import React, { useState, useEffect } from 'react'
import './RowPost.css'
import axios from 'axios'
import defImage from './default-poster.jpg';
import { trending } from '../../url'
import { API_KEY, IMDB_API_KEY, POSTER_URL, TMDB_URL, w500 } from '../../Constants/Constants'
import YouTube from 'react-youtube';
// alt={data.original_title}



function MoviePost(props) {
    const [search, setSearch] = useState(false)
    const [searchItems, setResult] = useState([])
    const [ytId, setYtId] = useState('')
    useEffect(() => {
        console.log('fnc MOVIE POST LOGging PROPS')
        console.log(props);
        // --------------- TMDB REQUEST -----------------------
        // ${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}&page=1&include_adult=false
        axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}`).then((response)=>{
            console.log(response.data.results)
            console.log(response.data)
            setResult(response.data)
            setSearch(true)
        }).catch((err)=>console.log(err))
        // --------------- TMDB REQUEST END---------------------
        // --------------- IMDB REQUEST -------------------
        // const options = {
        //     method: 'GET',
        //     url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
        //     params: { q: props.data },
        //     headers: {
        //         'X-RapidAPI-Key': IMDB_API_KEY, //key disabled as it is sending request in a loop fix issue/use another method
        //         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        //     }
        // }
        // axios.request(options).then(function (response) {
        //     console.log('LOGG from MoviePost', response.data);
        //     console.log(response.data)
        //     setResult(response.data)
        //     setSearch(true)
        //     // setItem = response.data
        // }).catch(function (error) {
        //     console.log(error);
        // });
        // ---------------- IMDB REQUEST END------------------
    }, [])
    const ytPlayerConfig = {
        height: '1080',
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
    };
    function getMore(pageNum){
        let page = pageNum + 1
        console.log('logging pageNum',pageNum);
        console.log(page)
        axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}&page=${pageNum}`).then((response)=>{
            console.log(response.data.results)
            console.log(response.data)
            setResult(response.data)
            setSearch(true)
        }).catch((err)=>console.log(err))

    }
    if (search) {
        if(searchItems.total_pages > 1){
            searchItems.more =true
        }else if(searchItems.page = searchItems.total_pages){
            searchItems.more =false
        }else{
            searchItems.more =false
        }
        if(searchItems.page > 1){
            searchItems.previous = true
        }
        return (
            <div className=''>
                <div className='row pd-1'>
                    {/* {ytId && <div className=''> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>} */}
                    <h2 className='pd-1 mt-3'>Search Results for "{props.data}"</h2>
                    <div className='posters'>
                        {searchItems.results.map((data) => {
                            // if (props.curl) {
                            return (
                                <div key= {data.id}>
                                    <img onClick={() => { trailerHandler(data.id) }} className={props.small ? 'poster-small'
                                        : 'poster'} src={defImage} alt={data.original_title} srcSet={`${data.poster_path ? w500 + data.poster_path : w500+data.backdrop_path}`} />
                                    <h6 href={`https://imdb.com/title/tt${data.id}`}>{data.original_title} </h6>
                                </div>
                            )
                        })}
                        {searchItems.more ? <div> <img src={defImage} onClick={()=>getMore(searchItems.page+1)} alt="More" className="poster" />
                        <h6 >More Results </h6> </div> : <div></div> }
                    </div>
                    <div className='pagebuttons'>
                    {searchItems.more ? <div>
                        <button onClick={()=>getMore(searchItems.page+1)} className='nextPageButton'> Next &gt; </button>
                    </div> : <div></div> }
                    {searchItems.previous ? <div>
                        <button onClick={()=>getMore(searchItems.page-1)} className='nextPageButton'> &lt; Previous </button>
                    </div> : <div></div>  }
                    </div>
                </div>
                {ytId && <div className=''> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>}
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

function RowPost(props) {
    const [items, setItem] = useState([])
    const [ytId, setYtId] = useState('')
    useEffect(() => {
        if (props.url) {
            axios.get(props.url).then((response) => {
                setItem(response.data.results)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            axios.request(props.curl).then((response) => {
                setItem(response.data.d)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])
    const ytPlayerConfig = {
        height: '1080',
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
            {ytId && <div className=''> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>}
            <h2 className='pd-1'>{props.title}</h2>
            <div className='posters'>
                {items.map((data) => {
                    if (props.curl) {
                        return (
                            <div key ={data.id}>
                                <img onClick={() => { trailerHandler(data.id) }} className={props.small ? 'poster-small'
                                    : 'poster'} src={defImage} alt={data.title} srcSet={`${data.image.url ? data.image.url : defImage}`} />
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <img onClick={() => { trailerHandler(data.id) }} className={props.small ? 'poster-small'
                                    : 'poster'} src={defImage} alt={data.original_name} srcSet={`${data.poster_path ? w500 + data.poster_path : defImage}`} />
                            </div>
                        )
                    }
                })}
            </div>

        </div>
    )
}
export const MoviePosting = MoviePost
export default RowPost
