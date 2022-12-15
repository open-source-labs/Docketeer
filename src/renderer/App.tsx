import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Login from '../components/Login';
import Authentication from '../components/Authentication';
import SignUp from '../components/SignUp';
import RenderViews from '../components/RenderViews';

const App = () => {
  
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Authentication />} />
      <Route path='/userSignup' element={<SignUp />} />
      <Route path='/app/*' element={<RenderViews />} />
    </Routes>
  );
};

export default App;