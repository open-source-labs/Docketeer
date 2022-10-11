import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// Components
import Login from '../components/login/login.js';
import App from '../components/App';
import Authentication from '../components/Authentication'
// import UserView from '../components/views/UserView';

export const App2 = () => {
  console.log("App 2 Running")
  //check 
  return (
    <>
      <div>
        Am I in App2?
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Authentication />} />
        <Route path='/app/*' element={<App />} />
      </Routes>
    </>
  );
};
