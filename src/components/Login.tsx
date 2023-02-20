/**
 * @module Login
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';

// Import UserInfo interface (typescript)
import { UserInfo } from '../../types';
import useSurvey from './helper/dispatch';

const Login = () => {
  // Initializing navigate & dispatch using their respective hooks
  const navigate = useNavigate();
  const { updateUser, updateSession } = useSurvey();

  const updateUserSession = () => updateSession();
  const updateUserInfo = (userInfo: UserInfo) => updateUser(userInfo);

  // Login handler function
  const handleLogin = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // Select username and password input elements
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    // Store the input field value into `username` and `password`
    const username: string = (usernameInput as HTMLInputElement).value;
    const password: string = (passwordInput as HTMLInputElement).value;
    // Clear form input fields after submission of the form
    (usernameInput as HTMLInputElement).value = '';
    (passwordInput as HTMLInputElement).value = '';
    // Invoke authenticateUser
    authenticateUser(username, password);
  };

  // authenticateUser will send a post request to the server to verify user information
  const authenticateUser = (username: string, password: string) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          window.alert(data.error);
        } else {
          updateUserSession(); // Switch state `loggedIn` to true
          updateUserInfo(data); // Update user information in sessionsReducer
          navigate('/'); // Navigate to root route
        }
      })
      .catch((err) => {
        console.log('Fetch: POST error to /login', err);
        // Alert user upon wrong username or password entry using an alert.
        window.alert(
          'Incorrect password and/or username. \n Please register or try again.'
        );
      });
  };

  return (
    <div>
      <header>
        <img id='logo' src={Docketeer} width={300} />
      </header>
      <div className='renderContainers login-container'>
        <div className='header'>
          <h1 className='bg-red-800'>Login</h1>
        </div>
        <div className='settings-container inner-box'>
          <form
            className='loginForm'
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleLogin(e)}
          >
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
            {/* * Login Button * */}
            <Button
              variant='contained'
              color='primary'
              type='submit'
              size='medium'
              role='login'
              className='login-buttons'
              sx={{
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              Login
            </Button>
            <br />
            <Button
              variant='contained'
              size='small'
              role='register'
              className='register login-buttons'
              onClick={() => navigate('/userSignup')}
              sx={{
                color: '#1976d2',
                background: 'white',
                marginTop: 1,
              }}
            >
              Register
            </Button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
