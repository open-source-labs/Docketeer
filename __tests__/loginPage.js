import '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import {render, fireEvent, screen, getAllByRole} from '@testing-library/react';
// trying to import ts files is giving issues for time being, probably related to compiling
import App from '../src/renderer/App';
import Login from '../src/components/login/login';
// import AccountDisplay from '../src/components/display/AccountDisplay';
import {BrowserRouter, MemoryRouter, Routes, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import {describe, expect, test, jest} from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-test-renderer';


const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//  useNavigate: () => mockedUsedNavigate,
// }));

fetchMock.enableMocks();

describe('Login Page Renders', () => {

  beforeEach( async () => {
    fetch.resetMocks();
    await act(()=>{
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App/>
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
    fetch.mockResponseOnce(JSON.stringify({ username: 'sysadmin', password: 'belugas' }));
    const alert = window.alert = jest.fn();
    const loginButton = screen.getByRole('button');
    await act(()=>{
      fireEvent.click(loginButton);
    });
    // need to fix issue of localhost/4000 not rendering anything after you login
    // screen.debug( ); 
    // it is blank, which is expected for the test, but not for the application as a whole

    // should fail, look into this test
  });
});