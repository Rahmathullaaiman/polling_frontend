import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from 'react-bootstrap';
import { base_Url } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Propertycard({ property }) {
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

  const isOwner = userId === (property && property.userId);

  const handleViewClick = () => {
    if (property) {
      navigate(`/propertydetails`, { state: { property } });
    } else {
      console.error('Property details are not available.');
    }
  };

  const handleBuyClick = () => {
    const loggedInUserId = sessionStorage.getItem('existuser');
    const isAdmin = sessionStorage.getItem('adminuser');
  
    if (isAdmin) {
      Swal.fire({
        title: "You are an admin!",
        text: "You can't buy this property.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      if (loggedInUserId && property && property.userId) {
        const propertyOwnerId = property.userId.toString();
        
        const loggedInUser = JSON.parse(loggedInUserId);
        const loggedInUserIdString = loggedInUser._id.toString();
        
        if (propertyOwnerId === loggedInUserIdString) {
          Swal.fire({
            title: "You added this property!",
            text: "You can't buy your own property.",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          navigate(`/payment/${property._id}`, { state: { property } });
        }
      } else {
        console.error('User or property details are missing.');
        Swal.fire({
          title: "Error",
          text: "Invalid property details for purchase.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
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
              src={property ? `${base_Url}/uploads/${property.propertyimage}` : 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt="Property Image"
            />
            <Card.Body>
              <Card.Title className='fw-bolder'>PRICE: ₹{property ? property.Price : 'N/A'}</Card.Title>
              <Card.Text>
                <p><span className='fw-bolder'></span></p>
              </Card.Text>
              <div className='d-flex align-items-center justify-content-center'>
                <Button onClick={handleBuyClick} style={{ width: "90%" }} className='me-4' variant="primary">
                  BUY
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

export default Propertycard;
