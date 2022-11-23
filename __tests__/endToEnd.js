import '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import {render, fireEvent, screen} from '@testing-library/react';
import {App} from '../src/renderer/App';
import Login from '../src/components/login/login';
// import AccountDisplay from '../src/components/display/AccountDisplay';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/renderer/store.js';
// const store = require('../src/renderer/store');

describe('dummy test', () => {
  it('checking render', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
    );
    screen.debug();
  });
});