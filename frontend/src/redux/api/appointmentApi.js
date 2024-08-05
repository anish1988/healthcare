import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const APPOINTMENT_URL = '/appointment'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllAppointments: build.query({
            query: (arg) => {
                console.log("Query:", {
                    url: `${APPOINTMENT_URL}`,
                    method: 'GET',
                    params: arg
                });// Check the value of arg in the console
                return {
                    url: `${APPOINTMENT_URL}`,
                method: 'GET',
                params: arg
                };
            },
            transformResponse: (response) =>{
                console.log("transformResponse",response);
                return {
                    appointments: response,
                    //meta: response.meta
                }
            },
            providesTags: [tagTypes.appointments]
        }),
        createAppointment: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/create`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        createAppointmentByUnauthenticateUser: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/create-un-authenticate`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        trackAppointment: build.mutation({
            query: (data) => ({
                url: `${APPOINTMENT_URL}/tracking`,
                method: 'POST',
                data: data
            })
        }),
        updateAppointment: build.mutation({
            query: ({ id, data }) => ({
                url: `${APPOINTMENT_URL}/${id}`,
                method: 'PATCH',
                data: data
            }),
            invalidatesTags: [tagTypes.appointments]
        }),
        getPatientAppointments: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/appointments`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getSingleAppointment: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getAppointmentedPaymentInfo: build.query({
            query: (id) => ({
                url: `${APPOINTMENT_URL}/patient-payment-info/${id}`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorAppointments: build.query({
           /* query: (arg) => ({
                url: `${APPOINTMENT_URL}/doctor/appointments`,
                method: 'GET',
                params: arg
            }),*/
            query: (data) => {
                console.log("Query:", {
                    url: `${APPOINTMENT_URL}/doctor/appointments`,
                    method: 'POST',
                    data: data
                });// Check the value of arg in the console
                return {
                    url: `${APPOINTMENT_URL}/doctor/appointments`,
                    method: 'POST',
                    data: data
                };
            },
            providesTags: [tagTypes.appointments]
        }),
        getDoctorPatients: build.query({
            query: (data) => {
                console.log("Query:", {
                    url: `${APPOINTMENT_URL}/doctor/patients`,
                    method: 'POST',
                    data: data
                });// Check the value of arg in the console
               
                return {
                    url: `${APPOINTMENT_URL}/doctor/patients`,
                    method: 'POST',
                    data: data
                };
            },
            providesTags: [tagTypes.appointments]
        }),
        getPatientInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/patient/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getDoctorInvoices: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/doctor/invoices`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        }),
        getAppointmentCounts: build.query({
            query: () => ({
                url: `${APPOINTMENT_URL}/getAppointmentCounts`,
                method: 'GET'
            }),
            providesTags: [tagTypes.appointments]
        })
    })
})

export const { 
    useGetDoctorAppointmentsQuery,
    useGetPatientAppointmentsQuery,
    useGetDoctorPatientsQuery,
    useCreateAppointmentMutation,
    useGetSingleAppointmentQuery,
    useGetAppointmentedPaymentInfoQuery,
    useGetPatientInvoicesQuery,
    useGetDoctorInvoicesQuery,
    useUpdateAppointmentMutation,
    useGetAppointmentCountsQuery,
    useGetAllAppointmentsQuery,
    useCreateAppointmentByUnauthenticateUserMutation, 
    useTrackAppointmentMutation
} = appointmentApi;
