import React, { createContext, useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'
import { action, tvPopular, comedy, documentaries, horror, popular, trending, imdbPopularUS, popularIndian, adventure } from './url'
import Recent from './Components/Recent'

export function Breaker() {
  return (
    <div className="pd-1">
      <hr />
    </div>
  )
}

export const Data = createContext(null)

function App() {

  // const [search,doSearch] = useState(false)
  const [data,setData] = useState([])
  console.log('LOGGING DATA APP.JS MAIN',data);
  return (
    <Data.Provider value={{data,setData}} >
      <div className="App">
        <NavBar />
        <Banner />
        {/* <MoviePosting /> */}
        {/* <SearchResult /> */}
        {/* <getResult /> */}
        {/* {search && <div className='p-custom'> <YouTube opts={ytPlayerConfig} videoId={ytId.key} /> </div>} */}
        {/* <moviePosting curl={imdbPopularUS} title="IMDB Movies" /> */}
        {/* <RowPost curl={imdbPopularUS} title="Popular IMDB Movies" /> */}
        {/* <RowPost curl={popularIndian} title="Indian" /> */}
        {/* <RowPost curl={adventure} title="Adventure" /> */}
        <RowPost url={trending} title="Trending Movies" />
        <RowPost url={tvPopular} title="Trending TV Shows" small />
        <RowPost url={popular} title="Popular" small />
        <RowPost url={comedy} title="Comedy/Drama" small />
        <RowPost url={action} title="Action Movies" small />
        <RowPost url={horror} title="Horror Movies" small />
        <RowPost url={documentaries} title="Documentaries" small />
        <Breaker />
        <Recent value={[data,setData]} />
      </div>
    </Data.Provider>
  );
}
export default App;
