import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Components
import Login from '../components/login/login.js';
import App from '../components/App';
import UserView from '../components/views/UserView';

export const App2 = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/app' element={<App />} />
      <Route exact path='/UserView/*' element={<UserView />} />
    </Routes>
  );
};
