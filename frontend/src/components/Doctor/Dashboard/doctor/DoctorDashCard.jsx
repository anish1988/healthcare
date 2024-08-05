import './index.css';
import React, { useEffect, useState } from 'react'
import { FaHospitalUser, FaCalendarAlt, FaHospital } from "react-icons/fa";
import { getFromLocalStorage } from '../../../../utils/local-storage';
import {userData} from '../../../../constant/storageKey';
import { useGetPatientCountsByIdQuery } from '../../../../redux/api/patientApi';
import moment from "moment";

const DoctorDashCard = () => {

    
    const myDate = new Date()
    const date = moment(myDate).format('DD-MMM-YYYY');

    const authToken = getFromLocalStorage(userData);
    const parseUserDatas = JSON.parse(authToken);
    const [patientsCount, setPatientsCount] = useState(0);
    const paramData = {  LastLoginId: parseUserDatas?.Last_Login_Id }
    const { data:patientsDataCount } = useGetPatientCountsByIdQuery(paramData);
   

    const cardData = [
        {
            icon: <FaHospital className='icon' />,
            title: 'Total Patient',
            amount: `${patientsDataCount}`,
            date: `${date}`
        },
        {
            icon: <FaHospitalUser className='icon active' />,
            title: 'Today Patient',
            amount: 1500,
            date: `${date}`
        },
        {
            icon: <FaCalendarAlt className='icon danger' />,
            title: 'Appointments',
            amount: `${patientsDataCount}`,
            date: `${date}`
        }
    ]
    return (

        <div className="row mb-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
            {
                cardData.map((item, index) => (
                    <div className="col-md-12 col-lg-4" key={index + 8}>
                        <div className='d-flex gap-2 align-items-center dash-card'>
                            <div className='dash-card-icon'>
                                {item.icon}
                            </div>
                            <div className="dash-widget-info">
                                <h6 className='mb-0'>{item.title}</h6>
                                <h4 className='my-1'>{item.amount}</h4>
                                <p className="form-text">{item.date}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}
export default DoctorDashCard;