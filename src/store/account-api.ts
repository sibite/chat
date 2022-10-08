import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../../server/api-types/auth';
import prepareAuthHeader from './prepare-auth-header';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/account/',
    prepareHeaders: prepareAuthHeader,
  }),
  endpoints: (builder) => ({
    getAccountData: builder.query<UserType, void>({
      query: () => 'me',
      keepUnusedDataFor: 0,
    }),
    uploadAvatar: builder.query<void, Blob>({
      query: (file) => {
        const formdata = new FormData();
        formdata.append('avatar', file);
        return {
          url: 'avatar',
          method: 'put',
          body: formdata,
        };
      },
    }),
    uploadCover: builder.query<any, Blob>({
      query: (file) => {
        const formdata = new FormData();
        formdata.append('cover', file);
        return {
          url: 'cover',
          method: 'PUT',
          body: formdata,
        };
      },
    }),
    patchDetails: builder.query<any, Partial<UserType>>({
      query: (updatedData) => ({
        url: '',
        method: 'PATCH',
        body: updatedData,
      }),
    }),
  }),
});

export const { useGetAccountDataQuery, useUploadAvatarQuery } = accountApi;
