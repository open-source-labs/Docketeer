import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import App from '../src/renderer/App';
import Login from '../src/components/login/login';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store';
import {describe, beforeEach, expect, test, jest} from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-test-renderer';
import Docketeer from '../assets/docketeer-title.png';

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
    fetch.mockResponseOnce(JSON.stringify({ username: 'sysadmin', password: 'belugas' }));
    const alert = window.alert = jest.fn();
    const loginButton = screen.getByRole('button');
    await act(()=>{
      fireEvent.click(loginButton);
    });
    // need to fix issue of localhost/4000 not rendering anything after you login
  });

  test('Docketeer Image', async () => {
    const image = await screen.findByRole('img');
    expect(image).toHaveProperty('width');
  });
});