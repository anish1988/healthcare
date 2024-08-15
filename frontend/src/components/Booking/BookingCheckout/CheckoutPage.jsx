import moment from 'moment';
import img from '../../../images/avatar.jpg';
import { Link } from 'react-router-dom';
import './BookingCheckout.css';

const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, data, selectedDate, selectTime }) => {
    const { nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, paymentType, paymentMethod } = selectValue;
    const handleCheck = () => {
        setIsChecked(!isCheck)
    }

    console.log("data coming",data);
    console.log("selected value "  ,selectValue);
    let price = data?.price ? data.price : 60;
    let doctorImg = data?.img ? data?.img : img

    const vat = (15 / 100) * (Number(price))
    return (
        <div className="container mt-5">
            <div className="row">
              

                <div className="col-md-5 col-sm-12">
                    <div className="rounded p-3" style={{ background: "#f8f9fa" }}>
                        {data && <Link to={`/doctors/profile/${data?.id}`} className="booking-doc-img d-flex justify-content-center mb-2">
                            <img src={doctorImg} alt="" />
                        </Link>}
                        {data && <div className='doc-title-info mt-3 mb-3'>
                            <h5 className='mt-3 text-center' style={{
                                fontSize: "22px", fontWeight: 700,
                            }}>Dr. {data?.firstName + ' ' + data?.lastName}</h5>
                            <div className='text-center'>
                                <p className='form-text mb-0'>{data?.designation}</p>
                                <p className='form-text mb-0'>{data?.clinicAddress}</p>
                            </div>
                        </div>}

                        <div className="booking-item-wrap">
                            <ul className="booking-date">
                                <li>Date <span>{moment(selectedDate).format('LL')}</span></li>
                                <li>Time <span>{selectTime}</span></li>
                            </ul>
                            <ul className="booking-fee">
                                <li>Patients Name <span>{selectValue?.firstName + ' ' + selectValue?.lastName}</span></li>
                                <li>Patients contact Number <span>{selectValue?.mobile}</span></li>
                                <li>Reason to Visit <span>{selectValue?.reasonForVisit}</span></li>
                            </ul>

                            
                        </div>
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms_accept" className='me-2'
                                    checked={isCheck}
                                    onChange={handleCheck} />
                                <label htmlFor="terms_accept"> I have read and accept <a className='text-primary' style={{ cursor: 'pointer', textDecoration: 'none' }}>Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckoutPage;