import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import { base_Url } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Rentcard({ rentproperty }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const [, payload] = token.split('.');
        const decodedPayload = atob(payload);
        const { userId } = JSON.parse(decodedPayload);
        setUserId(userId);
      } catch (error) {
        console.error('Token decoding error:', error);
      }
    }
  }, []);

  const handleBuyClick = () => {
    const isAdmin = sessionStorage.getItem('adminuser');
  
    if (isAdmin) {
      Swal.fire({
        title: "You are an admin!",
        text: "You can't buy this property.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      const loggedInUserId = sessionStorage.getItem('existuser');
  
      if (loggedInUserId && rentproperty && rentproperty.userId) {
        const loggedInUser = JSON.parse(loggedInUserId);
        const loggedInUserIdString = loggedInUser._id.toString();
        const rentPropertyOwnerId = rentproperty.userId.toString();
  
        if (loggedInUserIdString === rentPropertyOwnerId) {
          Swal.fire({
            title: "You added this property!",
            text: "You can't buy your own property.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          if (rentproperty && rentproperty._id) {
            navigate(`/payments/${rentproperty._id}`, { state: { rentproperty } });
          } else {
            console.error('Invalid property details for purchase.');
          }
        }
      } else {
        console.error('Invalid property or user details for purchase.');
      }
    }
  };
  

  // View
  const handleViewClick = () => {
    navigate(`/rentpropertydetails`, { state: { rentproperty } });
  };

  return (
    <div className='mt-5 container'>
      <Row className="container">
        <Col md={3}>
          <Card className='mt-3 card shadow' style={{ width: '19rem' }}>
            <Card.Img
              variant="top"
              style={{ height: '250px' }}
              className='p-4 rounded'
              src={rentproperty ? `${base_Url}/uploads/${rentproperty.propertyimage}` : 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt="Property Image"
            />
            <Card.Body>
              <Card.Title className='fw-bolder'>PRICE: ₹{rentproperty.Price}</Card.Title>
              <Card.Text>
                <p></p>
              </Card.Text>
              <div className='d-flex align-items-center justify-content-center'>
                <Button onClick={handleBuyClick} style={{ width: "90%" }} className='me-4' variant="primary">
                  RENT
                </Button>
                <Button onClick={handleViewClick} style={{ width: "90%" }} className='ms-4' variant="btn btn-success">
                  VIEW
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
        <Col md={3}></Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default Rentcard;
