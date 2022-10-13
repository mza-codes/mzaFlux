import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App, { Data } from "./App";
import Router from "./router";


export default function Home() {
    const [data, setData] = useState([])
    console.log('DATA logging', data);
    const fetchUser = () => {
        const data = JSON.parse(sessionStorage.getItem('userSession'))
        console.log(data)
    }
    sessionStorage.setItem('recents', JSON.stringify(data))
    function fetchRecents() {
        const values = JSON.parse(sessionStorage.getItem('recents'))
        setData(values)
    }

    const block = () => {
    }

    useEffect(() => {
        fetchRecents()
        fetchUser()
        window.onbeforeunload = () => {
            sessionStorage.setItem('recents', JSON.stringify(data))
            return "Your Session Will be Lost";
        };
    }, [])

    return (
        <Data.Provider value={{ data, setData }} >

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