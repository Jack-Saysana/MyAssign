import React, { Component }from 'react';

class Home extends Component {
  render() {
    return  (
      <div>
        <head>
          <script src="https://kit.fontawesome.com/3227043e4d.js" crossorigin="anonymous"></script>
        </head>

        <div class="navbar">
          <a href="#"><i class="fas fa-home"></i>Home</a>
          <a href="#"><i class="fas fa-question"></i>About</a>
          <a href="#"><i class="fas fa-calendar"></i>Calender</a>
          <a href="#"><i class="fas fa-list"></i>Lists</a>
          <a href="#"><i class="fas fa-user"></i>Account</a>
        </div>
      </div>
    );
  }
}
