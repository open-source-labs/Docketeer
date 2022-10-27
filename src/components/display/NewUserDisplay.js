/**
 * @module NewUserDisplay
 * @description Signup component that will be rendered in SysAdmin view, in Users tab, where sysadmin can create an account for new user in organization
 */
import React from 'react';

// Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  handleNewUser,
  checkPasswordLength,
  confirmPassword,
  checkPhone,
} from '../../module/utils/helper/newUserHelper';


const NewUserDisplay = () => {
  return (
    <div style={{ background: '#E1E4E6' }}>
      <div className='settings-container' style={{ marginTop: '60px' }}>
        <div className='metric-section-title'>
          <h3>Create a New User</h3>
        </div>
        <p>
          Create a new Docketeer account for an employee. Please confirm with
          the employee that their information is accurate before submitting.
        </p>
        <br />
        <p>
          Note: For the password, please choose a random string of 6 characters,
          numbers, and symbols. Upon account creation, the user will receive an
          email with credentials and be able to update their password when
          logging in.
        </p>
        <br />
        <form className='settingsForm'>
          <TextField
            id='signupEmail'
            label='Email'
            variant='outlined'
            sx={{
              m: 1
            }}
          />
          <br />
          <TextField
            id='signupUsername'
            label='Username'
            variant='outlined'
            sx={{
              m: 1
            }}
          />
          <br />
          <TextField
            id='signupPassword'
            label='Password'
            variant='outlined'
            type='password'
            onChange={() => checkPasswordLength()}
            sx={{
              m: 1
            }}
          />
          <span id='password-length-alert'></span>
          <br />
          <TextField
            id='signupPasswordConfirmation'
            label='Confirm Password'
            variant='outlined'
            type='password'
            onChange={() => confirmPassword()}
            sx={{
              m: 1
            }}
          />
          <span id='password-confirmation-alert'></span>
          <br />
          <TextField
            id='signupPhone'
            label='Phone'
            variant='outlined'
            onChange={() => {
              checkPhone(document.getElementById('signupPhone').value);
            }}
            sx={{
              m: 1
            }}
          />
          <br />
          <span id='phone-alert'></span>
          <br />
          <Button
            variant='contained'
            size='medium'
            type='submit'
            onClick={(e) => handleNewUser(e)}
            sx={{
              m: 1
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUserDisplay;
