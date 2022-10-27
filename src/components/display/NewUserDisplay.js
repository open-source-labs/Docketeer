/**
 * @module NewUserDisplay
 * @description Signup component that will be rendered in SysAdmin view, in Users tab, where sysadmin can create an account for new user in organization
 */
import React from 'react';

// Material UI Imports
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {
  handleNewUser,
  checkPasswordLength,
  confirmPassword,
  checkPhone,
} from '../../module/utils/helper/newUserHelper';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

const NewUserDisplay = () => {
  // const classes = useStyles();
  return (
    <div>
      <div className='metric-section-title'>
        <h3>Create a New User</h3>
      </div>
      <div className='settings-container'>
        <p>
          Create a new Docketeer account for an employee. Please confirm with
          the employee that their information is accurate before submitting.
        </p>
        <br />
        <p>
          Note: For the password, please choose random string of 6 characters,
          numbers, and symbols. Upon account creation, the user will receive an
          email with credentials and be able to update their password when
          logging in.
        </p>
        <br />
<<<<<<< HEAD
        <form className={classes.root}>
          <TextField id="signupEmail" label="Email" variant="outlined" />
          <br />
          <TextField id="signupUsername" label="Username" variant="outlined" />
          <br />
          <TextField
            id="signupPassword"
            label="Password"
            variant="outlined"
            type="password"
            onChange={() => checkPasswordLength()}
          />
          <span id="password-length-alert"></span>
          <br />
          <TextField
            id="signupPasswordConfirmation"
            label="Confirm Password"
            variant="outlined"
            type="password"
            onChange={() => confirmPassword()}
          />
          <span id="password-confirmation-alert"></span>
          <br />
          <TextField
            id="signupPhone"
            label="Phone"
            variant="outlined"
=======
        <form
        // className={classes.root}
        >
          <TextField id='signupEmail' label='Email' variant='outlined' />
          <br />
          <TextField id='signupUsername' label='Username' variant='outlined' />
          <br />
          <TextField
            id='signupPassword'
            label='Password'
            variant='outlined'
            type='password'
            onChange={() => checkPasswordLength()}
          />
          <span id='password-length-alert'></span>
          <br />
          <TextField
            id='signupPasswordConfirmation'
            label='Confirm Password'
            variant='outlined'
            type='password'
            onChange={() => confirmPassword()}
          />
          <span id='password-confirmation-alert'></span>
          <br />
          <TextField
            id='signupPhone'
            label='Phone'
            variant='outlined'
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
            onChange={() => {
              checkPhone(document.getElementById('signupPhone').value);
            }}
          />
          <br />
<<<<<<< HEAD
          <span id="phone-alert"></span>
          <br />
          <Button
            variant="contained"
            size="medium"
            className={classes.button}
            type="submit"
=======
          <span id='phone-alert'></span>
          <br />
          <Button
            variant='contained'
            size='medium'
            // className={classes.button}
            type='submit'
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
            onClick={(e) => handleNewUser(e)}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUserDisplay;
