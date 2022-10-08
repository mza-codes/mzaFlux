import React, { createContext, useEffect, useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { action, tvPopular, comedy, documentaries, horror, popular, trending, imdbPopularUS, popularIndian, adventure } from './url'
import Recent from './Components/Recent'
import WishList from './Components/Wishlist'
import HomeNavBar from './Components/NavBar/HomeNavBar'

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
  }, [])

  return (
    <UserSession.Provider value={{ user, setUser }} >
      {/* <Data.Provider value={{ data, setData }} > */}
        <div>
          <HomeNavBar />
          <Banner />
          <RowPost url={trending} title="Trending Movies" />
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
