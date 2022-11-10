import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { action, tvPopular, comedy, documentaries, horror, popular, topRated, upcoming, action2, originals, trending2, comedy2, horror2, romance2, family } from './url'
import HomeNavBar from './Components/NavBar/HomeNavBar';

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
    fetchUser();
  }, []);

  return (
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
    </div>
  );
}
export default App;
