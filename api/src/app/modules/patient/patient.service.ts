import { Patient, Appointments,UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { create } from "./patientService";
import { IUpload } from "../../../interfaces/file";
import { Request } from "express";
import { CloudinaryHelper } from "../../../helpers/uploadHelper";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
const createPatient = async (payload: any): Promise<any> => {
    console.log("CreatePatiensts",payload);
    const result = await create(payload)
    return result;
}

const getAllPatients = async (): Promise<Patient[] | null> => {
    const result = await prisma.patient.findMany();
    return result;
}

const getPatient = async (id: string): Promise<Patient | null> => {
    const result = await prisma.patient.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deletePatient = async (id: string): Promise<any> => {
    const result = await prisma.$transaction(async (tx) => {
        const patient = await tx.patient.delete({
            where: {
                id: id
            }
        });
        await tx.auth.delete({
            where: {
                email: patient.email
            }
        })
    });
    return result;
}

// : Promise<Patient>
const updatePatient = async (req: Request): Promise<Patient | null> => {
    //console.log("Anish",req);
    const file = req.file as IUpload;
    const id = req.params.id as string;
    const user = JSON.parse(req.body.data);
    console.log("Usesatat",user);
    console.log("id",id);
    if (file) {
        const uploadImage = await CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            user.img = uploadImage.secure_url
        } else {
            throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to updateImage !!')
        }
    }
    try {
        if (!id) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required parameter: id');
        }
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required parameter: user');
        }
console.log("you are here",user);
        const updatedPatient = await prisma.patient.update({
            where: { id },
            data: user
        });

        console.log("result", updatedPatient);
        return updatedPatient;
    } catch (error) {
        console.error('Failed to update patient:', error);
        throw error;
    }
}

const getPatientCount = async (): Promise<any> => {
    const result = await prisma.patient.count();
   // console.log("getPatientCount",result);
    return result;
}

const getPatientCountById = async (user: any): Promise<Appointments | null | any> => {
    const drId = user;
    const result = await prisma.appointments.count({
        where : {
            doctorId :drId
        }
    });
    console.log("getPatientCount",result);
    return result;
}

export const PatientService = {
    createPatient,
    getPatientCount,
    getPatientCountById,
    updatePatient,
    getPatient,
    getAllPatients,
    deletePatient
}
