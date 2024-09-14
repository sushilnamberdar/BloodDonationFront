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

  const[signup,setsignup]=useState(false); 


  return (
    <div className="App">
    {adminToken? "" : <Navbarjs setsignup={setsignup} setToken={setToken}/>}
      <div>    
        <Routes>
        <Route path="/loginsignup" element={token ? <Navigate to="/home"/> : <LoginSignup setsignup={setsignup} signup={signup} setToken={setToken} />} />
          <Route path="/admin" element={adminToken ? <AdminPanel setAdminToken={setAdminToken}/> : <Navigate to="/adminLogin" />} />
          <Route path="/adminLogin" element={adminToken ? <Navigate to="/admin"/> : <AdminLogSign setAdminToken={setAdminToken}/>} />
          <Route path="/home" element={token ? <Hero setToken = {setToken}/> : <Navigate to="/" />} />
          <Route path="/bloodRequirement" element={<BloodRequirement setToken = {setToken}/>} />
          <Route path="/donationDetails" element={token ? <DonationDetails setToken = {setToken}/> : <Navigate to="/" />} />
          <Route path="/donorsResponse" element={ <DonorResponse setToken = {setToken}/>} />
          <Route path="/userDetails" element={adminToken ? <UserDetails/> : <Navigate to="/adminLogin" />} />
          <Route path="/donorsResponseAdmin" element={ <DonorResponseAdmin/>} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/' element={<WelcomePage/>}/>
        </Routes>
      </div>
      { adminToken? "" : <Footer/>}
    </div>
  );
}

export default App;
