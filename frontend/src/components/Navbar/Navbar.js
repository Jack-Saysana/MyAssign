import React, { Component }from 'react';
import './Navbar.css';
import ScriptTag from 'react-script-tag';

class Navbar extends Component {
  render() {
    return  (
      <div >
        <head>
          <ScriptTag src="https://kit.fontawesome.com/3227043e4d.js" crossorigin="anonymous" />
        </head>

        <body class="navbar">
          <a href="#"><i class="fas fa-home"></i>Home</a>
          <a href="#"><i class="fas fa-question"></i>About</a>
          <a href="#"><i class="fas fa-calendar"></i>Calender</a>
          <a href="#"><i class="fas fa-list"></i>Lists</a>
          <a href="#"><i class="fas fa-user"></i>Sign In</a>
        </body>
      </div>
    );
  }
}

export default Navbar;
