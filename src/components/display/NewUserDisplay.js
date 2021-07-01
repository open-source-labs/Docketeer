/**
 * ************************************
 *
 * @module NewUserDisplay
 * @author Alex Smith, Catherine Larcheveque, Charles Ryu, Griffin Silver, Lorenzo Guevara
 * @date 6/10/2021
 * @description Signup component that will be rendered in SysAdmin view, in Users tab, where sysadmin can create an account for new user in organization
 *
 * ************************************
 */

// Npm Module Imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Helper Function Imports
import { handleNewUser, checkPasswordLength, confirmPassword, checkPhone } from '../helper/newUserHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const NewUserDisplay = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="metric-section-title">
        <h3>Create a New User</h3>
      </div>
      <div className="settings-container">
        <p>
          Create a new Docketeer account for an employee. Please confirm with the employee that their information is accurate before submitting.
        </p>
        <br></br>
        <p>
          Note: For the password, please choose random string of 6 characters, numbers, and symbols. Upon account creation, the user will receive an email with credentials and be able to update their password when logging in.
        </p>
        <br></br>
        <form className={classes.root} >
          <TextField 
            id="signupEmail" 
            label="Email" 
            variant="outlined" 
          />
          <br></br>
          <TextField 
            id="signupUsername" 
            label="Username" 
            variant="outlined" 
          />
          <br></br>
          <TextField 
            id="signupPassword" 
            label="Password" 
            variant="outlined" 
            type="password" 
            onChange={() => checkPasswordLength()}
          />
          <span id="password-length-alert"></span>
          <br></br>
          <TextField 
            id="signupPasswordConfirmation" 
            label="Confirm Password" 
            variant="outlined" 
            type="password" 
            onChange={() => confirmPassword()}
          />
          <span id="password-confirmation-alert"></span>
          <br></br>
          <TextField 
            id="signupPhone" 
            label="Phone" 
            variant="outlined" 
            onChange={
              () => {
                checkPhone(document.getElementById('signupPhone').value);
              }
            }
          /><br></br>
          <span id="phone-alert"></span>
          <br></br>
          <Button 
            variant="contained" 
            size="medium" 
            className={classes.button} 
            type="submit" 
            onClick={
              (e) => handleNewUser(e)}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUserDisplay;

