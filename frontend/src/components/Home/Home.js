import './Home.css';
import React, { Component }from 'react';

/*Dason Janda*/

class Home extends Component {
  render() {
    return  (
      <div>
        <div className='home'>
          <div className='head'>
            <h1>Welcome to MyAssign!</h1>
            <p>My Assign is a website created in order to help organize everyday tasks from work to school.
            We are committed to giving your the simplist and best user experience</p>
            <div className='buttons'>
              <button type='button'>Get Started</button>
              <button type='button'>Learn More</button>
              <p>
              Page content
              </p>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Home;
