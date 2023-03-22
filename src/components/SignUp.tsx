import React, { useState } from 'react';
import { createNewUser, checkDbInit } from './helpers/newUserHelper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';
import { useNavigate } from 'react-router';

/**
 * @module | SignUp
 * @description | Facilitates registration of new users (admins) to Docketeer
 **/
// todo: move to types file
type SignUpValues = {
  username: string;
  password: string;
  passwordConfirmation: string;
  showPassword: boolean;
};

const SignUp = (): JSX.Element => {
  const [signUpValues, setSignUpValues] = useState<SignUpValues>({
    username: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
  });
  const navigate = useNavigate();

  function handleClick(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    // TODO: make pop up for successful sign up

    // check that passwords match
    if (signUpValues.password !== signUpValues.passwordConfirmation) {
      window.alert('Passwords do not match');
      return;
    }

    checkDbInit();
    // createNewUser
    createNewUser(signUpValues.username, signUpValues.password, '1');

    setSignUpValues({
      username: '',
      password: '',
      passwordConfirmation: '',
      showPassword: false,
    });

    navigate('/login');
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row lg:space-x-20">
        <img src={Docketeer} alt="product-logo" className="max-w-sm" />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {/* TODO: change to onSubmit, also link back to login */}
          {/*  TODO: create alert for successful sign up */}
          <form
            className="card-body"
            onSubmit={(e) => {
              handleClick(e);
            }}
          >
            {/* <div className="form-control">
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
              />
            </div> */}
            <div className="form-control">
              <input
                className="input input-bordered"
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
            </div>
            <div className="form-control">
              <input
                className="input input-bordered"
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
            </div>
            <div className="form-control">
              <input
                className="input input-bordered"
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
            </div>
            {/* <div className="form-control">
              <input
                type="phone"
                id="phone"
                placeholder="Phone number"
                className="input input-bordered"
                onChange={(e) => {
                  setValues({
                    ...values,
                    phone: e.target.value,
                  });
                }}
              />
            </div> */}
            <div className="form-control mt-6 flex space-y-2">
              <button className="btn btn-primary">Create User</button>
              <button
                className="btn btn-ghost"
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
    </div>
  );
};

export default SignUp;
