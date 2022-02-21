import React from 'react';
import  "./styles/App.css";
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


const App = () => {


    return (
        <Router>
            <Navbar/>

            <AppRouter/>
        </Router>
    )

};

export default App;