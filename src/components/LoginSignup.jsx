import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/iinsaf.png';
import left from './images/bloodDonationLogin3.jpg';
import login1 from './images/bloodDonationLogin1.jpg';
import login2 from './images/bloodDonationLogin2.jpg';
import login3 from './images/bloodDonationLogin3.jpg';
import login4 from './images/bloodDonationLogin4.jpg';
import login5 from './images/bloodDonationLogin5.jpg';
import { BaseUrl } from './Util/util';

const images = [left, login1, login2, login3, login4, login5];

const LoginSignup = ({ setToken, signup, setsignup }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({
                        longitude,
                        latitude
                    });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("Please enable location permissions for this app.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Location information is unavailable. Please try again later.");
                            break;
                        case error.TIMEOUT:
                            alert("The request to get your location timed out. Please try again.");
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("An unknown error occurred. Please try again.");
                            break;
                        default:
                            console.log("There is no error is fetching location");
                    }
                }
            );
        } else {
            alert('Geolocation is not supported by this browser');
        }
    };
    getLocation();
}, [])

  // Slide effect for images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleLogin = async () => {
    if (location.longitude === null || location.latitude === null) {
      toast.error('Location not set. Please enable location services and try again.');
      return; // Stop function execution if location is null
    }

    try {
      const response = await axios.post(`${BaseUrl}loginUser`, { phoneNumber, password, location });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      console.log(response);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response.data.error)
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BaseUrl}addUser`, { phoneNumber, password, bloodGroup });
      console.log(response.data);
      toast.success(`signup successfull wait for the admin response status:  ${response.data.newUser.status}`);
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error(error.response.data.error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:mt-[-50px] bg-gray-100">
      {/* Outer border container */}
      <div className="flex w-full max-w-6xl bg-white border-4 border-gray-300 rounded-lg shadow-lg">
        {/* Left Side - Image Slider */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden relative" data-aos="fade-right">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${images.length * 100}%`, // Adjust width based on the number of images
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className="flex-shrink-0 w-full h-full object-cover"
                style={{
                  height: '100%', // Ensure image takes full height of the container
                  width: '100%', // Ensure image takes full width of the container
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-3 lg:px-8">
          {/* Form Container */}
          <div className="w-full max-w-md bg-white border-2 border-gray-300 rounded-lg p-6 shadow-md" data-aos="fade-left">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
              <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {signup ? 'Sign Up to Your Account' : 'Login to Your Account'}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">
                {/* Phone Number Input */}
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
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full rounded-md border-1 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Password Input */}
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-1 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Conditional Blood Group Selection - Shown only if signup is true */}
                {signup && (
                  <div data-aos="fade-up">
                    <label htmlFor="bloodGroup" className="block text-sm font-medium leading-6 text-gray-900">
                      Blood Group
                    </label>
                    <div className="mt-2">
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        required
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Your Blood Group</option>
                        <option value="a+">A+</option>
                        <option value="a-">A-</option>
                        <option value="b+">B+</option>
                        <option value="b-">B-</option>
                        <option value="ab+">AB+</option>
                        <option value="ab-">AB-</option>
                        <option value="o+">O+</option>
                        <option value="o-">O-</option>
                        <option value="a2+">A2+</option>
                        <option value="a2-">A2-</option>
                        <option value="a2b+">A2B+</option>
                        <option value="a2b-">A2B-</option>
                        <option value="hh">HH (Bombay Blood Group)</option>
                        <option value="inra">INRA</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Login and Signup Buttons */}
                {signup ? (
                  <div data-aos="fade-left">
                    <button
                      onClick={handleSignup}
                      className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Signup
                    </button>
                  </div>
                ) : (
                  <>
                    <div data-aos="fade-left">
                      <button
                        onClick={handleLogin}
                        className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login
                      </button>
                    </div>

                    {/* Create Account Button */}
                    <div className="mt-4" data-aos="fade-left">
                      <button
                        onClick={() => setsignup(true)}
                        className="w-full flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      >
                        Create Account
                      </button>
                    </div>
                  </>
                )}

                {/* Toggle between Login and Signup */}
                {signup && (
                  <div className="mt-4" data-aos="fade-left">
                    <button
                      onClick={() => setsignup(false)}
                      className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Already have an account? Login
                    </button>
                  </div>
                )}

                <div>
                  <Link to="/hospitalLoginSignup">Hospital Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
