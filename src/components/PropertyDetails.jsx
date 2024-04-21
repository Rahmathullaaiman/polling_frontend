import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { base_Url } from '../services/baseurl'; // Import base_Url if needed
import { Link } from 'react-router-dom';

function Propertydetailspage() {
  const location = useLocation();
  const { property } = location.state || {};

  return (
    <div>
      <div className='d-flex justify-content-center align'>
        <h1 className='fw-bolder mt-5'>DETAILS OF THE PROPERTY</h1>
      </div>

      <div className="container mt-5">
        <Row className="container" style={{ marginTop: '5%' }}>
          <Col md={6}>
            <img
              style={{ width: '100%', borderRadius: '30px' }}
              src={property ? `${base_Url}/uploads/${property.propertyimage}` : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt="Property"
            />
          </Col>

          <Col md={6}>
            {property && (
              <div style={{ marginTop:"-3%",marginLeft: "20%", border: "1px solid black", padding: "20px", borderRadius: "15px", width: "70%" }}>
                <h4><span className="fw-bolder">Price:-₹</span> <span>{property.Price}</span></h4>
                <h4><span className="fw-bolder">Place:-</span> <span>{property.place}</span></h4>
                <h4><span className="fw-bolder">Address:-</span> <span>{property.address}</span></h4>
                <h4><span className="fw-bolder">Type:-</span> <span>{property.type}</span></h4>
                <h4><span className="fw-bolder">Furnishing:-</span> <span>{property.furnishing}</span></h4>
                <h4><span className="fw-bolder">Bedroom:-</span> <span>{property.bedroom}</span></h4>
                <h4><span className="fw-bolder">Bathroom:-</span> <span>{property.bathroom}</span></h4>
                <h4><span className="fw-bolder">Floors:-</span> <span>{property.floors}</span></h4>
                <h4><span className="fw-bolder">Carparking:-</span> <span>{property.carparking}</span></h4>
                <h4><span className="fw-bolder">Overview:-</span> <span>{property.overview}</span></h4>
                
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <Link to="/home">
                    <Button style={{ flex: "1", fontSize: "17px" }} variant="btn btn-primary">
                    <i class="fa-solid fa-arrow-left"></i> BACK TO HOME
                    </Button>
                  </Link>
                 
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Propertydetailspage;
