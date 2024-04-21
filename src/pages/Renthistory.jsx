import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Getrenthistory, deleterenthistory } from '../services/allapi';
import { base_Url } from '../services/baseurl';
import Swal from 'sweetalert2';

function Renthistory() {
  const [userhistory, setUserhistory] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = (cardDetails) => {
    setSelectedCard(cardDetails);
    setShow(true);
  };

  const getrentHistory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      const result = await Getrenthistory(reqHeader);
      console.log(result);
      setUserhistory(result.data);
    } catch (error) {
      console.error('Error fetching rent history:', error);
    }
  };

  useEffect(() => {
    getrentHistory();
  }, []);

  const handledelete = async (id) => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    Swal.fire({
      title: 'Are you sure to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CANCEL BOOKING!',
      cancelButtonText: 'NO',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const cancelResult = await deleterenthistory(id, reqHeader);
        if (cancelResult.status === 200) {
          Swal.fire({
            title: 'BOOKING CANCELLED SUCCESSFULLY!',
            icon: 'success',
          });
          getrentHistory();
        } else {
          console.log(cancelResult.response.data);

          Swal.fire({
            title: 'Error',
            text: 'Failed to cancel booking. Please try again.',
            icon: 'error',
          });
        }
      }
    });
  };

  const handleClose = () => {
    setShow(false);
    setSelectedCard(null);
  };

  return (
    <div className="container mt-5">

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Card Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCard && (
            <div>
              <p>Card Number: {selectedCard.cardNumber}</p>
              <p>CVV: {selectedCard.cvv}</p>
              <p>PIN: {selectedCard.pin}</p>
              <p>Expiry Date: {selectedCard.expiryDate}</p>
              <p>Cardholder Name: {selectedCard.cardholderName}</p>
              <p>Property ID: {selectedCard._id}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div className="mt-5 text-center">
        <h2 className="fw-bolder">RECENT <span className="text-primary">BOOKINGS</span></h2>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          {userhistory.length === 0 ? (
             <div className='d-flex align-items-center justify-content-center text-danger fw-bolder fs-3'>NO MORE RECENT PURCHASES</div>
          ) : (
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Place</th>
                  <th>Address</th>
                  <th>Transaction</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userhistory.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`${base_Url}/uploads/${item.propertyimage}`}
                        alt=""
                        style={{ width: '80px', height: '80px', borderRadius: '20%' }}
                      />
                    </td>
                    <td>{item.Price}</td>
                    <td>{item.place}</td>
                    <td>{item.address}</td>
                    <td>
                      <button onClick={() => handleShow(item)} className="btn btn-success">VIEW<i className="fa-regular fa-eye ms-2"></i></button>
                    </td>
                    <td>
                      <button style={{fontSize:"17px"}}  onClick={() => handledelete(item._id)}
                        type="button"
                        className="btn btn-danger btn-sm btn-rounded"
                      >
                      CANCEL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Renthistory;
