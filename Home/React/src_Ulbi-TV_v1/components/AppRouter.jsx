import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/posts";
import Errors from "../pages/Errors";
import PostIdPages from "../pages/PostIdPages";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
        ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={<route.component />}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                {/*<Route*/}
                {/*    path="/error"*/}
                {/*    element={<Errors/>}*/}
                {/*>*/}
                {/*</Route>*/}

                {/*<Route*/}
                {/*    path="*"*/}
                {/*    element={<Navigate to='/error'/>}*/}
                {/*/>*/}

                <Route
                    path="*"
                    element={<Navigate to='/posts' />}
                />
            </Routes>
        :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={<route.component />}
                        path={route.path}
                        exact={route.exact}
                    />
                )}

                <Route
                    path="*"
                    element={<Navigate to='/login' />}
                />
            </Routes>
    );
};

export default AppRouter;