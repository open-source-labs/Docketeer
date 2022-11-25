import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import '@testing-library/react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Users from '../src/components/tabs/Users';
import NewUserDisplay from '../src/components/display/NewUserDisplay';
import { checkPasswordLength } from '../src/components/helper/newUserHelper';
import { userInfo } from 'os';
import user from '@testing-library/user-event';

const props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  onClick: jest.fn(),
}


/* ----- Mock Functions ----- */

/* ----- Manage Users Table ----- */

// checking for button functionality
// describe('Manage Users Table', () => {
//   test()
// })

/* ----- Create a New User ----- */

describe('Create a New User functionality', () => {
  // render NewUserDisplay
  beforeEach(() => {
    render(<NewUserDisplay {...props} />);
  });
  // input fields take in text
  test('input fields take in text', () => {
    const input = document.getElementById('signupEmail');
    // screen.debug();
    expect(input).toHaveValue('');
  });
  // password is at least 6 chars long
  test('password field must have at least 6 chars', () => {

  });
  // password and confirm passwords match
  // if either of these tests fail, check for error message alert

  // submit button works when password fields match
  test('onSubmit is called when password fields match', async () => {
    user.type(getPasswordField(), '123456');
    user.type(getConfirmationField(), '123456');
    const submitBtn = screen.getByRole('button', { name: 'submit' });
    await user.click(submitBtn);
    screen.debug();
    expect(submitBtn).toBeCalled();
  })
  // Manage Users Table should gain a row

});

const getPasswordField = () => {
  return document.getElementById('signupPassword');
};

const getConfirmationField = () => {
  return document.getElementById('signupPasswordConfirmation');
}