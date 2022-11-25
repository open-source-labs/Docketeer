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
} from '@testing-library/react';
import Users from '../src/components/tabs/Users';
import NewUserDisplay from '../src/components/display/NewUserDisplay';
import { checkPasswordLength } from '../src/components/helper/newUserHelper';

/* ----- Manage Users Table ----- */

// checking for button functionality
// describe('Manage Users Table', () => {
//   test()
// })

/* ----- Create a New User ----- */

describe('Create a New User functionality', () => {
  // render NewUserDisplay
  beforeAll(() => {
    render(<NewUserDisplay />);
  });
  // input fields take in text
  test('input fields take in text', () => {
    const input = document.getElementById('signupEmail');
    screen.debug();
    expect(input).toHaveValue('');
  });
  // password is at least 6 chars long
  test('password field must have at least 6 chars', () => {

  });
  // password and confirm passwords match
  // if either of these tests fail, check for error message alert

  // submit button on click works

  // Manage Users Table should gain a row
});
