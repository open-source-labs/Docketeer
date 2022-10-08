import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Login from '../components/login/login.js';
import App from '../components/App';

export const App2 = () => {
  return (
    <Provider store={store}>
      <h2>Abigail is a gale-ing force</h2>
      <Router>
        <section className='container2'>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/app/*' element={<App />} />
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};
