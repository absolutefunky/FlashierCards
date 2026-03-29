import React from 'react';
import Dashboard from './Dashboard.tsx';
import Navbar from "./Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {

  return (
    
     <Router>
          <Routes>

              <Route path="/" element={<Dashboard/>} />
          </Routes>
          <Navbar />
      </Router>
  );
}

export default App
