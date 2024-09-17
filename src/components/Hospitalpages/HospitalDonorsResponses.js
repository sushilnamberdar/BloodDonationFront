import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../Util/util';

const HospitalDonorsResponsesDetails = () => {
  const { requestId } = useParams(); // Fetch the requestId from URL parameters
  const [donorsResponses, setDonorsResponses] = useState(null);
  const [error, setError] = useState(null);
  const phoneNumber = ''; // Add logic to set this dynamically if needed

  useEffect(() => {
    const fetchDonorsResponses = async () => {
      try {
        const response = await axios.get(`${BaseUrl}HospitalDonorsResponses`, {
          params: { requestId, phoneNumber },
        });
        setDonorsResponses(response.data.donorsResponse);
      } catch (err) {
        setError(err.message);
      }
    };

    if (requestId) {
      fetchDonorsResponses();
    }
  }, [requestId, phoneNumber]);

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
        Error: {error}
      </div>
    );
  }

  // Removed the loading state; show an empty message when there's no response data
  return (
    <div className="w-full max-w-2xl h-screen mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Donor Responses</h1>
      {donorsResponses === null ? (
        <p className="text-lg text-gray-600">No data available</p>
      ) : donorsResponses.length === 0 ? (
        <p className="text-lg text-gray-600">No responses found</p>
      ) : (
        <ul className="space-y-4">
          {donorsResponses.map((response, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
            >
              <p className="text-lg font-medium text-gray-900">Donor Name: {response.name}</p>
              <p className="text-gray-700">Phone Number: {response.phoneNumber}</p>
              {/* Add more fields as necessary */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalDonorsResponsesDetails;
