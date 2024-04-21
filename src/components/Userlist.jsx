import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Allusers, deleteuser } from '../services/allapi';

function Userlist() {


    const handledelete= async (id)=>{
        const token = sessionStorage.getItem('token')
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await deleteuser(id,reqHeader)
        console.log(result);
        if(result.status===200){
            getallusers()
        }
        else{
          console.log(result.response.data);
        }
    
      }

    const [users, setUsers] = useState([]);

    const getallusers = async () => {
        try {
            const result = await Allusers();
            setUsers(result.data); 
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getallusers();
    }, []); 

    return (
        <div className="container mt-5">
         

            <div className="mt-5 text-center">
                <h2 className="fw-bolder">
                    USERS <span className="text-primary">LIST</span>
                </h2>
            </div>

            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table align-middle mb-0 bg-white">
                        <thead className="bg-light">
                            <tr>
                                <th> USER ID</th>
                                <th>NAME</th>
                                <th>E-MAIL</th>
                                <th>PASSWORD</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                   
                                    <td>
                                        <button onClick={()=>handledelete(user._id)}
                                            type="button"
                                            className="btn btn-danger btn-sm btn-rounded"
                                        >
                                            Delete User
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

export default Userlist;
