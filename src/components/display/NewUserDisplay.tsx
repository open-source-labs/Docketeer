/**
 * @module NewUserDisplay
 * @description Signup component that will be rendered in SysAdmin view, in Users tab, where sysadmin can create an account for new user in organization
 */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import {
  handleNewUser,
  checkPasswordLength,
  confirmPassword,
  checkPhone,
} from '../helper/newUserHelper';

// this will store the value from the user role
let valueRole = '3'; 
//setting value of the RadioGroup MUI Component to the one selected by the user
const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  valueRole = (event.target as HTMLInputElement).value;
}

const NewUserDisplay = () => {
  // const [password, setPassword] = useState('');
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
   
    <div style={{ background: '#E1E4E6' }}>
      <div className='settings-container' style={{ marginTop: '80px' }}>
        <div className='metric-section-title'>
          <h3>Create a New User</h3>
        </div>
        <p>
          Create a new Docketeer account for an employee. Please confirm with the employee that their information is accurate before submitting.
        </p>
        <br/>
        <p>
          Note: For the password, please choose a random string of 6 characters,
          numbers, and symbols. Upon account creation, the user will receive an
          email with credentials and be able to update their password when
          logging in.
        </p>
        <br />
        <Box
          className='settingsForm'
          component= 'form'
          autoComplete= 'off'
          onSubmit={(e) => handleNewUser(e)}
          sx={{color:'blue'}}
        >
     
          <TextField
            id='signupEmail'
            label='Email'
            variant='outlined'
            required
            sx={{
              m: 1
            }}
          />
          <br />
          <TextField
            id='signupUsername'
            label='Username'
            variant='outlined'
            required
            inputProps={{ minLength: 4, maxLength: 16 }}
            sx={{
              m: 1
            }}
          />
          <br />

          <FormControl sx={{ m: 1, maxWidth:195 }} variant="outlined">
            <InputLabel htmlFor="signupPassword">Password</InputLabel>
            <OutlinedInput
              id="signupPassword"
              type={values.showPassword ? 'text' : 'password'}
              onChange={(e)=>{
                checkPasswordLength(e);
                setValues({...values, password:e.target.value})
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {values.password && <PasswordStrengthBar style={{maxWidth:'190px', color:'red',marginLeft:10 }} password= {values.password}/>}
          <span id='password-length-alert' style={{fontSize:10, textAlign:'left', maxWidth:190, display:'inline-block', marginLeft:10}}></span>

          {/* <TextField
            id='signupPassword'
            label='Password'
            variant='outlined'
            type='password'
            required
            inputProps={{ minLength: 6, maxLength: 16 }}
            
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordLength(e);}}
            sx={{
              m: 1
            }}
          /> */}

          {/* {password && <PasswordStrengthBar style={{maxWidth:'190px', color:'red',marginLeft:10 }} password= {password}/>}
          <span id='password-length-alert' style={{fontSize:10, textAlign:'left', maxWidth:190, display:'inline-block', marginLeft:10}}></span> */}

          <br />
          <TextField
            id='signupPasswordConfirmation'
            label='Confirm Password'
            variant='outlined'
            type='password'
            required
            onChange={(e) => {
              setValues({...values, passwordConfirmation:e.target.value})
              confirmPassword(e)
            }}
            sx={{
              m: 1
            }}
          />
          {/* This is sacrilege but I hardcoded this bar and made it hidden to keep the same formatting as above */}
          {<PasswordStrengthBar style={{maxWidth:'190px', color:'red',marginBottom:-20,visibility:'hidden', maxHeight:0 }} />}
          <span id='password-confirmation-alert' style={{fontSize:10, textAlign:'left', maxWidth:190, display:'inline-block', marginLeft:10, paddingTop:15}}></span>
          <br />
          <TextField
            id='signupPhone'
            label='Phone'
            variant='outlined'
            required
            onChange={() => {
              checkPhone(document.getElementById('signupPhone').value);
            }}
            sx={{
              m: 1
            }}
          />
          <FormControl>
            <RadioGroup
              id="new-user-role"
              row
              defaultValue="3"
              onChange={handleSelect}
            >
              <FormControlLabel value="1" control={<Radio />} label="System Admin"></FormControlLabel>
              <FormControlLabel value="2" control={<Radio />} label="Admin"></FormControlLabel>
              <FormControlLabel value="3" control={<Radio />} label="User"></FormControlLabel>
            </RadioGroup>
          </FormControl>
          <br />
          <span id='phone-alert'></span>
          <br />
          <Button
            variant='contained'
            size='medium'
            type='submit'
            sx={{
              m: 1
            }}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default NewUserDisplay;

