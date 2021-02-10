import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Authentication/Signup';
import Login from '../Authentication/Login';
import Dashboard from '../Dashboard/dashboard';
import Logout from '../Authentication/Logout';
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
