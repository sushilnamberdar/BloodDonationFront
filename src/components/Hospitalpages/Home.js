import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Util/util';
import { CgLaptop } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Home = () => {
    const [activeRequests, setActiveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('htoken')
            try {
                const response = await axios.get(`${BaseUrl}getHospitalRequests`, {
                    headers: { Authorization: token } // Replace with actual token if needed
                });
                setActiveRequests(response.data.activeRequests);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);


    if (loading) return <p className="text-center py-4">Loading...</p>;
    if (error) return <p className="text-center py-4 text-red-500">Error: {error}</p>;
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Active Requests</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {activeRequests.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {activeRequests.map((request) => (
                             <Link to={`/HospitalDonorsResponses?userId=${request._id}`} key={request._id} className="w-full sm:w-1/2 lg:w-1/3">
                            <li key={request._id} className="mb-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-2 mb-2">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Request ID:</span>
                                        <span>{request._id}</span>
                                    </div>
                                    <div className="flex flex-col mt-2 sm:mt-0">
                                        <span className="font-semibold">Date:</span>
                                        <span>{new Date(request.dateOfQuery).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col mt-2 sm:mt-0">
                                        <span className="font-semibold">Donors Response:</span>
                                        <span>{request.donorsResponse}</span>
                                    </div>
                                </div>
                            </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>No active requests available.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
