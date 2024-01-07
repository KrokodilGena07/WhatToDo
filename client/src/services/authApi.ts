import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {UserInput} from "../models/IUser";
import {AuthResponse} from "../models/AuthResponse";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/auth`,
        credentials: 'include'
    }),
    endpoints: build => ({
        registration: build.mutation<AuthResponse, UserInput>({
            query: (body: UserInput) => ({
                url: '/registration',
                method: 'POST',
                body
            })
        }),
        login: build.mutation<AuthResponse, UserInput>({
            query: (body: UserInput) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        refresh: build.query<AuthResponse, void>({
            query: () => ({
                url: '/refresh'
            })
        })
    })
});

export const {
    useRegistrationMutation,
    useLoginMutation,
    useLogoutMutation,
    useRefreshQuery
} = authApi;