import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserPublicType } from '../../server/api-types/auth';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/profile/' }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserPublicType, string>({
      query: (id) => String(id),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
