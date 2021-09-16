/**
 * ************************************
 *
 * @module Login
 * @author Brent Speight, Emma Czech, May Li, Ricardo Cortez
 * @date 6/10/2021
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 *
 * ************************************
 */

// NPM Module Imports
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
// Redux Imports (actions)
import * as actions from '../../actions/actions';

// React Component Imports
import App from '../App';
import DebugRouter from '../debug/debugRouter';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Docketeer from '../../../assets/docketeer-title.png';
// Helper Functions Import
// import { handleLogin, authenticateUser } from '../helper/loginHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Login = ( ) => {
  
  // React-Redux: Map dispatch to props
  const dispatch = useDispatch();
  const updateSession = () => dispatch(actions.updateSession());
  const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));

  // React-Redux: Map state to props
  const session = useSelector((state) => state.session.isLoggedIn);

  // React Hooks: Local state variables 
  const [ modalIsOpen, setIsOpen ] = useState(false);
  
  // Material UI
  const classes = useStyles();

  // Need to set the app element to body for screen-readers (disability), otherwise modal will throw an error
  useEffect(() => {
    fetch('http://localhost:3000/db')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return console.log(data);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);
  
  // callback function invoked when 'login' button is clicked
  const handleLogin = (e) => {
    e.preventDefault(); // prevents form submit from reloading page
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value;
    const password = passwordInput.value;

    // clears input fields after login
    usernameInput.value = '';
    passwordInput.value = '';

    authenticateUser(username, password);
  };



  //OAuth Attempt.
  // const getUserInfo = (access_code) => {
  //   console.log('invoking getUserInfo');
  //   fetch('/github', {
  //     method: 'GET',
  //     headers: { access_code: access_code }
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       setUser(res);
  //       history.push('/dash');
  //     })
  //     .catch(err => console.log('ERRRR', err))
  // }


  // if (window.location.hash) {
  //   const hash = (new URL(document.location)).hash;
  //   const access_code = hash.match(/(?<=#access_token=)(.*)(?=&token_type)/)[0];
  //   console.log('access_code: ', access_code);
  //   getUserInfo(access_code);
  // }

  // callback function which will send request to endpoint http://localhost:3000/login and expect either SSID in cookie.
  const authenticateUser = (username, password) => {

    fetch('http://localhost:3000/login', 
      { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          window.alert(data.error);
        }
        else {
          updateSession(); // loggedIn = true 
          updateUser(data); // update user info in sessions reducer
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Upon successful login, redirect to /app location and render the App component

  // Note: this could be re-worked, just thinking about it this looks like poor security design since loggedIn is a local state variable on client end which can be hardcoded to true. Rather, the server should verify credentials and then send client either SSID to access next endpoint or another means.
  if (session){
    return (
      <Router
        history={BrowserHistory}
      >
        <Redirect to="/app"/>
        <Switch>
          {/* <Route component={App} exact path="/app" /> */}
          <Route path="/app">
            <App />
          </Route>
        </Switch> 
      </Router>
    );
  }
  
  // Else render the login page
  return (
    <Router 
      history={BrowserHistory}
    >
      <Route id="route" path="/"> 
        <header>
          <img src={Docketeer} width={160} />
        </header>
        <br></br>
        <br></br>
        <br></br>
        <div className="renderContainers">
          <div className="header">
            <h1 className="tabTitle">Login</h1>
          </div>
          <div className="settings-container">
            <form className={classes.root} onSubmit={handleLogin}>
              {/* <input id="username" type="text" placeholder="username"></input> */}
              <TextField id="username" label="Username" variant="outlined" />
              <br></br>
              <br></br>
              {/* <input id="password" type="password" placeholder="password"></input> */}
              <TextField id="password" label="Password" type="password" variant="outlined" />
              {/* <input type="submit"></input> */}
              <br></br>
              <Button variant="contained" color="primary" type="submit" size="medium" className={classes.button}>
                Login
              </Button>
              <form id="github" action='/oauth' method='GET'>
                <button id="login_button" type="submit" value="login" ><img id="github_logo" src="data:image/png;base64,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" style={{width: '100px', borderRadius:'4px'}}/>Login with github</button>
              </form>
              <hr></hr>
              <div className="github_login" data-onsuccess="onSignIn" style={{width: '40px', borderRadius:'4px'}}></div>
              
            </form>
          </div>
        </div>
      </Route>
    </Router>
  );
};

export default Login;