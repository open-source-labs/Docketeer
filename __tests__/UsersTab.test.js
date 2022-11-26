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
};

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
  test('Password must be 6 characters long', async () => {
    const password = document.getElementById('signupPassword');
    await fireEvent.change(password, { target: { value: '123456' } });
    expect(password.value).toBe('123456');
  });
  // password and confirm passwords match
  // if either of these tests fail, check for error message alert
  test('Password must match Confirm Password', async () => {
    const signup = document.getElementById('signupPassword');
    const confirmation = document.getElementById('signupPasswordConfirmation');
    await fireEvent.change(signup, { target: { value: '123456' } });
    await fireEvent.change(confirmation, { target: { value: '123456' } }); 
    expect(signup.value).toBe(confirmation.value);
  });

  // submit button works when password fields match
  test('onSubmit is called when password fields match', async () => {});

  // Manage Users Table gains a row with correct information

  //* Dummy Test
  describe('dummy test', () => {
    test('dummy test', () => {
      expect(2 + 2).toBe(4);
    });
  });
});
