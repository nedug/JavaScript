import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/posts";
import Errors from "../pages/Errors";
import PostIdPages from "../pages/PostIdPages";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/about"
                element={<About/>}
            >
            </Route>
            <Route
                path="/posts"
                element={<Posts/>}
            >
            </Route>

            <Route
                path="/posts/:id"
                element={<PostIdPages/>}
            >
            </Route>

            <Route
                path="/error"
                element={<Errors/>}
            >
            </Route>

            <Route
                path="*"
                element={<Navigate to='/error'/>}
            />

                <Route
                    path="/"
                    element={<Navigate to='/posts'/>}
                />

        </Routes>
    );
};

export default AppRouter;