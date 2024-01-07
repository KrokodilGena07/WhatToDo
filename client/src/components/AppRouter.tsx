import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../hooks/redux";

const AppRouter = () => {
    const {user} = useTypedSelector(state => state.auth);

    return (
        <Routes>
            {user ?
                privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )
                :
                publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )
            }
        </Routes>
    );
};

export default AppRouter;