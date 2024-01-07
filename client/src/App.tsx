import React, {FC, useEffect} from 'react';
import './styles/App.scss';
import AppRouter from "./components/AppRouter";
import {useLogoutMutation, useRefreshQuery} from "./services/authApi";
import {useActions} from "./hooks/redux";
import {ErrorResponse} from "react-router-dom";

const App: FC = () => {
    const {data, error} = useRefreshQuery();
    const {setUser, removeUser} = useActions();
    const [logout] = useLogoutMutation();

    useEffect(() => {
        if (data) {
            setUser(data);
        }
        const err = error as ErrorResponse;
        if (err && err.status === 401) {
            logout();
            removeUser();
            return;
        }
    }, [data, error, logout]);

    return (
        <div className='App'>
            <AppRouter/>
        </div>
    );
};

export default App;