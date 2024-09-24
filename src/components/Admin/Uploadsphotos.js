import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../Util/util';

const UpdateImageComponent = () => {
  const [selectedSection, setSelectedSection] = useState('sectionOne');
  const [selectedImageNumber, setSelectedImageNumber] = useState('imageOne');
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle section change
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  // Handle image number change
  const handleImageNumberChange = (event) => {
    setSelectedImageNumber(event.target.value);
  };

  // Upload the image to Cloudinary and update the database
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }

    try {
      // Step 1: Fetch signature and timestamp from backend
      const signatureResponse = await axios.get(`${BaseUrl}signature`);
      const { signature, timestamp } = signatureResponse.data;

      // Step 2: Upload the image to Cloudinary with the signature and timestamp
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', '126739441976649'); // Replace with your Cloudinary API key
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);

      // Add other optional parameters as needed
      // formData.append('public_id', 'your_public_id'); // Optional, if you want to set a specific public ID

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dhdk9yop5/image/upload`, // Replace 'your_cloud_name'
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Step 3: Update the image URL in the database
      const updateResponse = await axios.put(`${BaseUrl}updateImage`, {
        section: selectedSection,
        imageNumber: selectedImageNumber,
        imageUrl
      });

      if (updateResponse.status === 200) {
        alert('Image uploaded and updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading or updating image:', error);
      alert('Error uploading or updating image');
    }
  };

  return (
      <div className="p-6 bg-white shadow-md rounded-lg min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Update Image Section</h2>
  
        <div className="mb-4">
          <label className="block text-gray-700">Select Section:</label>
          <select
            value={selectedSection}
            onChange={handleSectionChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="sectionOne">Section One</option>
            <option value="sectionTwo">Section Two</option>
            <option value="sectionThree">Section Three</option>
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700">Select Image Number:</label>
          <select
            value={selectedImageNumber}
            onChange={handleImageNumberChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="imageOne">Image One</option>
            <option value="imageTwo">Image Two</option>
            <option value="imageThree">Image Three</option>
          </select>
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md"
          />
        </div>
  
        <button
          onClick={handleUpload}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition"
        >
          Upload and Update Image
        </button>
      </div>
    );
};

export default UpdateImageComponent;
