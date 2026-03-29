import React from 'react';
import Dashboard from './Dashboard.tsx';
import Profile from './Profile.tsx';
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {

  return (
    
     <Router>
      <div className="navbar">
        <Navbar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </div>
      </Router>
  );
}

export default App
