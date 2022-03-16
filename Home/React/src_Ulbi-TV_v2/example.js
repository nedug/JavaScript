import React, {useEffect, useState} from 'react';
import "./styles/App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route, Link, Navigate,
} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/posts";
import Navbar from "./components/UI/Navbar/navbar";
import Errors from "./pages/Errors";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

/* todo example */
const App = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }

        setIsLoading(false);
    }, [])

    return (

        <AuthContext.Provider value={
            {
                isAuth,
                setIsAuth: setIsAuth,
                isLoading
            }
        }>
            <Router>
                <Navbar/>

                <AppRouter/>
            </Router>
        </AuthContext.Provider>
    )

};

export default App;

class Class {}
