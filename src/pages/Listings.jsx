import React from 'react';
import { Button } from 'react-bootstrap';

function Listings() {
 
  return (
    <div className="container mt-5">
      <div className='mt-5'><center><h2 style={{ color: '#66CDAA' }}>Your treasures await checkout!</h2></center></div>

      <div className="row mt-5">
        <div className="col-md-8">
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Place</th>
                <th>Price</th>
                <th>Type</th>
                <th>Overview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td>
                    <img
                      style={{ height: '100px', width: '100px' }}
                      src=""
                      alt='Property Image'
                    />
                  </td>
                  <td>ds</td>
                  <td>dsdsdd</td>
                  <td>sdds</td>
                  <td>dsds</td>
                  <td>
                    <Button variant='outline-danger btn rounded'>
                      <i className='fa-solid fa-trash fs-4'></i>
                    </Button>
                  </td>
                </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Listings;
