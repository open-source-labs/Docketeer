import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './SignUp.module.scss';
import globalStyles from '../global.module.scss';
import useHelper from '../../helpers/commands';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../../assets/extended-light.png';
import { SignUpValues } from '../../../types';

/**
 * @module | SignUp
 * @description | Facilitates registration of new users to Docketeer
 **/

const SignUp = (): JSX.Element => {
  const [signUpValues, setSignUpValues] = useState<SignUpValues>({
    username: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  });
  const navigate = useNavigate();
  const { createNewUser } = useHelper();

  const checkDbInit = () => {
    fetch('/api/db')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  function handleClick(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    // check that passwords match
    if (signUpValues.password !== signUpValues.passwordConfirmation) {
      window.alert('Passwords do not match');
      return;
    }

    // checDbInit() is a function that checks if the database has been initialized
    checkDbInit();
    createNewUser(signUpValues.username, signUpValues.password);

    setSignUpValues({
      username: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
    });

    navigate('/login');
  }

  return (
    <div className={styles.wrapper}>
      <img src={Docketeer} alt="product-logo" className={styles.logo} />
      <div className={styles.formHolder}>
        <form
          onSubmit={(e) => {
            handleClick(e);
          }}
        >
          <input
            className={globalStyles.input}
            type="text"
            id="username"
            required={true}
            value={signUpValues.username}
            placeholder="Username"
            onChange={(e) => {
              setSignUpValues({
                ...signUpValues,
                username: e.target.value,
              });
            }}
          />
          <input
            className={globalStyles.input}
            type="password"
            value={signUpValues.password}
            required={true}
            minLength={6}
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setSignUpValues({
                ...signUpValues,
                password: e.target.value,
              });
            }}
          />
          <input
            className={globalStyles.input}
            type="password"
            value={signUpValues.passwordConfirmation}
            required={true}
            minLength={6}
            id="confirm-password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setSignUpValues({
                ...signUpValues,
                passwordConfirmation: e.target.value,
              });
            }}
          />
          <div className={styles.buttonHolder}>
            <button className={globalStyles.button1}>
              Create User
            </button>
            <button
              className={globalStyles.button2}
              onClick={() => {
                history.back();
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
