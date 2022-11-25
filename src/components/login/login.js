/**
 * @module Login
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actions';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Docketeer from '../../../assets/docketeer-title.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateSession = () => dispatch(actions.updateSession());
  const updateUser = (userInfo) => dispatch(actions.updateUser(userInfo));

  // Need to set the app element to body for screen-readers (disability), otherwise modal will throw an error
  // useEffect(() => {
  //   fetch("http://localhost:3000/db")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       return console.log("Connected to DB successfully", data);
  //     })
  //     .catch((err) => {
  //       return console.log("Fetch request to /db failed:", err);
  //     });
  // }, []);

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
    console.log('username:', username);
    console.log('password:', password);
    authenticateUser(username, password);
  };

  // callback function which will send request to endpoint http://localhost:3000/login and expect
  // either SSID in cookie.
  const authenticateUser = (username, password) => {
    console.log('YOU ARE HERE!');
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
            <TextField id='username' value='sysadmin' label='Username' variant='outlined' />
            <br />
            <br />

            <TextField
              id='password'
              label='Password'
              type='password'
              variant='outlined'
              value='belugas'
            />

            <br />
            {/* * Submit Button * */}
            <Button
              variant='contained'
              color='primary'
              type='submit'
              size='medium'
              onClick={() => handleLogin}
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