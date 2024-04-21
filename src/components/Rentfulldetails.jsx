import React from 'react'
import { Row, Col,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { base_Url } from '../services/baseurl'; 




function Rentfulldetails() {

    const location = useLocation();
    const { rentproperty } = location.state || {};
  

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
              src={rentproperty ? `${base_Url}/uploads/${rentproperty.propertyimage}` : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600'}
              alt="Property"
            />
        </Col>

        <Col md={6}>
          
          <div style={{ marginTop:"-3%",marginLeft: "20%", border: "1px solid black", padding: "20px", borderRadius: "15px", width: "70%" }}>
          <h4><span className="fw-bolder">Price:-₹</span> <span>{rentproperty.Price}</span></h4>
          <h4><span className="fw-bolder">Place:-</span> <span>{rentproperty.place}</span></h4>
          <h4><span className="fw-bolder">Address:-</span> <span>{rentproperty.address}</span></h4>
          <h4><span className="fw-bolder">Type:-</span> <span>{rentproperty.type}</span></h4>
          <h4><span className="fw-bolder">Furnishing:-</span> <span>{rentproperty.furnishing}</span></h4>
          <h4><span className="fw-bolder">Bedroom:-</span> <span>{rentproperty.bedroom}</span></h4>
          <h4><span className="fw-bolder">Bathroom:-</span> <span>{rentproperty.bathroom}</span></h4>
          <h4><span className="fw-bolder">Floors:-</span> <span>{rentproperty.floors}</span></h4>
          <h4><span className="fw-bolder">Carparking:-</span> <span>{rentproperty.carparking}</span></h4>
          <h4><span className="fw-bolder">Overview:-</span> <span>{rentproperty.overview}</span></h4>
        
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <Link to="/rents">
                    <Button style={{ flex: "1", fontSize: "17px" }} variant="btn btn-primary">
                    <i class="fa-solid fa-arrow-left"></i> BACK TO HOME
                    </Button>
                  </Link>
                 
                </div>
        </div>
        
         
         
          
        </Col>
      </Row>
    </div>
  </div>
  )
}

export default Rentfulldetails