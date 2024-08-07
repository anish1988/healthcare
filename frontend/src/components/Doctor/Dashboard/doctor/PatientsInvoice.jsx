import React from 'react';
import { getFromLocalStorage } from '../../../../utils/local-storage';
import { useState } from 'react';
import { userData } from '../../../../constant/storageKey';
import {  useGetPatientInvoicesQuery } from '../../../../redux/api/appointmentApi';
import img from '../../../../images/doc/doctor 3.jpg';
import moment from 'moment';
import { Button, Tabs, Tag, Tooltip } from 'antd';
import CustomTable from '../../../UI/component/CustomTable';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { FaRegEye } from "react-icons/fa";


const PatientsInvoice = ({refresh}) => {
    
   // const [patientId, setPatientId] = useState(userData?.patientId);
    //const [search, setSearch] = useState('');      
    const authToken = getFromLocalStorage(userData);
    const parseUserDatas = JSON.parse(authToken);
    console.log("parseUserDatas User Id ",parseUserDatas?.Last_Login_Id);
    const paramData = {LastLoginId: parseUserDatas?.Last_Login_Id} 
    const { data: invoices,isLoading: InvoicesIsLoading } = useGetPatientInvoicesQuery(paramData);

    const InvoiceColumns = [
        {
            title: 'Doctor',
            key: 1,
            width: 150,
            render: function (data) {
                return (
                    <div className="avatar avatar-sm mr-2 d-flex gap-2">
                        <div>
                            <img className="avatar-img rounded-circle" src={img} alt="" />
                        </div>
                        <div>
                            <h6 className='text-nowrap mb-0'>{data?.appointment?.doctor?.firstName + ' ' + data?.appointment?.doctor?.lastName}</h6>
                            <p className='form-text'>{data?.appointment?.doctor?.designation}</p>
                        </div>
                    </div>
                )
            }
        },
        {
            title: 'Total Paid',
            key: 2,
            width: 100,
            dataIndex: "totalAmount"
        },
        {
            title: 'Paid On',
            key: 3,
            width: 100,
            render: function (data) {
                return <div>{moment(data?.createdAt).format("LL")}</div>
            }
        },
        {
            title: 'Payment Method',
            key: 4,
            width: 100,
            dataIndex: "paymentMethod"
        },
        {
            title: 'Payment Type',
            key: 4,
            width: 100,
            dataIndex: "paymentType"
        },
        {
            title: 'Action',
            key: '5',
            width: 100,
            render: function (data) {
                return (
                    <Link to={`/booking/invoice/${data?.appointment?.id}`}>
                        <Button type='primary' size='medium'>View</Button>

                    </Link>
                )
            }
        },
    ];

    return (
        <>
        <CustomTable
                loading={InvoicesIsLoading}
                columns={InvoiceColumns}
                dataSource={invoices}
                showPagination={true}
                pageSize={10}
                showSizeChanger={true}
            />
        </>
    )
}

export default PatientsInvoice