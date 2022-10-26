import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Login from '../components/login/login.js';
import RenderViews from '../components/RenderViews';
import Authentication from '../components/Authentication'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Authentication />} />
        <Route path='/app/*' element={<RenderViews />} />
      </Routes>
    </>
  );
};
