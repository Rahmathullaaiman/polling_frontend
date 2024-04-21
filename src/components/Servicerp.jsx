import React, { useEffect, useState } from 'react';
import { Getreqs } from '../services/allapi';
import { Link } from 'react-router-dom';


function Servicerp() {
    const [data, setData] = useState([]);

    const [allproperty, setAllproperty] = useState([]);

    const getall = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const result = await Getreqs(reqHeader);
            console.log(result);
    
            // Assuming existworker is the object retrieved from sessionStorage
            const existworker = JSON.parse(sessionStorage.getItem('existworker'));
            console.log(existworker._id);
    
            if (Array.isArray(result.data)) {
                // Filter result.data based on matching workerid
                const filteredResult = result.data.filter(item => item.workerid === existworker._id);
                console.log(filteredResult);
    
                // Update state with filtered result
                setData(filteredResult); // Change this line to setData
            } else {
                console.error('Error fetching rent history: Result.data is not an array');
            }
        } catch (error) {
            console.error('Error fetching rent history:', error);
        }
    };
    

    useEffect(() => {
        getall();
    }, []);

    const handleApprove = (id) => {
        // Logic to update the status to Approved in the backend using API calls
        console.log(`Approving status of item with ID ${id}`);
        // You need to implement the logic for updating the status in your backend
    };

    return (
        <div>
            <h1> worker requests</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Location URL</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>User ID</th>
                        <th>Worker ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the data and generate table rows */}
                    {data.map(item => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.bookersusername}</td>
                            <td>{item.bookingworkername}</td>
                            <td><a href={item.locationURL}>{item.locationURL}</a></td>
                            <td>{item.service}</td>
                            <td>{item.status ? "Active" : "Inactive"}</td>
                            <td>{item.userId}</td>
                            <td>{item.workerid}</td>
                            <td>
                            <Link to={`/chatss/${item.userId}/${item.bookersusername}`}>Chat</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Servicerp;
