import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const DOC_URL = '/doctor'

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query({
            /*query: (arg) => ({
                url: `${DOC_URL}`,
                method: 'GET',
                params: arg
            }),*/
            query: (arg) => {
                console.log("Query:", {
                    url: `${DOC_URL}`,
                    method: 'GET',
                    params: arg
                });// Check the value of arg in the console
                return {
                    url: `${DOC_URL}`,
                method: 'GET',
                params: arg
                };
            },
            transformResponse: (response) =>{
                return {
                    doctors: response.data,
                    meta: response.meta
                }
            },
            providesTags: [tagTypes.doctor]
        }),
        getDoctor: build.query({
            query: (id) => ({
                url: `${DOC_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
        updateDoctor: build.mutation({
            query: ({ data, id }) => ({
                url: `${DOC_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.doctor]
        }),
        getDoctorCounts: build.query({
            query: () => ({
                url: `${DOC_URL}/getDoctorCount`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctor]
        }),
    })
})

export const { useGetDoctorsQuery, useGetDoctorQuery, useUpdateDoctorMutation ,useGetDoctorCountsQuery} = doctorApi
