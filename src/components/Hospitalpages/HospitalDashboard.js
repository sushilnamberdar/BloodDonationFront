import React, { useState } from 'react';
import Donors from './Donors';
import Events from './Events';

import Profile from './Profile';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import userlogo from '../images/User.png'

const HospitalDashboard = () => {
    const metrics = {
        totalDonations: 1234,
        upcomingEvents: 3,
        bloodInventory: {
            APos: 50,
            ANeg: 20,
            BPos: 35,
            BNeg: 10,
            ABPos: 15,
            ABNeg: 5,
            OPos: 60,
            ONeg: 25,
        },
    };

    const activities = [
        "Donor John Doe added.",
        "Event Blood Drive scheduled for next week.",
        "Blood type O- restocked.",
    ];

    const [page, setPage] = useState('home');
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    const renderPage = () => {
        switch (page) {
            case 'donors':
                return <Donors />;
            case 'events':
                return <Events />;
            case 'profile':
                return <Profile />;
            case 'home':
            default:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Welcome to the Hospital Dashboard</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white p-4 shadow rounded">
                                <h3 className="text-xl font-semibold">Total Donations</h3>
                                <p className="text-2xl">{metrics.totalDonations}</p>
                            </div>
                            <div className="bg-white p-4 shadow rounded">
                                <h3 className="text-xl font-semibold">Upcoming Events</h3>
                                <p className="text-2xl">{metrics.upcomingEvents}</p>
                            </div>
                            <div className="bg-white p-4 shadow rounded">
                                <h3 className="text-xl font-semibold">Blood Inventory</h3>
                                <p className="text-sm">
                                    A+ {metrics.bloodInventory.APos} | A- {metrics.bloodInventory.ANeg} <br />
                                    B+ {metrics.bloodInventory.BPos} | B- {metrics.bloodInventory.BNeg} <br />
                                    AB+ {metrics.bloodInventory.ABPos} | AB- {metrics.bloodInventory.ABNeg} <br />
                                    O+ {metrics.bloodInventory.OPos} | O- {metrics.bloodInventory.ONeg}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-4 shadow rounded mb-6">
                            <h3 className="text-xl font-semibold">Recent Activities</h3>
                            <ul>
                                {activities.map((activity, index) => (
                                    <li key={index} className="border-b py-2">{activity}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex relative">
            {/* Button to trigger Offcanvas */}
            <Button
                variant="primary"
                onClick={handleShow}
                className="fixed top-16 mt-10 left-4 z-30"
                style={{
                    height: '40px', // Small button height
                    width: '40px', // Small button width
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%', // Circular button
                }}
            >
                ☰ {/* Hamburger icon */}
            </Button>

            {/* Offcanvas Sidebar */}
            <Offcanvas show={showOffcanvas} onHide={handleClose} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Hospital Dashboard</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <nav className="mt-4">
                        <ul>
                            <li>
                                <button
                                    onClick={() => {
                                        setPage('home');
                                        handleClose();
                                    }}
                                    className="block w-full text-left p-2 hover:bg-gray-200"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setPage('donors');
                                        handleClose();
                                    }}
                                    className="block w-full text-left p-2 hover:bg-gray-200"
                                >
                                    Donors
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setPage('events');
                                        handleClose();
                                    }}
                                    className="block w-full text-left p-2 hover:bg-gray-200"
                                >
                                    Events
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setPage('profile');
                                        handleClose();
                                    }}
                                    className="block w-full flex items-center text-left p-2 hover:bg-gray-200"
                                >
                                 <img className='h-10 mr-6' src={userlogo}/>   Profile
                                </button>
                            </li>
                        </ul>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {renderPage()}
            </div>
        </div>
    );
};

export default HospitalDashboard;
