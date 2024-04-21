import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Adduserrentproperties } from '../services/allapi';
import { Row,Col } from 'react-bootstrap';
import Swal from 'sweetalert2';


function Adduserrentproperty() {

    const[preview,setpreview] = useState("")
    
    const navigate = useNavigate()

  const[property,Setproperty] = useState({
        
    ID:"",
    Price:"",
    place:"",
    address:"",
    type:"",
    furnishing:"",
    bedroom:"",
    bathroom:"",
    floors:"",
    carparking:"",
    overview:"",
    propertyimage:""
  })


  console.log(property);

  const handleclear = ()=>{
    Setproperty({
      ID:"",
      Price:"",
      place:"",
      address:"",
      type:"",
      furnishing:"",
      bedroom:"",
      bathroom:"",
      floors:"",
      carparking:"",
      overview:"",
      propertyimage:""
    })

  }
  const[token,settoken] = useState("")

 



   
    
  useEffect(()=>{
    if(property.propertyimage)
    {(setpreview(URL.createObjectURL(property.propertyimage)))}
 
   },[property.propertyimage])
   console.log(preview);

   useEffect(()=>{
    if(sessionStorage.getItem("token")){
    settoken(sessionStorage.getItem('token'))
    }
    else{
      settoken("")
    }
   },[])



   const adduserrentproperty =async (e)=>{
    e.preventDefault()

    const{ID,Price,place,address,type,furnishing,bedroom,bathroom,floors,carparking,overview,propertyimage} = property

    if(!ID||!Price ||!place||!address||!type||!furnishing||!bedroom||!bathroom||!floors||!carparking||!overview||!propertyimage){
      alert('please fill the form completely')
    }
    else{
      //reqbody
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
      reqBody.append('propertyimage',propertyimage)


    if(token){ 
       const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`

      }



      const result =  await Adduserrentproperties(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        console.log(result.data);
        Swal.fire({
            title: "REQUEST SENT SUCCESSFULLY",
            text: "",
            icon: "success"
          });
          navigate('/home')
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
        <h1 style={{fontWeight:"bolder"}}>THE FASTEST AND EASIEST WAY</h1>
        

    </div>
    <div className='d-flex align-items-center justify-content-center mt-1'>
        <h1 style={{fontWeight:"bolder"}}>TO SELL YOUR <span className='text-primary'>PROPERTY</span></h1>
        

    </div>
        <Col md={6}>
        <label className='text-center mt-5 p-5 ml-5'>
        <input  type="file" style={{ display: "none" }}onChange={(e)=>Setproperty({...property,propertyimage:e.target.files[0]})}/>
        <img
          width={'120%'}
          height={'200px'}
        src={preview?preview:"data:image/png;base64,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"}

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
         <button onClick={handleclear} type="submit" className="btn btn-danger">
      CLEAR
    </button>
    <button onClick={adduserrentproperty}  type="submit" className="btn btn-success">
      SUBMIT
    </button>
         </div>
            
        
        </Col>
      </Row>
    

      
    </div>
    </div>
   
  
  </div>

  )
}

export default Adduserrentproperty