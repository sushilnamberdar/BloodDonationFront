import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { BaseUrl } from './Util/util';

const DonorResponseHospitalAdmin = () => {
    const [responses, setResponses] = useState([]);
    const [error, setError] = useState('');

    const location = useLocation(); // Get the location object from react-router-dom

    useEffect(async()=> {
       
        const token = localStorage.getItem("adminToken");
        const queryParams = new URLSearchParams(location.search);
        const requestId = queryParams.get('requestId');
        try {
            const response = await axios.get(`${BaseUrl}getHospitalDonorsResponsesAdmin`, {
                params: { requestId:requestId },
                headers: { Authorization: token }  // Use token directly without Bearer
            });
            // setResponses(response.data.donorsResponse);  // Set the responses in the state
            console.log("Donor response in admin hospital =>", response);
        } catch (error) {
            console.error('Request failed:', error);
            setError('Failed to fetch donor responses. Please try again.');
        }
    

    },[])
    
    return (
        <div>
            <div className='flex mt-7 items-center justify-center'>
                <Link to='/admin' className="text-lg block mb-4 px-3 py-1 rounded-2xl no-underline hover:underline hover:bg-green-700 bg-green-500 text-white">
                    Admin Home
                </Link>
            </div>
            <hr className='mt-10'/>
            <h2>Donor Responses Admin</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responses.length > 0 ? (
                <ul className='donor-responses'>
                    {responses.map((response, index) => (
                        <li key={index}>
                            <p>Donor ID: {response.donorId}</p>
                            <p>Phone Number: {response.phoneNumber}</p>
                            <p>Blood Group: {response.bloodGroup}</p>
                            <br /><br /><br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No responses available</p>
            )}
        </div>
    );
};

export default DonorResponseHospitalAdmin;
