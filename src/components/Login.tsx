import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';
import { UserInfo } from '../../types';
import { createAlert } from '../reducers/alertReducer';
import { useAppDispatch } from '../reducers/hooks';
import useSurvey from './helpers/dispatch';

/**
 * @module Login
 * @description Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 */

const Login = () => {
  const navigate = useNavigate();
  const { updateUser, updateSession } = useSurvey();
  const updateUserSession = () => updateSession();
  const updateUserInfo = (userInfo: UserInfo) => updateUser(userInfo);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username: string = (usernameInput as HTMLInputElement).value;
    const password: string = (passwordInput as HTMLInputElement).value;
    (usernameInput as HTMLInputElement).value = '';
    (passwordInput as HTMLInputElement).value = '';
    authenticateUser(username, password);
  };

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
          dispatch(
            createAlert(
              `The username and/or password entered could not be authenticated. Please try again.`,
              5,
              'error'
            )
          );
        } else {
          updateUserSession(); // Switch state `loggedIn` to true
          updateUserInfo(data); // Update user information in sessionsReducer
          dispatch(
            createAlert(
              `Welcome back to Docketeer, ${data.username}!`,
              5,
              'success'
            )
          );
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
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row lg:space-x-20'>
        <img src={Docketeer} alt='product-logo' className='max-w-sm' />
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <input
                type='text'
                id='username'
                placeholder='Username'
                className='input input-bordered'
              />
            </div>
            <div className='form-control'>
              <input
                type='password'
                id='password'
                placeholder='Password'
                className='input input-bordered'
              />
              <label className='label'>
                <a
                  className='label-text-alt link link-hover'
                  onClick={() => navigate('/userSignup')}
                >
                  New? Click here to register.
                </a>
              </label>
            </div>
            <div className='form-control mt-2'>
              <button className='btn btn-primary' onClick={() => handleLogin()}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
