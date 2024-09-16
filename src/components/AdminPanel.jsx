// AdminPanel.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles/AdminPanel.css';
import { Link } from 'react-router-dom';
import { BaseUrl } from './Util/util';

function AdminPanel({ setAdminToken }) {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [pendingHospital, setpendingHospital] = useState([]);
    const [registeredHospital, setRegisteredHospital] = useState([]);
    const [users, setUsers] = useState([])
    const token = localStorage.getItem('adminToken')

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const result = await axios.get(`${BaseUrl}pending-users`, { headers: { Authorization: token } });
            setPendingUsers(result.data.pendingUsers);
            setRegisteredUsers(result.data.registeredUsers);
            setpendingHospital(result.data.pendingHospitals);
            setRegisteredHospital(result.data.registeredHospitals);
            console.log(result.data)
        } catch (error) {
            console.log("error is in fetchPendingUsers")
            console.error('Request failed:', error);
        }

    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`${BaseUrl}approve-user`, { id }, {
                headers: { Authorization: token }
            });
            setPendingUsers(pendingUsers.filter(user => user._id !== id));
            fetchPendingUsers();
        } catch (error) {
            console.log("Error in handleApprove");
            console.error('Request failed:', error);
        }
    };

    const handleHospitalApprove = async (id) => {
        try {
            await axios.put(`${BaseUrl}approve-hospital`, { id }, {
                headers: { Authorization: token }
            });
            setpendingHospital(pendingHospital.filter(user => user._id !== id));
            fetchPendingUsers();
        } catch (error) {
            console.log("Error in handleApprove");
            console.error('Request failed:', error);
        }
    };

    const handleReject = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete(`${BaseUrl}reject-user`, {
                params: { id },
                headers: { Authorization: token }
            });
            console.log(response)
            setPendingUsers(pendingUsers.filter(user => user._id !== id));
        } catch (error) {
            console.log("Error in handleReject");
            console.error('Request failed:', error);
        }
    };

    const handleRejectHospital = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete(`${BaseUrl}reject-hospital`, {
                params: { id },
                headers: { Authorization: token }
            });
            console.log(response)
            setpendingHospital(pendingHospital.filter(user => user._id !== id));
        } catch (error) {
            console.log("Error in handleReject");
            console.error('Request failed:', error);
        }
    }

    const adminLogOut = () => {
        localStorage.clear();
        setAdminToken('');
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Top bar with title and logout button */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2>Pending User Requests</h2>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={adminLogOut}
                >
                    Log Out
                </button>
            </div>

            {/* Main content */}
            <div className="p-4 flex-grow">
                {pendingUsers.length === 0 ? (
                    <p>No Requests are pending</p>
                ) : (
                    <ul>
                        {pendingUsers.map(user => (
                            <li key={user._id} className="mb-4 flex items-center justify-center">
                                <div className="flex gap-4 flex-wrap">
                                    <p>Phone Number - {user.phoneNumber}</p>

                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleApprove(user._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleReject(user._id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}


                <div className="p-4 flex-grow">
                    {pendingHospital.length === 0 ? (
                        <p>No Requests are pending</p>
                    ) : (
                        <ul>
                            {pendingHospital.map(hospital => (
                                <li key={hospital._id} className="mb-4 flex items-center justify-center">
                                    <div className="flex gap-4 flex-wrap">
                                        {/* Display all the fields from the hospital object */}
                                        <p><strong>Name:</strong> {hospital.name}</p>
                                        <p><strong>Address:</strong> {hospital.address.street}, {hospital.address.city}, {hospital.address.state}, {hospital.address.postalCode}</p>
                                        <p><strong>Phone Number:</strong> {hospital.contact.phone}</p>
                                        <p><strong>Email:</strong> {hospital.contact.email}</p>
                                        <p><strong>Coordinates:</strong> Latitude: {hospital.coordinates.latitude}, Longitude: {hospital.coordinates.longitude}</p>
                                        <p><strong>Facilities:</strong> {hospital.facilities.length > 0 ? hospital.facilities.join(', ') : 'None'}</p>
                                        <p><strong>Has Blood Donation Center:</strong> {hospital.hasBloodDonationCenter ? 'Yes' : 'No'}</p>
                                        <p><strong>Operating Hours:</strong> Monday: {hospital.operatingHours.monday}, Tuesday: {hospital.operatingHours.tuesday}, Wednesday: {hospital.operatingHours.wednesday}, Thursday: {hospital.operatingHours.thursday}, Friday: {hospital.operatingHours.friday}, Saturday: {hospital.operatingHours.saturday}, Sunday: {hospital.operatingHours.sunday}</p>
                                        <p><strong>Special Instructions:</strong> {hospital.specialInstructions}</p>
                                        <p><strong>Status:</strong> {hospital.status}</p>
                                        <p><strong>Website:</strong> {hospital.website}</p>

                                        {/* Action buttons */}
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleHospitalApprove(hospital._id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleRejectHospital(hospital._id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2 className="mt-8">Registered Users</h2>
                <ul className="admin-registeredUsers">
                    {registeredUsers.map(user => (
                        <Link to={`/userDetails?userId=${user._id}`} key={user._id}>
                            <li className="mb-4 border-b pb-4">
                                <p>UserId - {user._id}</p>
                                <p>Blood Group - {user.bloodGroup}</p>
                                <p>Joined On - {new Date(user.joinedOn).toLocaleDateString()}</p>
                                <p>Phone Number - {user.phoneNumber}</p>
                            </li>
                        </Link>
                    ))}
                </ul>


                <h2 className="mt-8">Registered Hospital</h2>
                <ul className="admin-registeredUsers">
                    {registeredHospital.map(hospital => (
                        <Link to={`/hospitalDetails?userId=${hospital._id}`} key={hospital._id}>
                            
                            <li className="mb-4 border-b pb-4">
                            <p>Hospital Name  - {hospital.name}</p>
                                <p>Hospital Id - {hospital._id}</p>
                                <p>Joined On - {new Date(hospital.joinedOn).toLocaleDateString()}</p>
                                <p>Phone Number - {hospital.contact.phone}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default AdminPanel;
