import React, { useState, useEffect } from 'react'
import './RowPost.css'
import axios from 'axios'
import defImage from './default-poster.jpg';
import { trending } from '../../url'
import { API_KEY, IMDB_API_KEY, POSTER_URL, TMDB_URL, w500 } from '../../Constants/Constants'
import YouTube from 'react-youtube';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Iconify from '../../Hooks/Iconify';
import useResponsive from '../../Hooks/useResponsive';
import { useContext } from 'react';
import { Data } from '../../App';
import { useNavigate } from 'react-router-dom';
import SingleView from '../../Pages/SingleView';
// alt={data.original_title}


const styles = {
    card: {
        position: 'relative',

    },
    overlay: {
        position: 'absolute',
        top: '-14px',
        right: '-14px'
    },
}
function MoviePost(props) {
    // var data = []
    const route = useNavigate()
    const [recent, setRecent] = useState([])
    console.log('logging recent empty ARRAY', recent)
    const [search, setSearch] = useState(false)
    const [searchItems, setResult] = useState([])
    const [ytId, setYtId] = useState('')
    const [ytHeight, setYTHeight] = useState('800')
    const setView = props.value
    const isMobile = useResponsive('down', 'sm')
    const isMd = useResponsive('down', 'md')
    const isDesktop = useResponsive('up', 'lg')
    const { setData } = useContext(Data)
    let query = 'thriller'
    const runSearch = () => {

        console.log('fnc MOVIE POST LOGging PROPS')
        console.log(props);
        // --------------- TMDB REQUEST -----------------------
        // ${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}&page=1&include_adult=false
        axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data ? props.data : query}`)
            .then((response) => {
                console.log(response.data.results)
                console.log(response.data)
                setResult(response.data)
                // sessionStorage.setItem('searchResult', JSON.stringify(response.data))
                setSearch(true)
            }).catch((err) => console.log(err))
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
    }

    const handleStore = (data) => {
        console.log('handleStore called')
        setRecent(current => [...current, data])
        setData(current => [...current, data])
    }

    useEffect(() => {
        if (isMobile) {
            setYTHeight('360')
        }
        if (isDesktop) {
            setYTHeight('800')
        }
        runSearch()

    }, [isMobile, props.data])
    const ytPlayerConfig = {

        height: ytHeight,
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
    function getMore(pageNum) {
        let page = pageNum + 1
        console.log('logging pageNum', pageNum);
        console.log(page)
        axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}&page=${pageNum}`).then((response) => {
            console.log(response.data.results)
            console.log(response.data)
            setResult(response.data)
            setSearch(true)
        }).catch((err) => console.log(err))

    }
    if (search) {
        if (searchItems.total_pages > 1) {
            searchItems.more = true
        } else if (searchItems.page = searchItems.total_pages) {
            searchItems.more = false
        } else {
            searchItems.more = false
        }
        if (searchItems.page > 1) {
            searchItems.previous = true
        }
        return (
            <div className=''>
                <div className='row pd-1'>
                    {/* {ytId && <div className=''> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>} */}
                    <h2 className='pd-1 mt-3'>Search Results for "{props.data}" <IconButton color='error' onClick={() => setView(false)}>
                        <Iconify icon='eva:close-square-fill' width={35} height={35} />
                    </IconButton> </h2>

                    <div className='posters'>
                        {searchItems.results.map((data) => {
                            // if (props.curl) {
                            return (
                                <div key={data.id} className='background'>
                                    <div className='overlayPoster'>
                                        <Tooltip title='Add to Wishlist'>
                                            <IconButton>
                                                <Iconify sx={{ color: 'white' }} icon='emojione:star' width={26} height={26} />
                                            </IconButton>
                                        </Tooltip></div>
                                    <img onClick={() => { trailerHandler(data.id); handleStore(data);}} 
                                    className={props.small ? 'poster-small' : 'poster'} src={defImage} alt={data.original_title}
                                        srcSet={`${data.poster_path ? w500 + data.poster_path : w500 + data.backdrop_path}`} />
                                    <h6 href={`https://imdb.com/title/tt${data.id}`}>{data.original_title} </h6>
                                </div>
                            )
                        })}
                        {searchItems.more ? <div> <img src={defImage} onClick={() => getMore(searchItems.page + 1)} alt="More"
                            className="poster" /><h6 >More Results </h6> </div> : <div></div>}
                    </div>
                    <div className='pagebuttons'>
                        {searchItems.more ? <div>
                            <Tooltip title='Next'>
                                <IconButton color='warning' onClick={() => getMore(searchItems.page + 1)}>
                                    <Iconify icon='wpf:next' width={35} height={35} />
                                </IconButton></Tooltip>
                        </div> : <div></div>}
                        {searchItems.previous ? <div>
                            <Tooltip title='Previous'>
                                <IconButton color='warning' onClick={() => getMore(searchItems.page - 1)}>
                                    <Iconify icon='wpf:previous' width={35} height={35} />
                                </IconButton></Tooltip>
                        </div> : <div></div>}
                    </div>
                </div>
                {ytId && <SingleView />}
                {/* {ytId && <div className='background'> <div className="overlay">
                    <IconButton color='error' onClick={() => setYtId(null)}>
                        <Iconify icon='eva:close-square-fill' width={35} height={35} />
                    </IconButton></div> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>} */}
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
    const [recent, setRecent] = useState([])
    const { data, setData } = useContext(Data)
    const route = useNavigate()
    const handleStore = (data) => {
        console.log('HANDLESTORE CALLED')
        setRecent(current => [...current, data])
        setData(current => [...current, data])
    }

    const fetchRow = () => {
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
    }

    useEffect(() => {
        fetchRow()
    }, [])
    const ytPlayerConfig = {
        // height: '1080',
        // width: '100%',
        height: '800',
        width: '100%',

        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const trailerHandler = (id) => {
        console.log(id)
        route('/view')
        return ;
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
            {ytId && <div style={styles.card} >
                <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> <div style={styles.overlay}>
                    <IconButton color='error' onClick={() => setYtId(null)}>
                        <Iconify icon='eva:close-square-fill' width={35} height={35} />
                    </IconButton></div>
            </div>}
            <h2 className='pd-1'>{props.title}</h2>
            <div className='posters'>
                {items.map((data) => {
                    if (props.curl) {
                        return (
                            <div key={data.id}>
                                <img key={data.id} onClick={() => { trailerHandler(data.id); handleStore(data); }}
                                    className={props.small ? 'poster-small'
                                        : 'poster'} src={defImage} alt={data.title}
                                    srcSet={`${data.image.url ? data.image.url : defImage}`} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={data.id} className='background'>
                                {/* iconoir:favourite-book */}
                                <div className='overlayPoster'>
                                    <Tooltip title='Add to Wishlist'>
                                        <IconButton>
                                            <Iconify sx={{ color: 'white' }} icon='emojione:star' width={26} height={26} />
                                        </IconButton>
                                    </Tooltip></div>
                                <img key={data.id} onClick={() => { trailerHandler(data.id); handleStore(data) }}
                                    className={props.small ? 'poster-small'
                                        : 'poster'} src={defImage} alt={data.original_name}
                                    srcSet={`${data.poster_path ? w500 + data.poster_path : defImage}`} />
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
