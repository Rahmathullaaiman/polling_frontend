import React from 'react'
import Header from '../components/Header'
import Property from '../components/Property'
import { Row,Col } from 'react-bootstrap'
import RentProperty from '../components/Rentproperty'

function Rents() {
  return (
    
    <div>
    <Header/>
    <div style={{marginTop:"8%"}} className='d-flex align-items-center justify-content-center'>
      <h2 className='fw-bolder fs-2'>
        <span className='text-primary'>DISCOVER  </span>THE MOST SUITABLE PROPERTY
      </h2>
    </div>
    <div className="container mt-4">
      <Row className="align-items-center justify-content-center">
        <Col md={4}>
         
        </Col>
        <Col md={2}>
          {/* <button type="button" className="btn btn-primary">SEARCH</button> */}
        </Col>
      </Row>
    </div>
    <div>
      <RentProperty/>
    </div>
    
  </div>

  )
}

export default Rents