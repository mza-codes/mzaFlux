import React, { useState, useEffect, useRef } from 'react'
import './RowPost.css'
import axios from 'axios'
import defImage from './default-poster.jpg';
import { trending } from '../../url'
import { API_KEY, BACKEND_URL, IMDB_API_KEY, POSTER_URL, TMDB_URL, w500 } from '../../Constants/Constants'
import YouTube from 'react-youtube';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Iconify from '../../Hooks/Iconify';
import useResponsive from '../../Hooks/useResponsive';
import { useContext } from 'react';
import { Data } from '../../App';
import { useNavigate } from 'react-router-dom';
import SingleView from '../../Pages/SingleView';
import lozad from 'lozad'
import * as _ from 'loadsh'
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
    const { data, setData } = useContext(Data)
    const user = JSON.parse(sessionStorage.getItem('userSession'))
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

    const addToWishList = async (item) => {
        console.log('ADD TO WISHLIST CALLED', item);
        await axios.post(`${BACKEND_URL}/mflux/wishlist/add`, item).then((response) => { console.log('fetched Response', response); })
        console.log('REQ Complete');
    }

    const handleStore = async (value) => {
        console.log('handleStore REsult CALLED')
        if (data.length != 0) {
            const stat = await data.filter(item => item.id == value.id)
            console.log('STAT MAIN', stat);
            if (stat.length === 0) {
                setData(current => [...current, value])
            } else {
                return false;
            }
        } else {
            setData(current => [...current, value])
        }

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
                                <div key={data.id} className='background poster-card'>
                                    <div className='overlayPoster'>
                                        {user && <Tooltip title='Add to Wishlist'>
                                            <IconButton onClick={() => addToWishList(data)}>
                                                <Iconify sx={{ color: 'white' }} icon='emojione:star' width={26} height={26} />
                                            </IconButton>
                                        </Tooltip>}
                                    </div>
                                    <img onClick={() => { trailerHandler(data.id); handleStore(data); }}
                                        className={props.small ? 'poster-small poster-card' : 'poster poster-card'}
                                        src={defImage} alt={data.original_title}
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
    const [errIcon, setErrIcon] = useState(false)
    const { data, setData } = useContext(Data)
    const elRef = useRef();
    const user = JSON.parse(sessionStorage.getItem('userSession'))
    const route = useNavigate()
    const handleStore = async (value) => {
        console.log('HANDLESTORE CALLED')
        if (data.length != 0) {
            const stat = await data.filter(item => item.id == value.id)
            console.log('STAT MAIN', stat);
            if (stat.length === 0) {
                setData(current => [...current, value])
            } else {
                return false;
            }
        } else {
            setData(current => [...current, value])
        }

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

    const addToWishList = async (item) => {
        if (!user) return false;
        console.log('ADD TO WISHLIST CALLED', item);
        item.userId = user?._id
        const values = {
            title: /[a-zA-Z]/.test(item?.original_title) ? item?.original_title : item?.title || item?.original_name,
            country: item?.origin_country?.length >= 1 ? item?.origin_country[0] : item?.original_language,
            background: item?.backdrop_path || item?.poster_path,
            tmdbId: item?.id,
            poster: item?.poster_path || item?.backdrop_path,
            language: item?.original_language,
            popularity: item?.popularity,
            rating: item?.vote_average,
            vote_count: item?.vote_count,
            year: parseInt(item?.release_date?.slice(0, 4)) || parseInt(item?.first_air_date?.slice(0, 4)),
            userId: item?.userId,
            genres: item?.genre_ids,
            plot: item?.overview,
        };

        await axios.post(`${BACKEND_URL}/mflux/wishlist/add`, values).then((response) => {
            console.log('fetched Response', response);
        }).catch((err) => {
            console.log('ERROR WISHLIST', err);
            const icon = document.getElementById(item.id);
            console.log(icon);
            icon.style.visibility = "hidden";
            // do alert here to info user about duplicate
        });

        console.log('REQ Complete');
    }

    useEffect(() => {
        fetchRow()
        const imgs = document.querySelectorAll('img');
        const observer = lozad(imgs);
        // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
        observer.observe();
    }, [])

    const trailerHandler = (id) => {
        console.log(id)
        route('/view')
        return;
        // axios.get(`${TMDB_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
        //     console.log(response)
        //     if (response.data.results.length !== 0) {
        //         let j = Math.floor(Math.random() * response.data.results.length);
        //         console.log('printing j', j)
        //         setYtId(response.data.results[j])
        //         console.log(response.data.results[j])
        //     } else {
        //         alert('404 Not Found')
        //     }
        // }).catch((err) => {
        //     alert('Error Fetching Data')
        // })
    }

    const sort = () => {
        let sorted = _.sortBy(items).reverse()
        setItem(sorted)
    }


    const scrollHoriz = () => {
        const el = elRef.current;
        if (el) {
            const onWheel = e => {
                if (e.deltaY == 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }


    const sortBtn = <IconButton onClick={sort} color='warning'> <Iconify icon='charm:grab-horizontal' /></IconButton>
    return (
        <div className='row pd-1'>
            <h2 className='pd-1'>{props.title} {sortBtn}</h2>
            <div className='posters' onMouseEnter={scrollHoriz} ref={elRef}>
                {items.map((data) => {
                    if (props.curl) {
                        return (
                            <div key={data.id} className='poster-card'>
                                <div className="dark-fade-top"></div>
                                <img key={data.id} onClick={() => { trailerHandler(data.id); handleStore(data); }}
                                    className={props.small ? 'poster-small poster-card'
                                        : 'poster poster-card'} src={defImage} alt={data.title}
                                    srcSet={`${data.image.url ? data.image.url : defImage}`} />
                                <div className="dark-fade-bottom"></div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={data.id} className='background poster-card'>
                                {/* iconoir:favourite-book */}
                                <div className='overlayPoster'>
                                    {user && <Tooltip title='Add to Wishlist'>
                                        <IconButton id={data.id} onClick={() => addToWishList(data)}>
                                            <Iconify width={26} height={26}
                                                icon='emojione:star' />
                                        </IconButton>
                                    </Tooltip>}
                                </div>
                                <img key={data.id} onClick={() => { trailerHandler(data.id); handleStore(data) }}
                                    className={props.small ? 'poster-small poster-card'
                                        : 'poster poster-card'} src={defImage} alt={data.original_name}
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
