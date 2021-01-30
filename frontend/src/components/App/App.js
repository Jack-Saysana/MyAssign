import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Signup/signup';
import Login from '../Login/login';
import Dashboard from '../Dashboard/dashboard';
import Logout from '../Logout/logout';
/*Dason Janda*/

function App() {
    return (
      /*<div className="App">
        <h1>MyAssign</h1>
        <Navbar/>
        <Home/>
      </div>*/
      <BrowserRouter>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={Dashboard} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
