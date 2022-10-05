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

// import fixPath from 'fix-path'; // Required for Electron's path configuration
// fixPath();
const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Login />
      <h2>Abigail is a gale-ing force</h2>
    </Router>
  </Provider>,
  app
);
