import React from 'react';
import { HashRouter } from 'react-router-dom';



import './styles/global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Website } from './Pages/Website';


function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes> 
          <Route path="/login/dashboard/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/*" element={<Website />} />
        </Routes>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
