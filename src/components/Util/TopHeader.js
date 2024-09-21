import React from 'react';
import { FaBuilding, FaPhone, FaFacebook, FaTwitter, FaGooglePlus, FaInstagram, FaYoutube } from 'react-icons/fa';

const TopHeader = () => {
  return (
    <header className="bg-red-600 flex items-center justify-center text-white">
      <div className="flex justify-center items-center flex-wrap p-2 space-x-10">
        <div className="flex items-center justify-center flex-wrap space-x-4">
          <FaBuilding />
          <span><strong>Contact:</strong> East Shibgonj, Sylhet, 3100</span>
          <span className="mx-4 flex items-center justify-center">
            <FaPhone /> <strong>Call Us:</strong> +880-1891-82709
          </span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          {/* Social Media Icons with hover effect */}
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
      </div>
    </header>
  );
};

export default TopHeader;
