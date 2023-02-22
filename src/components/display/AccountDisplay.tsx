/**
 * @module AccountDisplay
 * @description Account Display for Settings tab, this will host any forms to update account details such as email, passwords, etc.
 */
import React from 'react';

import {
  handlePasswordChange,
  // confirmPassword,
  // checkPasswordLength,
  // checkCurrentPassword,
  handleEmailUpdate,
  handlePhoneUpdate,
  // checkPhone,
} from '../helper/settingsHelper';
import { useAppSelector } from '../../redux/reducers/hooks';

// const input = document.getElementById(
//   'update-phone-input'
// ) as HTMLTextAreaElement | null;

const AccountDisplay = () => {
  const session = useAppSelector((state) => state.sessions);
  // NB: Reimplement user feedback when updating phone number (using callback function `checkPhone`)
  // NB: Reimplement user feedback when updating password (using 3 callbacks i.e. `confirmPW, checkPassLength, confirmPassword `)
  return (
    <div>
      <div className='card w-11/14 bg-neutral text-neutral-content rounded-lg'>
        <div className='card-body text-left space-y-2'>
          <h2 className='card-title text-sm pb-2'>ACCOUNT INFORMATION</h2>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Email</span>
            </label>
            <input
              type='text'
              placeholder={session.email}
              className='input input-bordered w-full max-w-xs'
              disabled
            />
          </div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Username</span>
            </label>
            <input
              type='text'
              placeholder={session.username}
              className='input input-bordered w-full max-w-xs'
              disabled
            />
          </div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Phone</span>
            </label>
            <input
              type='text'
              placeholder={session.phone}
              className='input input-bordered w-full max-w-xs'
              disabled
            />
          </div>
          <div className='divider py-8'></div>
          <h2 className='card-title text-sm pb-2'>
            UPDATE ACCOUNT INFORMATION
          </h2>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Email</span>
            </label>
            <input
              type='text'
              placeholder={session.email}
              className='input input-bordered w-full max-w-xs'
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => handleEmailUpdate()}
            >
              Update
            </button>
          </div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Phone</span>
            </label>
            <input
              type='text'
              placeholder={session.phone}
              className='input input-bordered w-full max-w-xs'
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => handlePhoneUpdate()}
            >
              Update
            </button>
          </div>
          <div className='divider py-8'></div>
          <h2 className='card-title text-sm pb-2'>UPDATE PASSWORD</h2>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Current Password</span>
            </label>
            <input
              type='password'
              placeholder='Current Password'
              className='input input-bordered w-full max-w-xs'
            />
          </div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>New Password</span>
            </label>
            <input
              type='password'
              placeholder='New Password'
              className='input input-bordered w-full max-w-xs'
            />
          </div>
          <div className='items-center'>
            <label className='label'>
              <span className='label-text text-xs'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='input input-bordered w-full max-w-xs'
            />
            <button
              className='btn btn-primary ml-7'
              onClick={() => handlePasswordChange()}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDisplay;
