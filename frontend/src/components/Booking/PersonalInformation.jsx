import { Checkbox, message } from 'antd';
import { useEffect, useState } from 'react';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import { getFromLocalStorage } from '../../utils/local-storage';
import { userData } from '../../constant/storageKey';   

const PersonalInformation = ({ handleChange, pData , selectValue, setPatientId =() =>{} }) => {
    const { firstName, lastName, email, mobile, reasonForVisit, description, address } = selectValue;
    
    console.log("selctedValue",selectValue);
    console.log("selctedValue data",pData);
    const [checked, setChecked] = useState(false);
    const { data } = useAuthCheck();
    const authToken = getFromLocalStorage(userData);
    const parseUserDatas = JSON.parse(authToken);       

    const onChange = (e) => {
        setChecked(e.target.checked);
    };
 /*   const [selectValue, setSelectValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        reasonForVisit: '',
        description: '',
        address: ''
    });

    
    useEffect(() => {
        if (pData) {
            console.log("Updating selectValue with pData");
            // Assuming `setSelectValue` updates the selectValue state correctly
            setSelectValue({
                firstName: pData.firstName || '',
                lastName: pData.lastName || '',
                email: pData.email || '',
                mobile: pData.mobile || '',
                reasonForVisit: pData.reasonForVisit || '',
                description: pData.description || '',
                address: pData.address || ''
            });
        }
    }, [pData]);
    */

    useEffect(() =>{
        if(checked){
            if(data.id){
                setPatientId(data.id);
                message.success("User Has Found !")
            }else{
                message.error("User is not Found, Please Login!")
            }
        }else if(parseUserDatas?.length > 0){
            setPatientId(parseUserDatas?.Last_Login_Id);
        }else {
            setPatientId('undefined');
        }
    }, [checked, data, setPatientId])

    return (
        <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
            <div className="row">
                <Checkbox checked={checked} onChange={onChange}>
                    Allready Have an Account ?
                </Checkbox>

                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>First Name</label>
                        <input onChange={(e) => handleChange(e)} name='firstName' value={firstName && firstName} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Last Name</label>
                        <input onChange={(e) => handleChange(e)} name='lastName' value={lastName && lastName} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Email</label>
                        <input onChange={(e) => handleChange(e)} name='pEmail' value={email || email} className="form-control" type="email" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Phone</label>
                        <input onChange={(e) => handleChange(e)} name='mobile' value={mobile  || mobile} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Reason For Visit</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='reasonForVisit' value={reasonForVisit && reasonForVisit} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Description</label>
                        <textarea rows={8} onChange={(e) => handleChange(e)} name='description' value={description && description} className="form-control" type="text" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="form-group card-label mb-3">
                        <label>Address</label>
                        <input onChange={(e) => handleChange(e)} name='address' value={address && address} className="form-control" type="text" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PersonalInformation;