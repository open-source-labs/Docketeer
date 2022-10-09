import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from '../views/login';
import '../assets/css';

import fixPath from 'fix-path'; // Required for Electron's path configuration
fixPath();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Login />
    </Router>
  </Provider>,
  document.getElementById('app')
);
