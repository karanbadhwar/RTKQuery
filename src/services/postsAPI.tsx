import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../models/contact.model";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  tagTypes: ["post"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    posts: builder.query<Contact[], void>({
      query: () => "/posts",
      providesTags: ["post"],
    }),
    post: builder.query<Contact, number>({
      query: (id) => `/posts/${id}`,
      providesTags: ["post"],
    }),
    addPost: builder.mutation<void, Contact>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["post"],
    }),
    updatePost: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  usePostsQuery,
  usePostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsAPI;
