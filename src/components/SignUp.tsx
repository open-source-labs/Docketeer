import React from "react";
import { useNavigate } from 'react-router-dom';

// Material UI Imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Helper Functions
import {
    handleNewUser,
    checkPasswordLength,
    confirmPassword,
    checkPhone,
  } from "./helper/newUserHelper";

const SignUp = () => {
    const navigate = useNavigate();

    return (
      <div className='renderContainers'>
        <div className='header'>
          <h1 className='tabTitle'>Sign Up</h1>
        </div>
        <div className='settings-container'>
        <form className='loginForm' >
            <TextField
                id="signupEmail"
                label="Email"
                variant="outlined"
                sx={{
                m: 1,
                }}
            />
            <br />
            <TextField
                id="signupUsername"
                label="Username"
                variant="outlined"
                sx={{
                m: 1,
                }}
            />
            <br />
            <TextField
                id="signupPassword"
                label="Password"
                variant="outlined"
                type="password"
                onChange={() => checkPasswordLength()}
                sx={{
                m: 1,
                }}
            />
            <span id="password-length-alert"></span>
            <br />
            <TextField
                id="signupPasswordConfirmation"
                label="Confirm Password"
                variant="outlined"
                type="password"
                onChange={() => confirmPassword()}
                sx={{
                m: 1,
                }}
            />
            <span id="password-confirmation-alert"></span>
            <br />
            <TextField
                id="signupPhone"
                label="Phone"
                variant="outlined"
                onChange={() => {
                //fixing the property 'value' does not exist on type 'HTMLElement'
                const inputValue = (
                    document.getElementById("signupPhone") as HTMLTextAreaElement
                ).value;
                checkPhone(inputValue);
                }}
                sx={{
                m: 1,
                }}
            />
            <br />
            <span id="phone-alert"></span>
            <br />
            <Button
                variant="contained"
                size="medium"
                type="submit"
                onClick={(e) => {
                    handleNewUser(e, '1')
                    navigate('/')
                }}
                sx={{
                m: 1,
                }}
            >
                Submit
            </Button>
          </form>
        </div>
      </div>
    )
}

export default SignUp;