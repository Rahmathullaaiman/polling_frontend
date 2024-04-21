import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Header() {
  const navigate = useNavigate();
  const [showDashboardButton, setShowDashboardButton] = useState(true);
  const [showHistoryButton, setShowHistoryButton] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const existUser = sessionStorage.getItem('existuser');
    const adminUser = sessionStorage.getItem('adminuser');

    if (existUser) {
      setShowDashboardButton(false);
    } else if (adminUser) {
      setShowHistoryButton(false);
      setIsAdminUser(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const logout = () => {
    sessionStorage.removeItem('token');
    if (sessionStorage.getItem('existuser')) {
      sessionStorage.removeItem('existuser');
    } else if (sessionStorage.getItem('adminuser')) {
      sessionStorage.removeItem('adminuser');
    }
    Swal.fire({
      title: 'LOGGED OUT ',
      icon: 'success'
    });
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home" style={{ fontSize: '30px', color: 'white', fontWeight: 'bolder', marginLeft: '-30px' }}>SKYLINE VENTURES</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center fs-5 text-white">
            {isAdminUser && (
              <Button href="/users" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">USER LIST</Button>
            )}
            {showDashboardButton && (
              <>
                <Button href="/dashboard" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">GO TO DASHBOARD</Button>
                <Dropdown>
              <Dropdown.Toggle variant="secondary" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">
                PROPERTY REQUEST
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className='text-black fw-bolder' href="request">PROPERTY</Dropdown.Item>
                <Dropdown.Item className='text-black fw-bolder' href="rentrequest"> RENT PROPERTY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              </>
            )}
            {!isAdminUser && (
              <Button href="/newdashboard" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">USER DASHBOARD</Button>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">
                PROPERTIES
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className='text-black fw-bolder' href="rents">RENTS</Dropdown.Item>
                <Dropdown.Item className='text-black fw-bolder' href="home">BUY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {showHistoryButton && (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">
                  HISTORY
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item className='text-black fw-bolder' href="history">BOOKED PROPERTY</Dropdown.Item>
                  <Dropdown.Item className='text-black fw-bolder' href="renthistory">RENT PROPERTY</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Button onClick={logout} style={{ border: '3px outset white', borderRadius: '10px', backgroundColor: 'white', textDecoration: 'none' }} className="text-black fw-bolder mx-3">LOGOUT</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
