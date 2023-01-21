import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import App from '../src/renderer/App';
import {authenticateUser} from '../src/components/Login';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import {describe, beforeEach, expect, test, jest} from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-test-renderer';
import Docketeer from '../assets/docketeer-title.png';

fetchMock.enableMocks();

describe('Login Page Renders', () => {
  beforeEach( async () => {
    fetch.resetMocks();
    await act(()=>{
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });
    screen.debug();
  });

  test('Username accepts input', async () => {
    const username = document.querySelector('#username');
    await fireEvent.change(username, {target: {value:'sysadmin'}});
    expect(username.value).toBe('sysadmin');
  });

  test('Password accepts input', async () => {
    const password = document.querySelector('#password');
    await fireEvent.change(password, {target: {value:'belugas'}});
    expect(password.value).toBe('belugas');
  });
  
  test('Login button', async () => {
    fetch.mockResponseOnce(JSON.stringify({ username: 'csgroup', password: 'csgroup' }));
    const alert = window.alert = jest.fn();

    // mock the login module as a whole, accessing the imported authenticateUser function property
    jest.mock('../src/components/Login');

    // select login button
    const loginButton2 = screen.getByRole('login');
    // fire event to click login button
    await act(()=>{
      fireEvent.click(loginButton2);
    });
    // should ensure the login button has been clicked
    expect(loginButton2).toBeCalled;
    // should ensure that the authenticate user function invoked by button click is called
    expect(authenticateUser).toBeCalled;
  });

  test('Docketeer Image', async () => {
    const image = await screen.findByRole('img');
    expect(image).toHaveProperty('width');
  });
});