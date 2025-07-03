import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import CheckInbox from './components/CheckInbox';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verify from './components/Verify';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/check-inbox" element={< CheckInbox />} />
    </Routes>
  );
}

export default App