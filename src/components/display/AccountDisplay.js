/**
 * ************************************
 *
 * @module AccountDisplay
 * @author Catherine Larcheveque, Lorenzo Guevara, Charles Ryu, Griffin Silver, Alex Smith
 * @date 6/14/2021
 * @description Account Display for Settings tab, this will host any forms to update account details such as email, passwords, etc.
 *
 * ************************************
 */

// Npm Module Imports
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI Imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

// Helper Function Imports
import { handlePasswordChange, confirmPassword, checkPasswordLength, checkCurrentPassword, handleEmailUpdate, handlePhoneUpdate, checkPhone } from '../helper/settingsHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginLeft: 5,
      marginBottom: 15,
      width: 220,
      verticalAlign: 'middle',
    },
  },
  button: {
    '& > *': {
      pointerEvents: 'none',
    },
    marginLeft: 5,
    width: 100,
    verticalAlign: 'top',
  },
  verifiedIcon: {
    verticalAlign: 'top',
    color: 'green',
  },
  description: {
    marginLeft: 5,
    marginBottom: 30,
  },
}));

const AccountDisplay = () => {

  const session = useSelector((state) => state.session);
  const classes = useStyles();
  return(
    <div>
      <div className="metric-section-title">
        <h3>Account Information</h3>
      </div>
      <div className="settings-container">
        <p>
          View your account information.
        </p>
        <br></br>
        <strong>Email</strong>
        <p>{session.email}</p>
        <br></br>
        <strong>Username</strong>
        <p>{session.username}</p>
        <br></br>
        <strong>Phone</strong>
        <p>{session.phone}</p>
        <br></br>
      </div>
      <div className="metric-section-title">
        <h3>Update Your Account</h3>
      </div>
      <div className="settings-container">
        <p>1. Update your email address</p>
        <br></br>
        <form className={classes.root} autoComplete="off">
          <TextField
            className={classes.textfield}
            id="update-email-input"
            label="Email"
            helperText={session.email}
            variant="outlined"
            size="small"
          />
          <Button
            className={classes.button}
            size="medium"
            variant="contained"
            onClick={() => handleEmailUpdate()}
          >
              Update
          </Button>
          <br></br>
          <span id="update-email-alert"></span>
        </form>
        <p>2. Update your phone number</p>
        <br></br>
        <form className={classes.root} autoComplete="off">
          <TextField
            className={classes.textfield}
            id="update-phone-input"
            label="Phone Number"
            helperText={session.phone}
            onChange={() => checkPhone(document.getElementById('update-phone-input').value)}
            variant="outlined"
            size="small"
          />
          <Button
            className={classes.button}
            size="medium"
            variant="contained"
            onClick={() => handlePhoneUpdate()}
          >
              Update
          </Button>
          <br></br>
          <span id="update-phone-alert"></span>
        </form>
        <p>3. Use the form below to update your password:</p>
        <br></br>
        <form className={classes.root} autoComplete="off">
          <p>Current Password</p>
          <br></br>
          <TextField
            required
            id="current-password-input"
            label="Current Password"
            variant="outlined"
            type="password"
            onChange={() => checkCurrentPassword()}
            size="small"
          />
          <span id="current-password-alert"></span>
          <br></br>
          <p>New Password</p>
          <br></br>
          <TextField
            required
            id="new-password-input"
            label="New Password"
            variant="outlined"
            type="password"
            onChange={() => checkPasswordLength()}
            size="small"
          />
          <span id="new-password-alert"></span>
          <br></br>
          <p>Confirm New Password</p>
          <br></br>
          <TextField
            required
            id="new-password-confirmation-input"
            label="Confirm New Password"
            variant="outlined"
            type="password"
            onChange={() => confirmPassword()}
            // value="80" set this later
            size="small"
          />
          <span id="confirm-new-password-alert"></span>
          <br></br>
          <br></br>
          <Button
            className={classes.button}
            size="medium"
            color="default"
            variant="contained"
            onClick={() => handlePasswordChange()}
            endIcon={<SendIcon />}
          >
                Submit
          </Button>
        </form>
      </div>
    </div>
  );

};

export default AccountDisplay;