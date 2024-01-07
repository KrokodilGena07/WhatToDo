import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../store";
import {ClubImageInput, ClubInput, IClub} from "../models/IClub";
import {IFilter} from "../models/IFilter";

export const clubApi = createApi({
    reducerPath: 'club/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_URL}/api/clubs`,
        prepareHeaders: (headers, { getState }) => {
            const {accessToken} = (getState() as RootState).auth;
            if (accessToken) {
                headers.set('authorization', `Bearer ${accessToken}`);
                return headers;
            }
        },
        credentials: "include"
    }),
    tagTypes: ['Club'],
    endpoints: build => ({
        fetchClubs: build.query<IClub[], IFilter>({
            query: (filter: IFilter) => ({
                url: '/',
                params: filter
            }),
            providesTags: ['Club']
        }),
        fetchClub: build.query<IClub | null, number>({
            query: (id: number) => ({
                url: `/${id}`
            }),
            providesTags: ['Club']
        }),
        createClub: build.mutation<number, ClubInput>({
            query: (body: ClubInput) => ({
                url: '/',
                method: 'POST',
                body
            })
        }),
        setClubImage: build.mutation<void, ClubImageInput>({
            query: (body: ClubImageInput) => {
                const formData = new FormData();
                formData.append('id', String(body.id));
                formData.append('image', body.image);

                return {
                    url: '/image',
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: ['Club']
        }),
        deleteClub: build.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Club']
        })
    })
});

export const {
    useFetchClubsQuery,
    useFetchClubQuery,
    useCreateClubMutation,
    useSetClubImageMutation,
    useDeleteClubMutation
} = clubApi;