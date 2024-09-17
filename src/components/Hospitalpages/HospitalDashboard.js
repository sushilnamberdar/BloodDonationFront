import React, { useState } from 'react';
import PostBloodRequest from './PostBloodRequest';
import Events from './Events';

import Profile from './Profile';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import userlogo from '../images/User.png'
import Home from './Home';

const HospitalDashboard = () => {
   

   

    const [page, setPage] = useState('home');
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    const renderPage = () => {
        switch (page) {
            case 'postbloodrequest':
                return <PostBloodRequest/>;
            case 'events':
                return <Events />;
            case 'profile':
                return <Profile />;
            case 'home':
            default:
            return <Home/>
                
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
                                        setPage('postbloodrequest');
                                        handleClose();
                                    }}
                                    className="block w-full text-left p-2 hover:bg-gray-200"
                                >
                                   Post Bloodrequest
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
