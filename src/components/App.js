import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from './login/login';
import AdminView from './views/Admin';
import UserView from './views/User';

const App = (props) => {

  let isAdmin = true;

  if (isAdmin) {
    return (
      <div>
        <AdminView loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
      </div>
    )
  }

  else {
    return (
      <div>
        <UserView />
      </div>
    )
  }
}

export default App;