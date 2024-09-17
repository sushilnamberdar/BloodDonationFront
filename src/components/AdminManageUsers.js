import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseUrl } from './Util/util';



const AdminManageUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [registeredHospital, setRegisteredHospital] = useState([]);

  const token = localStorage.getItem('adminToken');
  useEffect(() => {
    fetchPendingData();
  }, []);
  const fetchPendingData = async () => {
    try {
      const result = await axios.get(`${BaseUrl}pending-users`, { headers: { Authorization: token } });
      setRegisteredUsers(result.data.registeredUsers);
      setRegisteredHospital(result.data.registeredHospitals);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${BaseUrl}delete-user/${userId}`, { headers: { Authorization: token } });
      setRegisteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const deleteHospital = async (hospitalId) => {
    try {
      await axios.delete(`${BaseUrl}delete-hospital/${hospitalId}`, { headers: { Authorization: token } });
      setRegisteredHospital((prevHospitals) => prevHospitals.filter((hospital) => hospital._id !== hospitalId));
    } catch (error) {
      console.error('Failed to delete hospital:', error);
    }
  };

  return (
    <div className="p-4">
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-red-700">Registered Users</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {registeredUsers.map((user) => (
            <div key={user._id} className="w-full sm:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 border border-red-200 hover:bg-gray-100 transition relative">
              <p><strong>ID:</strong> {user._id}</p>
              <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
              <p><strong>Joined:</strong> {new Date(user.joinedOn).toLocaleDateString()}</p>
              <p><strong>Phone:</strong> {user.phoneNumber}</p>
              <button
                onClick={() => deleteUser(user._id)}
                className="mt-4 text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-lg"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4 text-red-700">Registered Hospitals</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {registeredHospital.map((hospital) => (
            <div key={hospital._id} className="w-full sm:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 border border-red-200 hover:bg-gray-100 transition relative">
              <p><strong>Name:</strong> {hospital.name}</p>
              <p><strong>ID:</strong> {hospital._id}</p>
              <p><strong>Joined:</strong> {new Date(hospital.joinedOn).toLocaleDateString()}</p>
              <p><strong>Phone:</strong> {hospital.contact.phone}</p>
              <button
                onClick={() => deleteHospital(hospital._id)}
                className="mt-4 text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-lg"
              >
                Delete Hospital
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminManageUsers;
