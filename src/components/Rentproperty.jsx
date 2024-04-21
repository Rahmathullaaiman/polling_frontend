import { Row,Col } from 'react-bootstrap'
import Rentcard from './Rentcard'
import { Getrentpropertys } from '../services/allapi'
import { useState,useEffect } from 'react'

function RentProperty() {


    const[searchkey,Setsearchkey] = useState("")
    const[allproperty,Setallproperty] = useState([])


    const getrentproperty = async()=>{
        const result = await Getrentpropertys(searchkey)
        console.log(result.data);
if(result.status===200){
    Setallproperty(result.data)
}
    }
    console.log(searchkey);


    useEffect(()=>{
        getrentproperty()
    },[searchkey])
    
    return (
        <>
         <div className="form-group d-flex">
              <label htmlFor="inputExample"></label>
              <input value={searchkey}onChange={e=>Setsearchkey(e.target.value)}  style={{ width: "50%",marginLeft:"25%" }} type="text" className="form-control" id="inputExample" placeholder="Enter District..." />
            </div>
            
            <Row>
            {allproperty?.length>0?
                allproperty?.map((item)=>( <Col sm={12} md={6} lg={4} xl={3}>
                    <Rentcard rentproperty = {item} />
                    
                </Col>))
               :<p className="text-center mt-5 fs-2 fw-bolder text-red">NO RESULT</p>
                    }
               
            </Row>
            
            

        </>
    )
}

export default RentProperty;