import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Property from '../components/Property';
import Header from '../components/Header';

function Home() {
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
          </Col>
        </Row>
      </div>
      <div>
        <Property/>
      </div>
      
    </div>
  );
}

export default Home;
