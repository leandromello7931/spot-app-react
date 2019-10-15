import React from 'react';

import './App.css';
import Routes from './routes';

import logo from './assets/logo.svg';


function App() {
  return (
    <div className="container">
      <img src={ logo } width="198px" height="64px" alt="AirCnc"/>
      <div className="content">
        <Routes />
        
      </div>
    </div>
  );
}

export default App;
