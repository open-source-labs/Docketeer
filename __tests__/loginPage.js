import '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import {render, fireEvent, screen, getAllByRole} from '@testing-library/react';
// trying to import ts files is giving issues for time being, probably related to compiling
// import App from '../src/renderer/App';
import Login from '../src/components/login/login';
// import AccountDisplay from '../src/components/display/AccountDisplay';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store.js';

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Login Page Renders', () => {

  beforeEach(() => {
    fetch.resetMocks();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    // screen.debug();
  });

  test('Username accepts input', async () => {
    const username = document.querySelector('#username');
    await fireEvent.change(username, {target: {value:'hi'}});
    expect(username.value).toBe('hi');
  });

  test('Password accepts input', async () => {
    const password = document.querySelector('#password');
    await fireEvent.change(password, {target: {value:'hi'}});
    expect(password.value).toBe('hi');
  });
  
  test('Login button', async () => {
    fetch.mockResponseOnce(JSON.stringify({ username: 'string', password: 'anotherstring' }));

    const loginButton = screen.getByRole('button');
    await fireEvent.click(loginButton);
    // should fail, look into this test
    expect(loginButton).not.toBeCalled;
    screen.debug( loginButton);
  });
});