import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/task'}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/tasks',
        }),
        addPost: builder.mutation({
            query: (body) => ({
                url: '/tasks',
                method: 'POST',
                body,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/tasks`,
                method: 'DELETE',
                body: {id},
            }),
        }),
        updatePost: builder.mutation({
            query: (post) => ({
                url: `/tasks`,
                method: 'PUT',
                body: post,
            }),
        }),
    })
})

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } = taskApi;