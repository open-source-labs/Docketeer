import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Login from '../components/login/login';
import { Provider } from 'react-redux';
import store from './store';

export const App2 = () => {
  return (
    <Provider store={store}>
      <Router>
        <Login />
        <h2>Abigail is a gale-ing force</h2>
      </Router>
    </Provider>
  );
};
