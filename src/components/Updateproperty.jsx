import React from 'react'
import { useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { base_Url } from '../services/baseurl';
import { Editusersproperty } from '../services/allapi';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function Updateproperty() {

    const navigate = useNavigate()

    const[preview,setpreview] = useState("")


    const location = useLocation();
    const { updateproperty } = location.state || {};



    const[property,Setproperty] = useState({
        id: updateproperty?._id || '',
    ID: updateproperty?.ID || '',
    Price: updateproperty?.Price || '',
    place: updateproperty?.place || '',
    address: updateproperty?.address || '',
    type: updateproperty?.type || '',
    furnishing: updateproperty?.furnishing || '',
    bedroom: updateproperty?.bedroom || '',
    bathroom: updateproperty?.bathroom || '',
    floors: updateproperty?.floors || '',
    carparking: updateproperty?.carparking || '',
    overview: updateproperty?.overview || '',
    propertyimage:""
      })
      

      useEffect(()=>{
        if(property.propertyimage){
      setpreview(URL.createObjectURL(property.propertyimage))   
     }
    
      },[property.propertyimage])
      

      const handleClear = ()=>{
        Setproperty({
          id: updateproperty._id,  
            ID: updateproperty.ID,
            Price: updateproperty.Price,
            place: updateproperty.place,
            address: updateproperty.address,
            type: updateproperty.type,
            furnishing: updateproperty.furnishing,
            bedroom: updateproperty.bedroom,
            bathroom: updateproperty.bathroom,
            floors: updateproperty.floors,
            carparking: updateproperty.carparking,
            overview: updateproperty.overview,
            propertyimage: ""
        })
        setpreview('')
      }


      const handleupdate = async()=>{
        const{id,ID,Price,place,address,type,furnishing,bedroom,bathroom,floors,carparking,overview,propertyimage} = property
      
          if(!ID||!Price ||!place||!address||!type||!furnishing||!bedroom||!bathroom||!floors||!carparking||!overview){
      
      
            alert('please fill the form completely')
      }
      else{
        const reqBody = new FormData()
            reqBody.append('ID',ID)
            reqBody.append('Price',Price)
            reqBody.append('place',place)
            reqBody.append('address',address)
            reqBody.append('type',type)
            reqBody.append('furnishing',furnishing)
            reqBody.append('bedroom',bedroom)
            reqBody.append('bathroom',bathroom)
            reqBody.append('floors',floors)
            reqBody.append('carparking',carparking)
            reqBody.append('overview',overview)
            preview?reqBody.append('propertyimage',propertyimage):reqBody.append("propertyimage",updateproperty.propertyimage)
      
      
      const token = sessionStorage.getItem('token')
      if(preview){
      
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
      
        const result= await Editusersproperty(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          Swal.fire({
            title: "UPDATED",
            text: "",
            icon: "success"
          });          navigate('/dashboard')
        }
        else{
          console.log(result.response.data);
        }
      
      }
      else{
      
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result= await Editusersproperty(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){

          Swal.fire({
            title: "UPDATED",
            text: "",
            icon: "success"
          });      
                    navigate('/dashboard')

      
        }
        else{
          console.log(result.response.data);
        }
      
      
      }
      
      }
      }
      
    
    

  return (
    <div className="container mt-5">
        <div style={{ width: "100%", height: "80vh" }} className='d-flex justify-content-center align-items-center'>
          
      <div className='d-flex align-items-center justify-content-center'>
      <Row>
        <div className='d-flex align-items-center justify-content-center '>
            <h1 style={{fontWeight:"bolder"}}>UPDATE THE PROPERTY DETAILS</h1>
            

        </div>
       
            <Col md={6}>
            <label className='text-center mt-5 p-5 ml-5'>
            <input  type="file" style={{ display: "none" }}onChange={e=>Setproperty({...property,propertyimage:e.target.files[0]})}  />
            <img
              width={'120%'}
              height={'200px'}
              src={preview?preview:`${base_Url}/uploads/${updateproperty.propertyimage}`}

              alt="no image"
            />
          </label>
            
            </Col>
            <Col md={6}>
            <div className='d-flex justify-content-center align-items center flex-column w-100'>
              <div className='mb-2 w-100 mt-2'>
               <input type="text" className='form-control' value={property.ID}onChange={(e)=>Setproperty({...property,ID:e.target.value})} placeholder='Pincode :-' />
               </div>
               <div className='mb-2 w-100 '>
               <input type="text" className='form-control' value={property.Price}onChange={(e)=>Setproperty({...property,Price:e.target.value})} placeholder='price :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.place}onChange={(e)=>Setproperty({...property,place:e.target.value})} placeholder='PLACE :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.address}onChange={(e)=>Setproperty({...property,address:e.target.value})} placeholder='ADDRESS :-'  />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.type}onChange={(e)=>Setproperty({...property,type:e.target.value})} placeholder='TYPE :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.furnishing}onChange={(e)=>Setproperty({...property,furnishing:e.target.value})} placeholder='FURNISHING :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.bedroom}onChange={(e)=>Setproperty({...property,bedroom:e.target.value})} placeholder='NO:OF BEDROOM :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.bathroom}onChange={(e)=>Setproperty({...property,bathroom:e.target.value})} placeholder='NO:OF BATHROOM :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.floors}onChange={(e)=>Setproperty({...property,floors:e.target.value})} placeholder='NO:OF FLOORS :-' />
               </div>
               <div className='mb-2 w-100'>
               <input type="text" className='form-control'value={property.carparking}onChange={(e)=>Setproperty({...property,carparking:e.target.value})} placeholder='CAR PARKING :-' />
               </div>
              
               <div className='mb-2 w-100'>
               <textarea type="text" className='form-control'value={property.overview}onChange={(e)=>Setproperty({...property,overview:e.target.value})} placeholder='OVERVIEW :-' />
               </div>
                
              </div>
             <div className='d-flex align-items-center justify-content-evenly'>
             <button onClick={handleClear}  type="submit" className="btn btn-danger">
          CLEAR
        </button>
        <button onClick={handleupdate}  type="submit" className="btn btn-success">
          UPDATE
        </button>
             </div>
                
            
            </Col>
          </Row>
        
    
          
        </div>
        </div>
       
      
      </div>
    
  )
}

export default Updateproperty