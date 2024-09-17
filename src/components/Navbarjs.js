import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './images/iinsaf.png';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbarjs = ({ setToken,setsignup}) => {
  const navigate = useNavigate();
  const [token, settoken] = useState('');
  const [htoken,sethtoken]= useState('');
  const [atoken , setatoken]=useState('');
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const htoken = localStorage.getItem('htoken');
    const atoken = localStorage.getItem('adminToken')
    settoken(token);
    sethtoken(htoken);
    setatoken(atoken);
  },);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('htoken');
    localStorage.removeItem('adminToken');
    setToken('');
    navigate('/loginsignup');
  };
  
  const handleSignup = () => {
    setsignup(true);
    navigate('/loginsignup')
  }
  const handellogin = () => {
    setsignup(false);
    navigate('/loginsignup')
  }

  // Close navbar on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarExpanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbarExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [navbarExpanded]);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary position-sticky top-0 border h-20 z-20 font-montserrat lg:text-lg"
      expanded={navbarExpanded}
      ref={navbarRef}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img style={{ height: '40px' }} src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setNavbarExpanded(!navbarExpanded)} // Toggle navbar state
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 bg-body-tertiary" style={{ maxHeight: '300px' }} navbarScroll>
            {htoken ? (
              <>
                {/* Links to show when htoken is available */}
                <Nav.Link as={Link} to="/hospitaldashboard">Hospital Dashboard</Nav.Link>
                <button className='bg-indigo-500 px-5 text-white rounded-3xl hover:bg-indigo-600' onClick={handleLogout}>Logout</button>
              </>
            ) : atoken ? (
              <>
                {/* Links to show when atoken is available */}
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/admin"> Admin Home</Nav.Link>

                <Nav.Link as={Link} to="/manageUsers">Manage Users</Nav.Link>
                <button className='bg-indigo-500 px-5 text-white rounded-3xl hover:bg-indigo-600' onClick={handleLogout}>Logout</button>
              </>
            ) : token ? (
              <>
                {/* Links to show when token is available but htoken and atoken are not */}
                <Nav.Link as={Link} to="/bloodRequirement">Blood / Camps Request</Nav.Link>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/services">Services</Nav.Link>
                <button className='bg-indigo-500 px-5 text-white rounded-3xl hover:bg-indigo-600' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                {/* Links to show when neither token, htoken, nor atoken are available */}
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to='/hospitalLoginSignup' className='!bg-indigo-500 px-5 text-white rounded-3xl !hover:bg-indigo-600 mr-1'>Hospital Login</Nav.Link>
                <Nav.Link as={Link} to="/loginsignup" className='!bg-indigo-500 px-5 text-white rounded-3xl !hover:bg-indigo-600' onClick={handellogin}>Login</Nav.Link>
                <Nav.Link as={Link} to="/loginsignup" className='!bg-red-400 px-4 ml-1 text-white rounded-3xl !hover:bg-indigo-600' onClick={handleSignup}>Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
};

export default Navbarjs;
