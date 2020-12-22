import React, { Component }from 'react';
import './Navbar.css';
import ScriptTag from 'react-script-tag';

/*Dason Janda*/

class Navbar extends Component {
  render() {
    return  (
      <div >
        <div>
          <ScriptTag src="https://kit.fontawesome.com/3227043e4d.js" crossOrigin="anonymous" />
        </div>
        <div className="navbar">
          <a href="#"><i className="fas fa-home"></i>Home</a>
          <a href="#"><i className="fas fa-question"></i>About</a>
          <a href="#"><i className="fas fa-calendar"></i>Calender</a>
          <a href="#"><i className="fas fa-list"></i>Lists</a>
          <a href="#"><i className="fas fa-user"></i>Sign In</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
