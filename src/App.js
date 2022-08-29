import React from 'react';



import './styles/global.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Website } from './Pages/Website';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes> 
          <Route path="/login/dashboard/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<Website />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
