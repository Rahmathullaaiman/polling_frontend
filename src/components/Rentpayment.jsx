import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { base_Url } from '../services/baseurl';
import Swal from 'sweetalert2';
import { buyrentproperty } from '../services/allapi';

function Rentpayment() {


    const { id } = useParams();
    const location = useLocation();
    const rentproperty = location.state?.rentproperty;
    console.log(rentproperty);
    const navigate = useNavigate();


    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');
  
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cvv, setCvv] = useState('');
  
    const [cardNumberError, setCardNumberError] = useState('');
    const [expiryDateError, setExpiryDateError] = useState('');
    const [cardholderNameError, setCardholderNameError] = useState('');
    const [cvvError, setCvvError] = useState('');
  
    // Add a state to track whether all payment details are filled
    const [allDetailsFilled, setAllDetailsFilled] = useState(false);
  
    // Validation functions
    const validatePin = () => {
      if (!pin || !/^\d{4}$/.test(pin)) {
        setPinError('Please enter a valid 4-digit PIN.');
        return false;
      }
      setPinError('');
      return true;
    };
  
    const validateCardNumber = () => {
      if (!/^\d{16}$/.test(cardNumber)) {
        setCardNumberError('Invalid card number');
        return false;
      }
      setCardNumberError('');
      return true;
    };
  
    const validateExpiryDate = () => {
      if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiryDate)) {
        setExpiryDateError('Invalid expiry date');
        return false;
      }
      setExpiryDateError('');
      return true;
    };
  
    const validateCardholderName = () => {
      if (!cardholderName.trim()) {
        setCardholderNameError('Cardholder name is required');
        return false;
      }
      setCardholderNameError('');
      return true;
    };
  
    const validateCvv = () => {
      if (!/^\d{3}$/.test(cvv)) {
        setCvvError('Invalid CVV');
        return false;
      }
      setCvvError('');
      return true;
    };



    const handleCancel = () => {
        Swal.fire({
          title: 'Are you sure to cancel this booking?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'CANCEL BOOKING!',
          cancelButtonText: 'NO',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'BOOKING CANCELLED SUCCESSFULLY!',
              icon: 'success',
            });
            // Navigate to home page here
            navigate('/rents');
          }
        });
      };



      const handlebuy = async () => {
        if (!validateCardNumber() || !validateExpiryDate() || !validateCardholderName() || !validateCvv() || !validatePin()) {
      
          console.log('Validation failed');
          return;
        }
    
        const existUserDetailsString = sessionStorage.getItem('existuser');
    
        if (!existUserDetailsString) {
          console.log('User details not found in sessionStorage.');
          return;
        }
    
        const existUserDetails = JSON.parse(existUserDetailsString);
        const buyer = existUserDetails._id;
    
        const reqBody = {
          Price: rentproperty.Price,
          place: rentproperty.place,
          address: rentproperty.address,
          propertyimage: rentproperty.propertyimage,
          userId: buyer,
          propertyid: rentproperty._id,
          cardNumber,
          expiryDate,
          cardholderName,
          cvv,
          pin,
        };
        console.log(reqBody);
    
        sessionStorage.setItem('propertyDetails', JSON.stringify(reqBody));
    
        const token = sessionStorage.getItem('token');
        if (token) {
          const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
    
          try {
            await buyrentproperty(reqBody, reqHeader);
            Swal.fire({
              title: "PROPERTY BOOKED",
              text: "",
              icon: "success"
            });
    
            // Navigate to a confirmation page or home page
            navigate('/rents');
          } catch (error) {
            console.error('Error purchasing property:', error);
            // Handle error and provide user feedback
          }
        }
    
        // Set allDetailsFilled to true when all details are filled
        setAllDetailsFilled(true);
      };
    
    

  return (
    <div style={{ width: '70%', height: '40%' }} className="container">
    <div className="row m-0">
      <h3 className="text-center fw-bolder mt-3 fs-2">Book Your Property</h3>

      <div className="col-lg-7 pb-5 pe-lg-5">
        <div className="row">
          <div className="col-12 p-5">
            <img
              style={{ marginLeft: '-3%', width: '110%', marginTop: '-2%' }}
              src={rentproperty ? `${base_Url}/uploads/${rentproperty.propertyimage}` : 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt=""
            />
          </div>
          <div style={{ marginTop: '-6%', marginLeft: '2%' }} className="row bg-light">
          <div className="col-md-4 col-6 ps-3 pe-0 my-4">
              <p className="text-muted">Price</p>
              <p className="h5">{rentproperty ? `${rentproperty.Price} ` : 'N/A'}</p>
            </div>
            <div className="col-md-4 col-6 ps-3 my-4">
              <p className="text-muted">Address</p>
              <p className="h5 m-0">{rentproperty ? rentproperty.address : 'N/A'}</p>
            </div>
            <div className="col-md-4 col-6 ps-3 my-4">
              <p className="text-muted">Type</p>
              <p className="h5 m-0">{rentproperty ? rentproperty.type : 'N/A'}</p>
            </div>
            <div className="col-md-4 col-6 ps-3 my-4">
              <p className="text-muted">Floors</p>
              <p className="h5 m-0">{rentproperty ? rentproperty.floors : 'N/A'}</p>
            </div>
            <div className="col-md-4 col-6 ps-3 my-4">
              <p className="text-muted">Furnishing</p>
              <p className="h5 m-0">{rentproperty ? rentproperty.furnishing : 'N/A'}</p>
            </div>
            <div className="col-md-4 col-6 ps-3 my-4">
              <p className="text-muted">CarParking</p>
              <p className="h5 m-0">{rentproperty ? rentproperty.carparking : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5 p-0 ps-lg-4">
        <div className="row m-0">
          <div className="col-12 px-4 ">
          <div className="d-flex align-items-end mt-2 mb-2"></div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted">place</p>
              <p className="fs-14 fw-bold">{rentproperty ? rentproperty.place : 'n/a'}</p>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted">Advance Booking</p>
              <p className="fs-14 fw-bold">
                <span className="fas fa-dollar-sign pe-1"></span>1,450
              </p>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted">GSTIN</p>
              <p className="fs-14 fw-bold">20%</p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <p className="text-muted fw-bold">Total</p>
              <div className="d-flex align-text-top">
                <span className="fas fa-dollar-sign mt-1 pe-1 fs-14 "></span>
                <span className="h4">1,650</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: allDetailsFilled ? '-3%' : '-5%' }} className="col-12 px-0">
            <div className="row bg-light m-0">
              <div className="col-12 px-4 my-4">
                <p className="fw-bold">Payment detail</p>
              </div>
              <div style={{ marginTop: allDetailsFilled ? '-2%' : '-4%' }} className="col-12 px-4">
                <div className="d-flex ">
                  <span className="">
                    <p className="text-muted">Card number</p>
                    <input style={{marginLeft:"-10%"}}
                      className={`form-control  ${cardNumberError ? 'is-invalid' : ''}`}
                      type="text"
                      value={cardNumber}
                      placeholder="xxxx xxxx xxxx xxxx"
                      onChange={(e) => setCardNumber(e.target.value)}
                      onBlur={validateCardNumber}
                    />
                    {cardNumberError && <div className="invalid-feedback">{cardNumberError}</div>}
                  </span>
                  <div className="w-75 d-flex flex-column align-items-end">
                    <p className="text-muted">Expires</p>
                    <input
                      className={`form-control ${expiryDateError ? 'is-invalid' : ''}`}
                      type="text"
                      value={expiryDate}
                      placeholder="MM/YYYY"
                      onChange={(e) => setExpiryDate(e.target.value)}
                      onBlur={validateExpiryDate}
                    />
                    {expiryDateError && <div className="invalid-feedback">{expiryDateError}</div>}
                  </div>
                </div>
                <div className="d-flex ">
                  <span className="me-5">
                    <p className="text-muted mt-3">Cardholder name</p>
                    <input style={{marginTop:"-12%"}}
                      className={`form-control ${cardholderNameError ? 'is-invalid' : ''}`}
                      type="text"
                      value={cardholderName}
                      placeholder="Name"
                      onChange={(e) => setCardholderName(e.target.value)}
                      onBlur={validateCardholderName}
                    />
                    {cardholderNameError && (
                      <div className="invalid-feedback">{cardholderNameError}</div>
                    )}
                    <div className="row m-0">
                      <div className="col-12  mb-3 p-0">
                        <button onClick={handleCancel} style={{marginTop:"120%"}}  className="btn btn-danger">
                          cancel
                        </button>
                      </div>
                    </div>
                  </span>
                  <div className="w-100 d-flex flex-column align-items-end">
                <p className="text-muted">CVV</p>
                <input
                  className={`form-control ${cvvError ? 'is-invalid' : ''}`}
                  type="text"
                  value={cvv}
                  placeholder="XXX"
                  onChange={(e) => setCvv(e.target.value)}
                  onBlur={validateCvv}
                />
                {cvvError && <div className="invalid-feedback">{cvvError}</div>}
                <p className="text-muted mt-2">PIN</p>
                <input
                  className={`form-control ${pinError ? 'is-invalid' : ''}`}
                  type="password"
                  value={pin}
                  placeholder="Enter 4-digit PIN"
                  onChange={(e) => setPin(e.target.value)}
                  onBlur={validatePin}
                />
                {pinError && <div className="invalid-feedback">{pinError}</div>}
                    <div className="row m-0">
                      <div className="col-12  mb-2 p-0">
                        <button onClick={handlebuy}  style={{ marginTop: '77%' }} className="btn btn-success">
                          PAY<span className="fas fa-arrow-right ps-2"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Rentpayment