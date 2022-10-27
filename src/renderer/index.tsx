import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from '../views/login';
import '../assets/css';

// import fixPath from 'fix-path'; // Required for Electron's path configuration
// fixPath();
const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Login />
      <h2>Abigail is a gale-ing force</h2>
    </Router>
  </Provider>,
  app
);
