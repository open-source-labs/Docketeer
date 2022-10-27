/**
 * @module Login
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actions';

// React Component Imports
import DebugRouter from '../debug/debugRouter';

// Material UI Imports
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { spacing } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Docketeer from '../../../assets/docketeer-title.png';
// Helper Functions Import
import { handleLogin, authenticateUser } from '../helper/loginHelper';

const Login = () => {
  const dispatch = useDispatch();
  const updateSession = () => dispatch(actions.updateSession());
  const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));
  const session = useSelector((state) => state.session.isLoggedIn);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Need to set the app element to body for screen-readers (disability), otherwise modal will throw an error
  useEffect(() => {
    fetch('http://localhost:3000/db')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return console.log('Connected to DB successfully', data);
      })
      .catch((err) => {
        return console.log('Fetch request to /db failed:', err);
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

  // callback function which will send request to endpoint http://localhost:3000/login and expect
  // either SSID in cookie.
  const authenticateUser = (username, password) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
        } else {
          updateSession(); // loggedIn = true
          updateUser(data); // update user info in sessions reducer
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('Fetch: POST error to /login', err);
        // created a pop window for wrong username/password
        window.alert('Wrong Password or Username. Please try Again!');
      });
  };

  // Upon successful login, redirect to /app location and render the App component

  // // Note: this could be re-worked, just thinking about it this looks like poor security design since loggedIn is a local state variable on client end which can be hardcoded to true. Rather, the server should verify credentials and then send client either SSID to access next endpoint or another means.
  // if (session) {
  //   return (
  // Deprecated
  // <Router
  // // history={BrowserHistory}
  // >
  //   {/* <Redirect to='/app' /> */}
  //   <Routes>
  //     {/* <Route component={App} exact path="/app" /> */}
  //     <Route path='/app'>
  //       <App />
  //     </Route>
  //   </Routes>
  // </Router>

  //     <Navigate to='/app' />
  //   );
  // }

  // Else render the login page
  return (
    <div>
      <header>
        <img src={Docketeer} width={160} />
      </header>
      <br />
      <br />
      <br />
      <div className='renderContainers'>
        <div className='header'>
          <h1 className='tabTitle'>Login</h1>
        </div>
        <div className='settings-container'>
          <form className='loginForm' onSubmit={handleLogin}>
            <TextField id='username' label='Username' variant='outlined' />
            <br />
            <br />

            <TextField
              id='password'
              label='Password'
              type='password'
              variant='outlined'
            />

            <br />
            {/* * Submit Button * */}
            <Button
              variant='contained'
              color='primary'
              type='submit'
              size='medium'
              onClick={() => handleLogin}
              // className={classes.button}
              sx={{
                m: 1
              }}
            >
              Login
            </Button>
            <hr />
            <div
              className='g-signin2'
              data-onsuccess='onSignIn'
              style={{ width: '200px', borderRadius: '4px' }}
            ></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
