import React from 'react';

import './styles/global.css'

import { Footer } from "./components/Footer";
import { Main } from './components/Main/Main';
import { SideMenu } from './components/SideMenu/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
    <React.Fragment>
      <Router>
        <section className="container-fluid vh-100 vw-100 d-flex row p-0" id="main-container">
          <SideMenu />
          <div className="col-10 d-flex flex-column p-0">
            <Main />
            <Footer />
          </div>
        </section>
      </Router>
    </React.Fragment>
  );
}

export default App;
