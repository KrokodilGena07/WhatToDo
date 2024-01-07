import {authApi} from "./authApi";
import {clubApi} from "./clubApi";
import {infoApi} from "./infoApi";

export const services = {
    [authApi.reducerPath]: authApi.reducer,
    [clubApi.reducerPath]: clubApi.reducer,
    [infoApi.reducerPath]: infoApi.reducer
};

export const apiMiddlewares = [
    authApi.middleware,
    clubApi.middleware,
    infoApi.middleware
];