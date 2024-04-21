import React, { useEffect, useState } from 'react';
import Propertycard from './Propertycard';
import { Row, Col } from 'react-bootstrap';
import { Allhomeproperty } from '../services/allapi';

function Property() {
    const [searchkey, setSearchkey] = useState("");
    const [allproperty, setAllproperty] = useState([]);

   
    const getallproperty = async()=>{
        const result = await Allhomeproperty(searchkey)
        console.log(result.data);
if(result.status===200){
    setAllproperty(result.data)
}
    }
    console.log(searchkey);


    useEffect(()=>{
        getallproperty()
    },[searchkey])
    return (
        <>
            <div className="form-group d-flex">
                <label htmlFor="inputExample"></label>
                <input
                    value={searchkey}
                    onChange={e => setSearchkey(e.target.value)}
                    style={{ width: "50%", marginLeft: "25%" }}
                    type="text"
                    className="form-control"
                    id="inputExample"
                    placeholder="Enter District..."
                />
            </div>
            <Row>
                {allproperty?.length > 0 ?
                    allproperty?.map((item) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                            <Propertycard property={item} />
                        </Col>
                    )) :
                    <p className="text-center mt-5 fs-2 fw-bolder text-red">NO RESULT</p>
                }
            </Row>
        </>
    );
}

export default Property;
