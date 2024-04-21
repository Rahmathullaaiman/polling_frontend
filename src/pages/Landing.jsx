import React from 'react';
import { Col,Row, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Landing() {
  const token = sessionStorage.getItem('token')
  const isLoggedIn = token !== null && token !== undefined;

  return (
    <div>
   <section id='home'>
   <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
            <Navbar.Brand style={{fontSize:"30px",color:"white",fontWeight:"bolder",marginLeft:"-30px"}} href="#home">SKYLINE VENTURES</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <div className="d-flex justify-content-center flex-grow-1">
      <Nav className="align-items-center fs-5 text-white">
        <Nav.Link href="#home" className="text-white fw-bolder me-5">HOME</Nav.Link>
        <Nav.Link href="#gallery" className="text-white fw-bolder me-5">FEATURED</Nav.Link>
        <Nav.Link href="#review" className="text-white fw-bolder me-5">FAQ'S</Nav.Link>
        <Nav.Link href="#about" className="text-white fw-bolder me-5">ABOUT</Nav.Link>
      </Nav>
    </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </section>


   <div className="container">
        <Row className="container" style={{ marginTop: '18%' }}>
          <Col md={6}>
            <h1 className='mt-5' style={{ fontSize: 60,fontWeight:"bolder" }}>YOUR FUTURE HOME</h1>
            <h1  style={{ fontSize: 60 ,fontWeight:"bolder"}}>IS RIGHT <span className='text-primary'>HERE...</span></h1>
            

           <div className='mt-4'>
              {isLoggedIn ? (
                <Link to={'/home'} className='btn btn-primary rounded fw-bolder' style={{ fontSize: '18px' }}>
                  Let's Go <i className='fa-solid fa-arrow-right ms-3'></i>
                </Link>
              ) : (
                <Link to={'/login'} className='btn btn-primary rounded fw-bolder' style={{ fontSize: '18px' }}>
                  Get Started <i className='fa-solid fa-arrow-right ms-3'></i>
                </Link>
              )}
            </div>
            </Col>
            <Col md={6}>
            <img style={{ width: '100%',borderRadius:"30px" }} src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" alt="no img" />
          </Col>
           </Row>
      

      <section className="gallery" id="gallery"style={{marginTop:"10%"}}>
        <Container>
          <div className="main-txt">
            <h1 className="text-center fw-bolder" style={{fontSize:"43px"}}>FEATURED  <span className='text-primary'> PROPERTIES</span></h1>
            <br /><br /><br />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <Col md={6} py={3} py-md={0}>
              <div className="card">
                <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="300px" />
              </div>
            </Col>
            <Col md={6} py={3} py-md={0}>
              <div className="card">
                <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="300px" />
              </div>
            </Col>
          </Row>
          <Row style={{marginTop:"30px"}}>
          <Col md={4} py={3} py-md={0}>
              <div className="card">
                <img src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="300px" />
              </div>
            </Col>
            <Col md={4} py={3} py-md={0}>
              <div className="card">
                <img src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" height="300px" />
              </div>
            </Col>
            <Col md={4} py={3} py-md={0}>
              <div className="card">
                <img src="https://images.pexels.com/photos/3935328/pexels-photo-3935328.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" height="300px" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
{/* cxeuuuuuuuuuuuu */}
<section id="review">
        <h1 style={{marginTop:"10%"}} className="text-center fw-bolder">CLIENTS <span className='text-primary'>REVIEW</span></h1>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="card">
                <div className="card-body py-4 mt-2">
                  <div className="d-flex justify-content-center mb-4">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-circle shadow-1-strong" width="100" height="100" alt="Andrea" />
                  </div>
                  <h5 className="fw-bolder">ANDREA</h5>
              
                  <p className="mb-2">
                    <i className="fas fa-quote-left pe-2 fw-bolder"></i>Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Quod eos id officiis hic
                    tenetur quae quaerat ad
                    <i className="fas fa-quote-right pe-2"></i>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="card">
                <div className="card-body py-4 mt-2">
                  <div className="d-flex justify-content-center mb-4">
                    <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-circle shadow-1-strong" width="100" height="100" alt="Andrea" />
                  </div>
                  <h5 className="fw-bolder">JOHNS</h5>
              
                  <p className="mb-2">
                    <i className="fas fa-quote-left pe-2 fw-bolder"></i>Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Quod eos id officiis hic
                    tenetur quae quaerat ad
                    <i className="fas fa-quote-right pe-2"></i>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="card">
                <div className="card-body py-4 mt-2">
                  <div className="d-flex justify-content-center mb-4">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-circle shadow-1-strong" width="100" height="100" alt="Andrea" />
                  </div>
                  <h5 className="fw-bolder">SAMUEL</h5>
              
                  <p className="mb-2">
                    <i className="fas fa-quote-left pe-2 fw-bolder"></i>Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit. Quod eos id officiis hic
                    tenetur quae quaerat ad
                    <i className="fas fa-quote-right pe-2"></i>
                  </p>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </section>

      <section id='about'>
      <div className="container" >
        <div className='d-flex align-items-center justify-content-center'style={{marginTop:"12%"}}>
        <h1 className='fw-bolder fs-1'>ABOUT <span className='text-primary'>US</span></h1>

        </div>
        <Row className="container"style={{marginTop:"8%"}}>
          <Col md={6}>
          <img style={{ width: '100%',borderRadius:"30px" }} src="https://images.pexels.com/photos/17399354/pexels-photo-17399354/free-photo-of-beautiful-triangular-shaped-wooden-vacation-house.jpeg?auto=compress&cs=tinysrgb&w=600" alt="no img" />

          </Col>
          <Col md={6}>
           <p className=' fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt, neque dolore molestiae iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum amet reiciendis doloremque nemo quidem voluptatem, ab, et ad quibusdam obcaecati animi quos ea sequi facilis in ratione sit ullam!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt, neque dolore molestiae iste! loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt</p>
          </Col>
        </Row>
        <Row className="container"style={{marginTop:"8%"}}>
          <Col md={6}>
          <p className=' fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt, neque dolore molestiae iste! Lorem ipsum dolor sit amet consectetur adipisicing elit. A earum amet reiciendis doloremque nemo quidem voluptatem, ab, et ad quibusdam obcaecati animi quos ea sequi facilis in ratione sit ullam!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt, neque dolore molestiae iste! loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sint maiores ducimus dolorem laboriosam dolorum consectetur fuga unde veritatis totam sapiente error ad reiciendis quisquam deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, at nesciunt ullam quidem sit quae in unde doloremque nostrum</p>
         
          </Col>
          <Col md={6}>
          <img style={{ width: '100%',borderRadius:"30px" }} src="https://images.pexels.com/photos/774250/pexels-photo-774250.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="no img" />

          </Col>
        </Row>
      </div>
      </section>

    </div>
    </div>
  );
}

export default Landing;
