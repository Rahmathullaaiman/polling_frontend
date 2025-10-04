import React from 'react';
import { Col, Row, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Landing() {
  const token = sessionStorage.getItem('token');
  const isLoggedIn = token !== null && token !== undefined;

  return (
    <div style={{ marginTop: "15%"}}>
      <section id='home'>
        <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
            <Navbar.Brand
              style={{ fontSize: "30px", color: "white", fontWeight: "bolder", marginLeft: "-30px" }}
              href="#home"
            >
              Polling System
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              {/* Move links to right side */}
              <div className="ms-auto d-flex align-items-center">
                <Nav className="fs-5 text-white">
                  <Nav.Link href="/login" className="text-white fw-bolder me-3">LOGIN</Nav.Link>
                  <Nav.Link href="/register" className="text-white fw-bolder me-5">REGISTER</Nav.Link>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>

      {/* Hero Section */}
      <div className="container">
        <Row className="container" style={{ marginTop: '18%' }}>
          <Col md={6}>
            <h1 className='mt-5' style={{ fontSize: 50, fontWeight: "bolder" }}>
              CREATE POLLS EASILY
            </h1>
            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
              VOTE <span className='text-primary'>ANYWHERE, ANYTIME</span>
            </h1>

            <div className='mt-4'>
              {isLoggedIn ? (
                <Link to={'/polling'} className='btn btn-primary rounded fw-bolder' style={{ fontSize: '18px' }}>
                  Go to Polls <i className='fa-solid fa-arrow-right ms-3'></i>
                </Link>
              ) : (
                <Link to={'/login'} className='btn btn-primary rounded fw-bolder' style={{ fontSize: '18px' }}>
                  Get Started <i className='fa-solid fa-arrow-right ms-3'></i>
                </Link>
              )}
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <img
              style={{ width: '100%', borderRadius: "20px" }}
              src="https://images.pexels.com/photos/8850718/pexels-photo-8850718.jpeg"
              alt="poll illustration"
            />
          </Col>

        </Row>
      </div>
    </div>
  );
}

export default Landing;
