import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import logo from '../images/User.png';  // Replace with hospital logo if available
import { useNavigate } from 'react-router-dom';  // To redirect after login
import { BaseUrl } from '../Util/util';

const HospitalLoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: ''
    },
    contact: {
      phone: '',
      email: ''
    },
    coordinates: {
      latitude: '',
      longitude: ''
    },
    hasBloodDonationCenter: false,
    facilities: [],
    website: '',
    specialInstructions: '',
    password: ''
  });

  const [signup, setSignup] = useState(false);
  const [htoken, setToken] = useState(localStorage.getItem('htoken') || "");
  const navigate = useNavigate();

  // Initialize animations
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  // If htoken is already present, navigate to dashboard (or any other page)
  useEffect(() => {
    if (htoken) {
      navigate('/hospitalDashboard');  // Replace with the correct path for the logged-in dashboard
    }
  }, [htoken, navigate]);

  // Handle login logic
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BaseUrl}loginHospital`, { email: formData.contact.email, password: formData.password }); // Use email and password for login
      localStorage.setItem('htoken', response.data.token);  // Store htoken in localStorage
      setToken(response.data.token);  // Update state with token
      navigate('/hospitalDashboard');  // Redirect after successful login
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  // Handle signup logic
  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BaseUrl}hospitalSignup`, formData);  // Pass the entire formData object
      handleLogin();  // Auto-login after signup
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed');
    }
  };

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value
      }
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [name]: value
      }
    }));
  };

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      coordinates: {
        ...prevData.coordinates,
        [name]: value
      }
    }));
  };

  const handleOperatingHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      operatingHours: {
        ...prevData.operatingHours,
        [name]: value
      }
    }));
  };

  // If htoken exists, show dashboard message (or redirect could be handled here)
  if (htoken) {
    return <p>Loading your dashboard...</p>;  // Optionally, render something or handle with `navigate`
  }
console.log(formData)
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Centered Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white border-2 border-gray-300 rounded-lg p-6 shadow-md" data-aos="fade-up">
          <div className="text-center">
            <img alt="Hospital Logo" src={logo} className="mx-auto h-10 w-auto" />
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {signup ? 'Sign Up Your Hospital' : 'Login to Your Hospital Account'}
            </h2>
          </div>

          <div className="mt-8">
            <div className="space-y-6">
              {/* Hospital Name - Only for Signup */}
              {signup && (
                <div data-aos="fade-up">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Hospital Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter Hospital Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              {/* Address Fields */}
              {signup && (
                <>
                  <div data-aos="fade-up">
                    <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                      Street Address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        name="street"
                        type="text"
                        required
                        placeholder="Enter Street Address"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div data-aos="fade-up">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        placeholder="Enter City"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div data-aos="fade-up">
                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                      State
                    </label>
                    <div className="mt-2">
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        placeholder="Enter State"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div data-aos="fade-up">
                    <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                      Postal Code
                    </label>
                    <div className="mt-2">
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        required
                        placeholder="Enter Postal Code"
                        value={formData.address.postalCode}
                        onChange={handleAddressChange}
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Contact Fields */}
              <div data-aos="fade-up">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        contact: { ...prevData.contact, email: e.target.value },
                      }))
                    }
                    className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm"
                  />

                </div>
              </div>

              {/* Password */}
              <div data-aos="fade-up">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Phone Number - Only for Signup */}
              {signup && (
                <div data-aos="fade-up">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      required
                      placeholder="Enter Phone Number"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          contact: { ...prevData.contact, phone: e.target.value },
                        }))
                      }
                      className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm"
                    />

                  </div>
                </div>
              )}

              {/* Coordinates */}
              {signup && (
                <>
                  <div data-aos="fade-up">
                    <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
                      Latitude
                    </label>
                    <div className="mt-2">
                      <input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="any"
                        required
                        placeholder="Enter Latitude"
                        value={formData.coordinates.latitude}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            coordinates: { ...prevData.coordinates, latitude: e.target.value },
                          }))
                        }
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm"
                      />

                    </div>
                  </div>

                  <div data-aos="fade-up">
                    <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-gray-900">
                      Longitude
                    </label>
                    <div className="mt-2">
                      <input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="any"
                        required
                        placeholder="Enter Longitude"
                        value={formData.coordinates.longitude}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            coordinates: { ...prevData.coordinates, longitude: e.target.value },
                          }))
                        }
                        className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm"
                      />

                    </div>
                  </div>
                </>
              )}
              {/* Website */}
              {signup && (
                <div data-aos="fade-up">
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      id="website"
                      name="website"
                      type="url"
                      required
                      placeholder="Enter Website URL"
                      value={formData.website}
                      onChange={handleChange}
                      className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              {signup && (
                <div data-aos="fade-up">
                  <label htmlFor="specialInstructions" className="block text-sm font-medium leading-6 text-gray-900">
                    Special Instructions
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      rows="3"
                      placeholder="Enter any special instructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      className="block w-full rounded-md py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}


              {/* Checkbox for Blood Donation Center */}
              {signup && (
                <div className='flex items-center  ' data-aos="fade-up">
                  <label htmlFor="hasBloodDonationCenter" className="block text-sm font-medium leading-6 text-gray-900">
                    Has Blood Donation Center
                  </label>
                  <input
                    id="hasBloodDonationCenter"
                    name="hasBloodDonationCenter"
                    type="checkbox"
                    checked={formData.hasBloodDonationCenter}
                    onChange={(e) => setFormData((prevData) => ({
                      ...prevData,
                      hasBloodDonationCenter: e.target.checked
                    }))}
                    className=" ml-4"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {signup ? (
                <div data-aos="fade-left">
                  <button
                    onClick={handleSignup}
                    className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div data-aos="fade-left">
                  <button
                    onClick={handleLogin}
                    className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Toggle between Login and Signup */}
              <div className="mt-4" data-aos="fade-left">
                <button
                  onClick={() => setSignup(!signup)}
                  className="w-full flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500"
                >
                  {signup ? 'Already have an account? Login' : 'Create a new hospital account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLoginSignup;
