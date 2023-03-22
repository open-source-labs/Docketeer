import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';
import { UserInfo } from '../../types';
import { createAlert } from '../reducers/alertReducer';
import { useAppDispatch } from '../reducers/hooks';
import useSurvey from './helpers/dispatch';

/**
 * @module | Login
 * @description | Login component which renders a login page, and sign-up modal. This is the first component that is appended to the dist/.renderer-index-template.html via renderer/index.js
 **/

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { updateUser, updateSession } = useSurvey();
  const updateUserSession = () => updateSession();
  const updateUserInfo = (userInfo: UserInfo) => updateUser(userInfo);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    // prevent default form submission action
    e.preventDefault();
    // authenticate user
    authenticateUser(username, password);
  };

  // send a fetch request to the backend to login
  const authenticateUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      // login user with fetch request
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      // parse the response
      const parsedResponse = await response.json();

      // TODO: show data expected to be received
      console.log('parsedResponse: ', parsedResponse);

      // Switch state `loggedIn` to true
      updateUserSession();
      // Update user information in sessionsReducer
      updateUserInfo(parsedResponse);
      // create alert to notify user that they have successfully logged in
      dispatch(
        createAlert(
          `Welcome back to Docketeer, ${parsedResponse.username}!`,
          5,
          'success'
        )
      );
      // Navigate to root route
      navigate('/');
    } catch (err) {
      console.log('Fetch: POST error to /login', err);
      // Alert user upon wrong username or password entry using an alert.
      window.alert(
        'Incorrect password and/or username. \n Please register or try again.'
      );
      // if error send dispatch to create alert
      // if (Object.prototype.hasOwnProperty.call(parsedResponse, 'error')) {
      //   dispatch(
      //     createAlert(
      //       'The username and/or password entered could not be authenticated. Please try again.',
      //       5,
      //       'error'
      //     )
      //   );
      // }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row lg:space-x-20">
        <img src={Docketeer} alt="product-logo" className="max-w-sm" />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={(e) => handleLogin(e)}>
            <div className="form-control">
              <input
                className="input input-bordered"
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                className="input input-bordered"
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <a
                  className="label-text-alt link link-hover"
                  onClick={() => navigate('/userSignup')}
                >
                  New User? Click here to register.
                </a>
              </label>
            </div>
            <div className="form-control mt-2">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
