import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
const PAT_URL = '/patient'

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPatients: build.query({
            /*query: (arg) => ({
                url: `${DOC_URL}`,
                method: 'GET',
                params: arg
            }),*/
            query: (arg) => {
                console.log("Query:", {
                    url: `${PAT_URL}`,
                    method: 'GET',
                    params: arg
                });// Check the value of arg in the console
                return {
                    url: `${PAT_URL}`,
                method: 'GET',
                params: arg
                };
            },
            transformResponse: (response) =>{
                console.log("transformResponse",response);
                return {
                    patient: response,
                    //meta: response.meta
                }
            },
            providesTags: [tagTypes.patient]
        }),
        getPatient: build.query({
            query: (id) => ({
                url: `${PAT_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }),
        updatePatient: build.mutation({
            query: ({ data, id }) => ({
                url: `${PAT_URL}/${id}`,
                method: 'PATCH',
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [tagTypes.patient]
        }),
        getPatientCounts: build.query({
            query: () => ({
                url: `${PAT_URL}/getPatientCounts`,
                method: 'GET',
            }),
            providesTags: [tagTypes.patient]
        }) ,
        getPatientCountsById: build.query({
            query: (data) => ({
                url: `${PAT_URL}/getPatientCountsByID`,
                method: 'POST',
                data: data
            }),
            providesTags: [tagTypes.patient]
        }) 
    })
})

export const { useGetPatientsQuery, useGetPatientQuery, useUpdatePatientMutation, useGetPatientCountsQuery ,useGetPatientCountsByIdQuery} = patientApi
