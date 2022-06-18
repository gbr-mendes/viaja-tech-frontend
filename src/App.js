import React from 'react';

import './styles/global.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/login/dashboard/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
