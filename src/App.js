// app.js

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import LoginSignup from './components/LoginSignup';
import { useState, useEffect } from 'react';
import BloodRequirement from './components/BloodRequirement';
import DonationDetails from './components/DonationDetails';
import DonorResponse from './components/DonorResponse';
import AdminPanel from './components/AdminPanel';
import AdminLogSign from './components/AdminLogSign';
import UserDetails from './components/UserDetails';
import DonorResponseAdmin from './components/DonorResponseAdmin';
import Navbarjs from './components/Navbarjs';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import WelcomePage from './components/WelcomePage';
function App() {

  const [token, setToken] = useState('');
  const [adminToken , setAdminToken] = useState('');

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token');
    const adminStoredToken = localStorage.getItem('adminToken');
    setToken(storedToken || '');
    setAdminToken(adminStoredToken || '')
  };

  useEffect(() => {
    checkAuth();
  }, []);



  return (
    <div className="App">
    {adminToken? "" : <Navbarjs setToken={setToken}/>}
      <div>    
        <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <LoginSignup setToken={setToken} />} />
          <Route path="/admin" element={adminToken ? <AdminPanel setAdminToken={setAdminToken}/> : <Navigate to="/adminLogin" />} />
          <Route path="/adminLogin" element={adminToken ? <Navigate to="/admin"/> : <AdminLogSign setAdminToken={setAdminToken}/>} />
          <Route path="/home" element={token ? <Hero setToken = {setToken}/> : <Navigate to="/" />} />
          <Route path="/bloodRequirement" element={token ? <BloodRequirement setToken = {setToken}/> : <Navigate to="/" />} />
          <Route path="/donationDetails" element={token ? <DonationDetails setToken = {setToken}/> : <Navigate to="/" />} />
          <Route path="/donorsResponse" element={token ? <DonorResponse setToken = {setToken} /> : <Navigate to="/" />} />
          <Route path="/userDetails" element={adminToken ? <UserDetails/> : <Navigate to="/adminLogin" />} />
          <Route path="/donorsResponseAdmin" element={ <DonorResponseAdmin/>} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/welcome' element={<WelcomePage/>}/>
        </Routes>
      </div>
      { adminToken? "" : <Footer/>}
    </div>
  );
}

export default App;
