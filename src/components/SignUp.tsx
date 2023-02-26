import React, { useState } from 'react';

import { checkDbInit, handleNewUser } from './helpers/newUserHelper';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';

const SignUp = () => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    showPassword: false,
  });

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row lg:space-x-20'>
        <img src={Docketeer} alt='product-logo' className='max-w-sm' />
        <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <input
                type='text'
                id='email'
                placeholder='Email'
                className='input input-bordered'
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                id='username'
                placeholder='Username'
                className='input input-bordered'
                onChange={(e) => {
                  setValues({ ...values, username: e.target.value });
                }}
              />
            </div>
            <div className='form-control'>
              <input
                type='password'
                id='password'
                placeholder='Password'
                className='input input-bordered'
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
              />
            </div>
            <div className='form-control'>
              <input
                type='password'
                id='confirm-password'
                placeholder='Confirm'
                className='input input-bordered'
                onChange={(e) => {
                  setValues({
                    ...values,
                    passwordConfirmation: e.target.value,
                  });
                }}
              />
            </div>
            <div className='form-control'>
              <input
                type='phone'
                id='phone'
                placeholder='Phone number'
                className='input input-bordered'
                onChange={(e) => {
                  setValues({
                    ...values,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className='form-control mt-6 flex space-y-2'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  checkDbInit();
                  handleNewUser(values, '1', setValues);
                }}
              >
                Submit
              </button>
              <button
                className='btn btn-ghost'
                onClick={() => {
                  history.back();
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
