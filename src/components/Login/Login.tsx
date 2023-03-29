import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import globalStyles from '../global.module.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../../assets/docketeer-title.png';
import { UserInfo } from '../../../types';
import { createAlert } from '../../reducers/alertReducer';
import { useAppDispatch } from '../../reducers/hooks';
import useSurvey from '../helpers/dispatch';


/**
 * @module | Login
 * @description | Login component which renders a login page, and sign-up modal. This is the first component that users are routed to if there are no active sessions.
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
          `Welcome back Docketeer, ${parsedResponse.username}!`,
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
    <div className={styles.wrapper}>
      <img src={Docketeer}
        alt="product-logo"
        className={styles.logo} />
      <div className={styles.formHolder} >
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            className={globalStyles.input}
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={globalStyles.input}
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.buttonHolder}>
            <button className={globalStyles.button1}>
              Login
            </button>
            <button className={globalStyles.button2}
              onClick={() => navigate('/userSignup')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
