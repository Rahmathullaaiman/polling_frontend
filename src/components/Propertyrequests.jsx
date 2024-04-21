import React, { useEffect, useState } from 'react';
import { Allrequests, addtosellpropertiesnewuser, rejectrequest } from '../services/allapi';
import { base_Url } from '../services/baseurl';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Propertyrequests() {

  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    try {
      const result = await Allrequests();
      console.log(result);
      setRequests(result.data); 
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []); 



  const reject= async (id)=>{
    const token = sessionStorage.getItem('token')
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await rejectrequest(id,reqHeader)
   

    console.log(result);
    if(result.status===200){
      Swal.fire({
        title: "REJECTED",
        text: "",
        icon: "error"
      });
      getRequests()
    }
    else{
      console.log(result.response.data);
    }

  }

  useEffect(() => {
    reject();
  }, []); 
  
  const handleApproveClick = async(request) => {
    
   
    const reqBody = {
      ID:request.ID,
      Price: request.Price,
      place: request.place,
      address: request.address,
      type:request.type,
      furnishing:request.furnishing,
      bedroom:request.bedroom,
      bathroom:request.bathroom,
      floors:request.floors,
      carparking:request.carparking,
      overview:request.overview,
      propertyimage: request.propertyimage,
      userId:request.userId,
      propertyid: request._id,
    };
    console.log(reqBody); 
    const requestDataString = JSON.stringify(request);
  
    sessionStorage.setItem('approvedRequest', requestDataString);


    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        await addtosellpropertiesnewuser(reqBody, reqHeader);
        Swal.fire({
          title: "APPROVED",
          text: "",
          icon: "success"
        });

        getRequests()
        
      } catch (error) {
        console.error('Error purchasing property:', error);
        
      }
    }

  };
  

  return (
    <div className="container mt-5">
      <div className="mt-5 text-center">
        <h2 className='fw-bolder'>RECENT <span className='text-primary'>REQUESTS</span></h2>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>IMAGE</th>
                <th>USER ID</th>
                <th>PROPERTY ID</th>
                <th>PRICE</th>
                <th>PLACE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request._id}>
                  <td>
                    <img
                      src= {`${base_Url}/uploads/${request.propertyimage}`}
                      alt="Property"
                      style={{ width: '80px', height: '80px', borderRadius: '20%' }}
                    />
                  </td>
                  <td>{request.userId}</td>
                  <td>{request._id}</td>
                  <td>{request.Price}</td>
                  <td>{request.place}</td>
                  <td>
                    <button onClick={()=>reject(request._id)}
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm "
                      onClick={() => handleApproveClick(request)} 
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Propertyrequests;
