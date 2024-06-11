import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotpassword';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route exact path="/register" element={<Register />} /> 
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </Router>
  );
}

export default App;
