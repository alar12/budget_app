import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ForgotPassword from './components/forgotpassword';
import SavingsPlan from './components/SavingsPlan';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/savings-plan" element={<SavingsPlan />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
