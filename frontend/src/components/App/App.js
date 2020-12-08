import React from 'react';
import './App.css';
import Home from '../Home/Home.js';
import Navbar from '../Navbar/Navbar.js';

function App() {
    return (
      <div className="App">
        <h1>MyAssign</h1>
        <Navbar/>
        <Home/>
      </div>
  );
}

export default App;
