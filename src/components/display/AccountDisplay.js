/**
 * @module AccountDisplay
 * @description Account Display for Settings tab, this will host any forms to update account details such as email, passwords, etc.
 */
import React from 'react';
import { useSelector } from 'react-redux';

// Material UI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { makeStyles } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

import {
  handlePasswordChange,
  confirmPassword,
  checkPasswordLength,
  checkCurrentPassword,
  handleEmailUpdate,
  handlePhoneUpdate,
  checkPhone,
} from '../../module/utils/helper/settingsHelper';

<<<<<<< HEAD
const useStyles = makeStyles(() => ({
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
=======
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       marginLeft: 5,
//       marginBottom: 15,
//       width: 220,
//       verticalAlign: 'middle'
//     }
//   },
//   button: {
//     '& > *': {
//       pointerEvents: 'none'
//     },
//     marginLeft: 5,
//     width: 100,
//     verticalAlign: 'top'
//   },
//   verifiedIcon: {
//     verticalAlign: 'top',
//     color: 'green'
//   },
//   description: {
//     marginLeft: 5,
//     marginBottom: 30
//   }
// }));
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)

const AccountDisplay = () => {
  const session = useSelector((state) => state.session);
  // const classes = useStyles();

  return (
    <div>
      <div className='metric-section-title'>
        <h3>Account Information</h3>
      </div>
<<<<<<< HEAD
      <div className="settings-container">
=======
      <div className='settings-container'>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
        <p>View your account information.</p>
        <br />
        <strong>Email</strong>
        <p>{session.email}</p>
        <br />
        <strong>Username</strong>
        <p>{session.username}</p>
        <br />
        <strong>Phone</strong>
        <p>{session.phone}</p>
        <br />
      </div>
      <div className='metric-section-title'>
        <h3>Update Your Account</h3>
      </div>
      <div className='settings-container'>
        <p>1. Update your email address</p>
        <br />
<<<<<<< HEAD
        <form className={classes.root} autoComplete="off">
=======
        <form
          // className={classes.root}
          autoComplete='off'
        >
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <TextField
            // className={classes.textfield}
            id='update-email-input'
            label='Email'
            helperText={session.email}
            variant='outlined'
            size='small'
          />
          <Button
            // className={classes.button}
            size='medium'
            variant='contained'
            onClick={() => handleEmailUpdate()}
          >
            Update
          </Button>
          <br />
<<<<<<< HEAD
          <span id="update-email-alert"></span>
        </form>
        <p>2. Update your phone number</p>
        <br />
        <form className={classes.root} autoComplete="off">
=======
          <span id='update-email-alert'></span>
        </form>
        <p>2. Update your phone number</p>
        <br />
        <form
          // className={classes.root}
          autoComplete='off'
        >
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <TextField
            // className={classes.textfield}
            id='update-phone-input'
            label='Phone Number'
            helperText={session.phone}
            onChange={() =>
              checkPhone(document.getElementById('update-phone-input').value)
            }
<<<<<<< HEAD
            variant="outlined"
            size="small"
=======
            variant='outlined'
            size='small'
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          />
          <Button
            // className={classes.button}
            size='medium'
            variant='contained'
            onClick={() => handlePhoneUpdate()}
          >
            Update
          </Button>
          <br />
<<<<<<< HEAD
          <span id="update-phone-alert"></span>
        </form>
        <p>3. Use the form below to update your password:</p>
        <br />
        <form className={classes.root} autoComplete="off">
=======
          <span id='update-phone-alert'></span>
        </form>
        <p>3. Use the form below to update your password:</p>
        <br />
        <form
          // className={classes.root}
          autoComplete='off'
        >
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <p>Current Password</p>
          <br />
          <TextField
            required
            id='current-password-input'
            label='Current Password'
            variant='outlined'
            type='password'
            onChange={() => checkCurrentPassword()}
            size='small'
          />
<<<<<<< HEAD
          <span id="current-password-alert"></span>
=======
          <span id='current-password-alert'></span>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <br />
          <p>New Password</p>
          <br />
          <TextField
            required
            id='new-password-input'
            label='New Password'
            variant='outlined'
            type='password'
            onChange={() => checkPasswordLength()}
            size='small'
          />
<<<<<<< HEAD
          <span id="new-password-alert"></span>
=======
          <span id='new-password-alert'></span>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <br />
          <p>Confirm New Password</p>
          <br />
          <TextField
            required
            id='new-password-confirmation-input'
            label='Confirm New Password'
            variant='outlined'
            type='password'
            onChange={() => confirmPassword()}
            // value="80" set this later
            size='small'
          />
<<<<<<< HEAD
          <span id="confirm-new-password-alert"></span>
=======
          <span id='confirm-new-password-alert'></span>
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)
          <br />
          <br />
          <Button
            // className={classes.button}
            size='medium'
            color='primary'
            variant='contained'
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
