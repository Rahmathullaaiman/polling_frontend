import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Footer() {

  const navigate = useNavigate()
  const existUser = sessionStorage.getItem('existuser');
  const adminUser = sessionStorage.getItem('adminuser');

  const redirectToHome = () => {
    if (!existUser && !adminUser) {
      Swal.fire({
        title: 'Please login',
        icon: 'warning',
        confirmButtonText: 'OK'
        
      });
    
    } else if (existUser || adminUser) {
      
      window.location.href = '/home';
    }
  };
  
  return (
    <div style={{ backgroundColor: "primary" }} className='container mt-5'>
      <hr />
      <div className="row">
        <div className="col-lg-3 d-flex flex-column">
          <h4><i className="fa-brands fa-opencart me-2"></i>Skyline Ventures</h4>
          <p style={{ textAlign: 'justify' }}> Skyline Ventures offers a wide range of <br /> products at great prices. Shop now  <br /> and
          experience convenience at your <br /> fingertips.</p>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          <h4>Products</h4>
          <Link style={{ textDecoration: 'none' }} to={'options'}>Explore More</Link>
          <Link style={{ textDecoration: 'none' }} to={'/'}>Landing</Link>
          <Link style={{ border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'none' }} onClick={redirectToHome}>Home</Link>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          <h3>Guides</h3>
          <a href={'https://react.dev/'} style={{ color: 'black', textDecoration: 'none' }}>React</a>
          <a href={'https://react-bootstrap.github.io/'} style={{ color: 'black', textDecoration: 'none' }}>Node js</a>
          <a href={'https://bootswatch.com/'} style={{ color: 'black', textDecoration: 'none' }}>BootsWatch</a>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          <h3>Contact Us</h3>
          <div>
            <a style={{ textDecoration: 'none' }} href={''}><i className="fa-solid fa-phone me-3"></i>123-456-7890</a>
            <br />
            <a style={{ textDecoration: 'none' }} href={''}><i className="fa-solid fa-envelope me-3"></i>info@SkylineVentures.com</a>
          </div>
          <div className='col-lg-3 col-sm-12 icons d-flex justify-content-evenly ms-5 mt-3'>
            <a href={'https://www.instagram.com/'} style={{ textDecoration: 'none' }}><i className="fa-brands fa-instagram fa-2x me-4"></i></a>
            <a href={'https://www.facebook.com/'} style={{ textDecoration: 'none' }}><i className="fa-brands fa-facebook fa-2x me-4 "></i></a>
            <a href={'https://www.linkedin.com/'} style={{ textDecoration: 'none' }}><i className="fa-brands fa-linkedin-in fa-2x me-4"></i></a>
            <a href={'https://twitter.com/'} style={{ textDecoration: 'none' }}><i className="fa-brands fa-twitter fa-2x "></i></a>
          </div>
        </div>
        <div><center><p>Copyright © 2023 Skyline Ventures.Build With React</p></center></div>
      </div>
    </div>
  );
}

export default Footer;
