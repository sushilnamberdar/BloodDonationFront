import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseUrl } from '../Util/util';

const HospitalDetails = () => {
    const [requestId, setRequestId] = useState('');
    const [hospital, setHospital] = useState({});
    const [donationRequests, setDonationRequests] = useState([]);
    const [previousDonationRequests, setPreviousDonationRequests] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const requestId = queryParams.get('userId');
            setRequestId(requestId);

            if (requestId) {
                const token = localStorage.getItem('adminToken');
                try {
                    const response = await axios.get(`${BaseUrl}hospital-details`, {
                        headers: { Authorization: token },
                        params: { requestId: requestId }
                    });
                    console.log("this is the response from the server for fetchData =>", response.data);
                    setHospital(response.data.hospitalDetails || {});
                    
                    // Example for fetching donation requests
                    // const donationResponse = await axios.get(`${BaseUrl}donation-requests`, {
                    //     headers: { Authorization: token },
                    //     params: { requestId: requestId }
                    // });
                    // setDonationRequests(donationResponse.data.activeRequests || []);
                    // setPreviousDonationRequests(donationResponse.data.previousRequests || []);

                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [location.search]);

    return (
        <>
            <div className="p-6">
                <div className='flex items-center justify-center'>
                    <Link to='/admin' className="text-lg block mb-4 px-3 py-1 rounded-2xl no-underline hover:underline hover:bg-green-700 bg-green-500 text-white"> Admin Home</Link>
                </div>
                <hr className='text-white border-5' />
                <div className='mt-10 space-y-10'>
                    {/* Hospital Details Section */}
                    <div className="border border-gray-300 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold break-words">Hospital Details {requestId}</h2>
                        <p><strong>Name:</strong> {hospital.name}</p>
                        <p><strong>Address:</strong> {hospital.address ? `${hospital.address.street}, ${hospital.address.city}, ${hospital.address.state}, ${hospital.address.postalCode}` : 'N/A'}</p>
                        <p><strong>Phone:</strong> {hospital.contact ? hospital.contact.phone : 'N/A'}</p>
                        <p><strong>Email:</strong> {hospital.contact ? hospital.contact.email : 'N/A'}</p>
                        <p><strong>Website:</strong> {hospital.website}</p>
                        <p><strong>Operating Hours:</strong> {hospital.operatingHours ? Object.entries(hospital.operatingHours).map(([day, hours]) => `${day}: ${hours}`).join(', ') : 'N/A'}</p>
                        <p><strong>Special Instructions:</strong> {hospital.specialInstructions}</p>
                        <p><strong>Status:</strong> {hospital.status}</p>
                        <p><strong>Coordinates:</strong> Latitude: {hospital.coordinates ? hospital.coordinates.latitude : 'N/A'}, Longitude: {hospital.coordinates ? hospital.coordinates.longitude : 'N/A'}</p>
                        <p><strong>Has Blood Donation Center:</strong> {hospital.hasBloodDonationCenter ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HospitalDetails;
