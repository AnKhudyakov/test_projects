import { Response, RowCreateData } from '@/services/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eID = import.meta.env.VITE_E_ID;

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getRows: builder.query({
      query: () => ({
        url: `/v1/outlay-rows/entity/${eID}/row/list`,
      }),
    }),
    createRow: builder.mutation<Response, Partial<RowCreateData>>({
      query: (rowData) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: {
          ...rowData,
          id: null,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,
          parentId: rowData.parentId || null,
        },
      }),
    }),
    updateRow: builder.mutation<Response, Partial<RowCreateData>>({
      query: (rowData) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rowData.id}/update`,
        method: 'POST',
        body: {
          ...rowData,
          id: null,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,
        },
      }),
    }),
    removeRow: builder.mutation({
      query: (id) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetRowsQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useRemoveRowMutation,
} = projectApi;
