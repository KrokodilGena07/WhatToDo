import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IData} from "../models/IData";

export const infoApi = createApi({
    reducerPath: 'info/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/info`
    }),
    endpoints: build => ({
        fetchCities: build.query<IData[], void>({
            query: () => ({
                url: '/cities'
            })
        }),
        fetchCategories: build.query<IData[], void>({
            query: () => ({
                url: '/categories'
            })
        }),
        fetchConnectTypes: build.query<IData[], void>({
            query: () => ({
                url: '/connect/types'
            })
        })
    })
});

export const {
    useFetchCitiesQuery,
    useFetchCategoriesQuery,
    useFetchConnectTypesQuery
} = infoApi;