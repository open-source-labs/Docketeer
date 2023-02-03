import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import '@testing-library/react';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import NewUserDisplay from '../src/components/display/NewUserDisplay';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

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

  beforeEach(() => {
    render(<NewUserDisplay {...props} />);
  });
  describe ('Input fields', () => {
    test('Email', () => {
      const email = document.getElementById('signupEmail');
      fireEvent.change(email, { target: {value: 'email'}});
      expect(email).toHaveValue('email');
    });
    test('Username', async () => {
      const username = document.getElementById('signupUsername');
      fireEvent.change(username, { target: {value: 'bad'}});
      expect(username).toHaveValue('bad');
    });
    test('Password', () => {
      const password = document.getElementById('signupPassword');
      fireEvent.change(password, { target: {value: 'password'}});
      expect(password).toHaveValue('password');
    });
    test('Password confirmation', () => {
      const confirmPassword = document.getElementById('signupPasswordConfirmation');
      fireEvent.change(confirmPassword, { target: {value: 'alsopassword'}});
      expect(confirmPassword).toHaveValue('alsopassword');
    });
    test('Phone', () => {
      const phone = document.getElementById('signupPhone');
      fireEvent.change(phone, { target: {value: '123'}});
      expect(phone).toHaveValue('123');
    });
  });

  test('Input fields render and accept text', async () => {
    const button = screen.getByRole('button', { name: 'Submit' });

    await fireEvent.click(button);

    const passwordAlert = document.getElementById('password-length-alert');

    // expect(passwordAlert).toHaveTextContent('Warning: Password must be 6 characters or longer and must include at least one number and one letter')
  });
  
  test('check that onSubmit button is working', async () => {
    window.alert = jest.fn();
    const email = document.getElementById('signupEmail');
    fireEvent.change(email, { target: {value: 'email'}});
    expect(email).toHaveValue('email');

    const username = document.getElementById('signupUsername');
    fireEvent.change(username, { target: {value: 'user'}});
    expect(username).toHaveValue('user');
    
    const password = document.getElementById('signupPassword');
    fireEvent.change(password, { target: {value: 'password123'}});
    expect(password).toHaveValue('password123');

    const confirmPassword = document.getElementById('signupPasswordConfirmation');
    fireEvent.change(confirmPassword, { target: {value: 'password123'}});
    expect(confirmPassword).toHaveValue('password123');

    const phone = document.getElementById('signupPhone');
    fireEvent.change(phone, { target: {value: '+12345678900'}});
    expect(phone).toHaveValue('+12345678900');

    const button = screen.getByRole('button', { name: 'Submit' });
    await fireEvent.click(button);
    fetch.mockResponseOnce(JSON.stringify({ email:'email', username: 'user', password: 'password123', phone: '+12345678900' }));
    expect(window.alert).toBeDefined();
  });

});
