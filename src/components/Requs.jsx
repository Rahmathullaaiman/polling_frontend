import React, { useEffect, useState } from 'react';
import { Getuse } from '../services/allapi';
import { Link } from 'react-router-dom';

function Requs() {
    const [data, setData] = useState([]);

    const getalls = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const result = await Getuse(reqHeader);
            console.log(result);
            setData(result.data); // Set the fetched data to the state variable
        } catch (error) {
            console.error('Error fetching rent history:', error);
        }
    };

    useEffect(() => {
        getalls();
    }, []);

    return (
        <div>
            <h1> user request</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>bookerusername</th>
                        <th>Date</th>
                        <th>workername</th>
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
                        <tr key={''}>
                            <td>{item._id}</td>
                            <td>{item.bookersusername}</td>
                            <td>{item.bookingworkername}</td>
                            <td><a href={item.locationURL}>{item.locationURL}</a></td>
                            <td>{item.service}</td>
                            <td>{item.status ? "Active" : "Inactive"}</td>
                            <td>{item.userId}</td>
                            <td>{item.workerid}</td>
                            <td>
                            <Link to={`/chat/${item.workerid}/${item.bookingworkername}`}>Chat</Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Requs;
