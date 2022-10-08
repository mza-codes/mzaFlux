import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App, { Data } from "./App";
import Router from "./router";


export default function Home() {
    const [data, setData] = useState([])
    console.log('DATA logging',data);
    const fetchUser = () => {
        const data = JSON.parse(sessionStorage.getItem('userSession'))
        console.log(data)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <Data.Provider value={{data,setData}} >
            <BrowserRouter>
                <Router >
                    <div className="App">
                        <App />
                    </div>
                </Router>
            </BrowserRouter>
        </Data.Provider>
    )
}