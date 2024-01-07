import React, {FC, useMemo} from 'react';
import './Header.scss';
import logoIcon from '../../../assets/svg/logoIcon.svg';
import {RouteNames} from "../../../router";
import {useActions, useTypedSelector} from "../../../hooks/redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "../button/Button";
import {useLogoutMutation} from "../../../services/authApi";

const Header: FC = () => {
    const {user} = useTypedSelector(state => state.auth);

    const baseRoutes = useMemo(() => {
        return [
            {title: 'Home', value: RouteNames.HOME},
            {title: 'Clubs', value: RouteNames.CLUBS}
        ];
    }, []);
    const privateRoutes = useMemo(() => {
        return [
            ...baseRoutes,
            {title: 'Create', value: RouteNames.NEW_CLUB}
        ]
    }, [baseRoutes]);

    const routes = useMemo(() => {
        return user ? privateRoutes : baseRoutes;
    }, [user, baseRoutes, privateRoutes]);

    const navigate = useNavigate();
    const location = useLocation();

    const {removeUser} = useActions();
    const [logout] = useLogoutMutation();

    const signOut = () => {
        removeUser();
        logout();
        navigate(RouteNames.HOME);
    }

    return (
        <header className='Header'>
            <Link
                to={RouteNames.HOME}
                className='HeaderLogo'
            >
                <img src={logoIcon} alt="logoIcon"/>
                <h1 className='HeaderLogoText'>WhatToDo</h1>
            </Link>
            <div className='HeaderMenu'>
                {routes.map(route =>
                    <Link
                        to={route.value}
                        key={route.value}
                        className='HeaderMenuItem'
                    >
                        <h2>{route.title}</h2>
                    </Link>
                )}
                {user ?
                    <Button onClick={signOut}>Logout</Button>
                    :
                    <>
                        {location.pathname !== RouteNames.LOGIN &&
                            <>
                                <Button
                                    type='outline'
                                    className='HeaderBtn'
                                    onClick={() => navigate(RouteNames.LOGIN + '?q=l')}
                                >
                                    Sign in
                                </Button>
                                <Button onClick={() => navigate(RouteNames.LOGIN + '?q=r')}>Sign up</Button>
                            </>
                        }
                        {location.pathname === RouteNames.LOGIN &&
                            <Button onClick={() => navigate(-1)}>Back</Button>
                        }
                    </>
                }
            </div>
        </header>
    );
};

export default Header;