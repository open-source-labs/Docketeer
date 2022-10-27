import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// Components
import Login from '../components/login/login.js';
import App from '../components/App';
import Authentication from '../components/Authentication'
// import UserView from '../components/views/UserView';

export const App2 = () => {
  //check 
  return (
    <>
      {/* <ul>
        <Link style={{ color: 'white', fontSize: '2em' }} to='/login'>
          Login
        </Link>
        <br />
        <Link style={{ color: 'white', fontSize: '2em' }} to='/app'>
          App
        </Link>
        <br />
        <Link style={{ color: 'white', fontSize: '2em' }} to='/app/UserView'>
          UserView
        </Link>
      </ul> */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Authentication />}>
          <Route path='/*' element={<App />} />
        </Route>
      </Routes>
    </>
  );
};
