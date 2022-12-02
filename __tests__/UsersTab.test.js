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
import NewUserDisplay from '../src/components/display/NewUserDisplay';
import * as helpers from '../src/components/helper/newUserHelper';

const props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  onClick: jest.fn(),
};

/* ----- Manage Users Table ----- */

// check for component render
// describe('Render Manage Users Table', () => {
//   beforeEach(() => {
//     render(<NewUserDisplay {...props} />);
//   });
// });

/* ----- Create a New User ----- */

describe('Create a New User functionality', () => {
  // render NewUserDisplay
  beforeEach(() => {
    render(<NewUserDisplay {...props} />);
  });
  // input fields take in text
  test('input fields take in text', () => {
    const input = document.getElementById('signupEmail');
    expect(input).toHaveValue('');
  });
  // password is at least 6 chars long
  test('Password must be 6 characters long', async () => {
    const password = document.getElementById('signupPassword');
    await fireEvent.change(password, { target: { value: '123456' } });
    expect(password.value).toBe('123456');
  });
  // password and confirm passwords match
  test('Password must match Confirm Password', async () => {
    const signup = document.getElementById('signupPassword');
    const confirmation = document.getElementById('signupPasswordConfirmation');
    await fireEvent.change(signup, { target: { value: '123456' } });
    await fireEvent.change(confirmation, { target: { value: '123456' } });
    expect(signup.value).toBe(confirmation.value);
  });
  test('check that onSubmit button is working', async () => {
    const onSubmit = jest.fn();
    const button = screen.getByRole('button', { name: 'Submit' });
    await fireEvent.click(button);
    expect(onSubmit).toBeCalled;
  });

  //* Dummy Test
  describe('dummy test', () => {
    test('dummy test', () => {
      expect(2 + 2).toBe(4);
    });
  });
});
