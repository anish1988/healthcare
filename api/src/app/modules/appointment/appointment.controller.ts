import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { Appointments, Patient } from "@prisma/client";
import { channel } from "diagnostics_channel";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.createAppointment(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    })
})
const createAppointmentByUnAuthenticateUser = catchAsync(async (req: Request, res: Response) => {
    console.log("createAppointmentByUnAuthenticateUser",req.body.patientInfo);
    const PatientsInfo = req.body.patientInfo;
   // const isUserExist = checkPatientsExits(PatientsInfo);

    const result = await AppointmentService.checkPatientsExits(PatientsInfo.patientId);
    if (!result) {
        const createPatientsInfo:any = {};
        createPatientsInfo.firstName = PatientsInfo.firstName;  
        createPatientsInfo.lastName = PatientsInfo.lastName; 
        createPatientsInfo.email = PatientsInfo.email;  
        //createPatientsInfo.firstName = PatientsInfo.firstName;   
        /**
         * Creates a new patient in the database.
         * 
         * @param {Prisma.PatientCreateInput} PatientsInfo - The details of the patient to be created.
         * @returns {Promise<Patient>} - A promise that resolves to the created patient object.
         */
        const patResult = await AppointmentService.createPatients(createPatientsInfo as Prisma.PatientCreateInput) as Patient;
        console.log("patienrsId", patResult.id);
        req.body.patientInfo.patientId = patResult.id;
        console.log("Final reqBody",req.body);
        const result = await AppointmentService.createAppointmentByUnAuthenticateUser(req.body);
        sendResponse(res, {
            statusCode: 200,
            message: 'Successfully Appointment Created !!',
            success: true,
            data: result
        })
        
    }
   
   /* process.exit(1);
    */
})


const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAllAppointments();
    sendResponse<Appointments[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Appointment !!',
        success: true,
        data: result,
    })
})

const getAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAppointment(req.params.id);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    })
})

const getAppointmentByTrackingId = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAppointmentByTrackingId(req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    })
})

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.deleteAppointment(req.params.id);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Appointment !!',
        success: true,
        data: result,
    })
})

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointment(req.params.id, req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    })
})

const getPatientAppointmentById = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPatientAppointmentById(req.user);
    sendResponse<Appointments[]>(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    })
})
/*
const getDoctorAppointmentsById = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getDoctorAppointmentsById(req.user, req.query);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctor apppointments !!',
        success: true,
        data: result
    })
})*/

const getDoctorAppointmentsById = catchAsync(async (req: Request, res: Response) => {
    try {
        //req.query.doctorId = '398b61d4-8139-42cb-8f92-9a199787b8c9';
        
        console.log("Hey Name is: ",req.body);
        const result = await AppointmentService.getDoctorAppointmentsById(req.body.LastLoginId, req.body.sortBy);
        sendResponse(res, {
            statusCode: 200,
            message: 'Successfully Retrieve doctor apppointments !!',
            success: true,
            data: result
        })
    } catch (error) {
        console.error(error);
        sendResponse(res, {
            statusCode: 500,
            message: 'An error occurred while retrieving doctor appointments',
            success: false,
            data: null
        })
    }
})

const updateAppointmentByDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointmentByDoctor(req.user, req.body);
    sendResponse<Appointments>(res, {
        statusCode: 200,
        message: 'Successfully updated apppointments !!',
        success: true,
        data: result
    })
})

const getDoctorPatients = catchAsync(async (req: Request, res: Response) => {
    console.log("getDoctorPatients",req.body.LastLoginId);
    const result = await AppointmentService.getDoctorPatients(req.body.LastLoginId);
    sendResponse<Patient[]>(res, {
        statusCode: 200,
        message: 'Successfully retrieve doctor patients !!',
        success: true,
        data: result
    })
})

const getPaymentInfoViaAppintmentId = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPaymentInfoViaAppintmentId(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    })
})

const getPatientPaymentInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getPatientPaymentInfo(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    })
})

const getDoctorInvoices = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getDoctorInvoices(req.user);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve Doctor info !!',
        success: true,
        data: result
    })
})

const getAppointmentCounts = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAppointmentCounts();
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully retrieve appointment counts !!',
        success: true,
        data: result
    })
})

/**
 * Check if a patient exists.
 * 
 * @param {string} patientInfo - The patient information to check.
 * @returns {Promise<string | undefined>} - A promise that resolves with the patient ID if the patient does not exist, or undefined if the patient does exist.
 */
const checkPatientsExits = async (patientInfo: any): Promise<string | undefined> => {
    const result = await AppointmentService.checkPatientsExits(patientInfo.patientId);
    if (!result) {
        delete patientInfo.scheduleDate;
        delete patientInfo.patientId;
        delete patientInfo.scheduleTime;
        delete patientInfo.phone;
        /**
         * Creates a new patient in the database.
         * 
         * @param {Prisma.PatientCreateInput} patientInfo - The details of the patient to be created.
         * @returns {Promise<Patient>} - A promise that resolves to the created patient object.
         */
        const patResult = await AppointmentService.createPatients(patientInfo as Prisma.PatientCreateInput) as Patient;
        console.log("patienrsId", patResult.id);
        return patResult.id;
    }
    return undefined; 
}

export const AppointmentController = {
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getPatientAppointmentById,
    getAppointmentCounts,
    updateAppointment,
    createAppointment,
    getAllAppointment,
    getAppointment,
    deleteAppointment,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId,
    checkPatientsExits
}
