import React, { useState } from 'react'
import "./NavBar.css";
import logoRed from './mflux-red.png'
import logoBlue from './mflux-sky.png'
import defaultAvatar from './avatar-default.png'
import { MoviePosting } from '../RowPost/RowPost'



function NavBar() {
    const [toggle, setToggle] = useState(false)
    const [query, doQuery] = useState('')
    const [params, setParams] = useState()
    const [result, setResult] = useState(false)
    
    // const [search, doSearch] = useState(false)
    // useEffect(() => {
    // function DoSearch(value) {
    //     useEffect(() => {
    //         const options = {
    //             method: 'GET',
    //             url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
    //             params: { q: value },
    //             headers: {
    //                 'X-RapidAPI-Key': 'IMDB_API_KEY', //key disabled as it is sending request in a loop fix issue/use another method
    //                 'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    //             }
    //         }
    //         setParams(options)
    //     }, [params])
    // }

    // }, [result])
    return (
        <div>
            <div className="navbar" >
                <img src={logoRed} alt="" className="logo" />
                <img onMouseEnter={() => { setToggle(true) }} onMouseLeave={() => { setToggle(false) }} src={defaultAvatar} alt="" className="avatar" />
                {toggle &&
                    <div className="popup0">
                        <h1>User Name</h1>
                    </div>
                }
                <div className="search-box">
                    {result ? <div>  <h6 onClick={()=>setResult(false)}  className='doSearch-button'>New Search</h6> </div> : <div>
                        <input className='search' value={query} onChange={(e) => { doQuery(e.target.value) }} type="text" />
                        <button onClick={() => { setParams(query); setResult(true) }} className='search-button'>Search</button> </div>}
                </div>
            </div>
            {result ? <MoviePosting data={params} /> : <div></div>}
        </div>
    )
}
// export const getResult = searchResult
export default NavBar
