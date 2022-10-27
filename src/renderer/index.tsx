import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import '../components/css/styles.css';
import '../components/css/metric.css';
import '../components/css/running.css';
import '../components/css/static.css';
import Login from '../components/login/login';

import fixPath from 'fix-path'; // Required for Electron's path configuration
fixPath();

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Login />
    </Router>
  </Provider>,
  document.getElementById('app')
);
