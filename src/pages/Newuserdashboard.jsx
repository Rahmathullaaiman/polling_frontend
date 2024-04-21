import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import { Rentusersproperty, Usersproperty, deleteproperty, deleterentproperty } from '../services/allapi';

function Newuserdashboard() {

    const[rentuser,Setrentuser] = useState([])

    const navigate = useNavigate();
    const [userproperty, setUserproperty] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const existuser = JSON.parse(sessionStorage.getItem("existuser"));
        if (existuser && existuser.username) {
            setUsername(existuser.username);
        }
    }, []);

    const handlenavigate = (property) => {
        navigate(`/updatetheproperty`, { state: { updateproperty: property } });
    };

     //rent update
  const handlerentupdate = (propertys) => {
    navigate(`/updaterentproperty`, { state: { updatepropertys : propertys } });
  };


    const getuserproperty = async () => {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        try {
            const result = await Usersproperty(reqHeader);
            setUserproperty(result.data);
        } catch (error) {
            console.error("Error fetching user properties:", error);
        }
    };

    useEffect(() => {
        getuserproperty();
    }, []);


    const getrentuserproperty = async()=>{

        const token = sessionStorage.getItem('token')
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await Rentusersproperty(reqHeader)
        console.log(result.data);
        Setrentuser(result.data)
      }
    
    
      useEffect(()=>{
        getrentuserproperty()
      },[])


    const handledelete= async (id)=>{
        const token = sessionStorage.getItem('token')
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deleteproperty(id,reqHeader)
        console.log(result);
        if(result.status===200){
          getuserproperty()
        }
        else{
          console.log(result.response.data);
        }
    
      }


      const handledeletes =async (id)=>{
        const token = sessionStorage.getItem('token')
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deleterentproperty(id,reqHeader)
        console.log(result);
        if(result.status===200){
          getrentuserproperty()
        }
        else{
          console.log(result.response.data);
        }
    
      }
    

    return (
        <div style={{ marginTop: "7%" }} className='container'>
            <Header />
            <div>
                <h3 className='mt-5'>Welcome<span className='text-warning ms-2'>{username}</span></h3>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <Row className='container-fluid mt-3'>
                    <Col md={4}>
                        <Link to={'/adduserproperty'}>
                            <button className="btn btn-success">Add Property</button>
                        </Link>
                        <div className='mt-4'>
                            {userproperty?.length > 0 ?
                                userproperty.map((item, index) => (
                                    <div key={index} className='border 3px black d-flex align-items-center mb-3 p-3 w-75 rounded'>
                                        <h5>{item.place}</h5>
                                        <div className='ms-auto d-flex'>
                                            <button onClick={() => handlenavigate(item)} className='btn'><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button  onClick={()=>handledelete(item._id)} className='btn'><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                ))
                                :
                                <p className='text-danger fw-bolder fs-4'>NO MORE PROPERTIES</p>
                            }
                        </div>
                    </Col>
                    <Col md={4}>
    <Link to={'/adduserrentproperty'}>
   <button className="btn btn-success">
        Add For Rent
      </button>

   </Link>
      <div className='mt-4'>
              
            { rentuser?.length>0?
            rentuser.map((items)=>(  <div className='border 3px black d-flex mb-3 align-items-center p-3 rounded'>
            <h5>{items.place}</h5>
            <div className='ms-auto d-flex'>

            <button onClick={() => handlerentupdate(items)} className='btn'><i class="fa-solid fa-pen-to-square"></i></button>

  
                <button  onClick={()=>handledeletes(items._id)} className='btn'><i class="fa-solid fa-trash"></i></button>
  
  
  
            </div>
  
        </div>))
           :
            
              <p className='text-danger fw-bolder fs-4'>NO MORE PROPERTIES</p>
  }
          </div>

</Col>

                </Row>
            </div>
        </div>
    );
}

export default Newuserdashboard;
