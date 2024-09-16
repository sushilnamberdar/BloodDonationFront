import React from 'react';

const Donors = () => {
  // Dummy donor data
  const donors = [
    { name: "John Doe", email: "john@example.com", phone: "+1234567890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "+0987654321" },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Donors</h2>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-xl font-semibold mb-2">List of Donors</h3>
        <ul>
          {donors.map((donor, index) => (
            <li key={index} className="border-b py-2">
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donors;
