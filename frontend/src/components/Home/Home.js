import './Home.css';
import React, { Component }from 'react';

{/*Dason Janda*/}

class Home extends Component {
  render() {
    return  (
      <div className='home'>
        <div className='head'>
          <h1>Welcome to MyAssign!</h1>
          <div className='buttons'>
            <button type='button'>Get Started</button>
            <button type='button'>Learn More</button>
            <p>
            Page content
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
