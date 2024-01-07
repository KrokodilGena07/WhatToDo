import React from "react";
import Home from "../pages/home/Home";
import Clubs from "../pages/clubs/Clubs";
import Club from "../pages/club/Club";
import Error from "../pages/error/Error";
import NewClub from "../pages/newClub/NewClub";
import Login from "../pages/login/Login";

interface IRoute {
    path: string;
    element: React.FC;
}

export enum RouteNames {
    HOME = '/',
    LOGIN = '/login',
    CLUBS = '/clubs',
    CLUB = '/clubs/:id',
    NEW_CLUB = '/new/club'
}

const baseRoutes: IRoute[] = [
    {path: RouteNames.HOME, element: Home},
    {path: RouteNames.CLUBS, element: Clubs},
    {path: RouteNames.CLUB, element: Club},
    {path: '*', element: Error}
];

export const privateRoutes: IRoute[] = [
    ...baseRoutes,
    {path: RouteNames.NEW_CLUB, element: NewClub}
];

export const publicRoutes: IRoute[] = [
    ...baseRoutes,
    {path: RouteNames.LOGIN, element: Login}
];