import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Signup from '../Authentication/Signup';
import Login from '../Authentication/Login';
import Dashboard from '../Dashboard/Dashboard';
import Logout from '../Authentication/Logout';
import Settings from '../Settings/Settings';
/*Dason Janda*/

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
