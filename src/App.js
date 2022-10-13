import React, { createContext, useEffect, useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { action, tvPopular, comedy, documentaries, horror, popular, trending, imdbPopularUS, popularIndian, adventure, topRated, upcoming, action2, originals, trending2, comedy2, horror2, romance2, family } from './url'
import Recent from './Components/Recent'
import WishList from './Components/Wishlist'
import HomeNavBar from './Components/NavBar/HomeNavBar'
import { API_KEY, TMDB_URL } from './Constants/Constants'
import axios from 'axios'

export function Breaker() {
  return (
    <div className="pd-1">
      <hr />
    </div>
  )
}

export const Data = createContext(null)
export const UserSession = createContext(null)
function App() {
  const [user, setUser] = useState(null)
  const fetchUser = () => {
    const data = sessionStorage.getItem('userSession')
    if (data != null) {
      let user = JSON.parse(data)
      setUser(user)
    }
  }

  useEffect(() => {
    fetchUser()
    // axios
    //   .get(
    //     `${TMDB_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    //   )
    //   .then((response) => {
    //     console.log('NEW RESPONSE',response);
    //     let data = response.data.results;
    //     // setPopular(data.slice(0,8));
    //   });
  }, [])

  return (
    <UserSession.Provider value={{ user, setUser }} >
      {/* <Data.Provider value={{ data, setData }} > */}
      <div>
        <HomeNavBar />
        <Banner />
        <RowPost url={upcoming} title="Upcoming" small />
        <RowPost url={action2} title="Stunning Action" />
        <RowPost url={originals} title="Originals" />
        <RowPost url={trending2} title="Trending TMDB" />
        <RowPost url={romance2} title="Romantic" />
        <RowPost url={family} title="Family" small />
        <RowPost url={topRated} title="Top Rated" />
        <RowPost url={comedy2} title="Comedy" small />
        <RowPost url={horror2} title="Trending Movies" />
        <RowPost url={tvPopular} title="Trending TV Shows" small />
        <RowPost url={popular} title="Popular" small />
        <RowPost url={comedy} title="Comedy/Drama" small />
        <RowPost url={action} title="Action Movies" small />
        <RowPost url={horror} title="Horror Movies" small />
        <RowPost url={documentaries} title="Documentaries" small />
        <Breaker />
        {/* <Recent value={[data, setData]} /> */}
        {/* <WishList /> */}
      </div>
      {/* </Data.Provider> */}
    </UserSession.Provider>
  );
}
export default App;
