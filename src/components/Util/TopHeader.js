import React from 'react';
import { FaBuilding, FaPhone, FaFacebook, FaTwitter, FaGooglePlus, FaInstagram, FaYoutube } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <header className="bg-red-600 flex flex-col md:flex-row justify-between items-center text-white py-2 px-4">
      {/* Left Side: Contact Information */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <FaBuilding />
          <span className="ml-2"><strong>Contact:</strong> East Shibgonj, Sylhet, 3100</span>
        </div>
        <div className="flex items-center">
          <FaPhone />
          <span className="ml-2"><strong>Call Us:</strong> +880-1891-82709</span>
        </div>
      </div>

      {/* Right Side: Social Media Icons */}
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#" className="text-white hover:text-gray-500 transition duration-300">
          <FaFacebook />
        </a>
        <a href="#" className="text-white hover:text-gray-500 transition duration-300">
          <FaTwitter />
        </a>
        <a href="#" className="text-white hover:text-gray-500 transition duration-300">
          <FaGooglePlus />
        </a>
        <a href="#" className="text-white hover:text-gray-500 transition duration-300">
          <FaInstagram />
        </a>
        <a href="#" className="text-white hover:text-gray-500 transition duration-300">
          <FaYoutube />
        </a>
      </div>
    </header>
  );
};

export default TopHeader;
