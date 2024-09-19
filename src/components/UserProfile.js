import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from './Util/util';
import { FaEye, FaEyeSlash, FaPhoneAlt, FaMapMarkerAlt, FaTint, FaUserCheck, FaCalendarAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BaseUrl}profileDetails`, {
          headers: { Authorization: token },
        });
        setUser(response.data.user);
        console.log('This is the response from the server for fetchData =>', response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    userDetails();
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(user)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-6">User Profile</h2>

        {/* Display User Information */}
        <div className="space-y-4">
          {/* Blood Group */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaTint className="text-red-600 mr-2" /> Blood Group:
            </span>
            <span className='text-red-500'>{user.bloodGroup?.toUpperCase() ?? 'N/A'}</span>
            </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaPhoneAlt className="text-red-600 mr-2" /> Phone Number:
            </span>
            <span>{user.phoneNumber || 'N/A'}</span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaUserCheck className="text-red-600 mr-2" /> Status:
            </span>
            <span className={`px-2 py-1 rounded ${user.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {user.status || 'N/A'}
            </span>
          </div>

          {/* Location */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaMapMarkerAlt className="text-red-600 mr-2" /> Location:
            </span>
            {user.location ? (
              <span>
                Latitude: {user.location.latitude}, Longitude: {user.location.longitude}
              </span>
            ) : (
              'N/A'
            )}
          </div>

          {/* Password with visibility toggle */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaEye className="text-red-600 mr-2" /> Password:
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={user.password || ''}
                className="border border-gray-300 rounded px-4 py-2"
                readOnly
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Joined On */}
          <div className="flex justify-between items-center">
            <span className="flex items-center font-semibold">
              <FaCalendarAlt className="text-red-600 mr-2" /> Joined On:
            </span>
            <span>{new Date(user.joinedOn).toLocaleDateString() || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
