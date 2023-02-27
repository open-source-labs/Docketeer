import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Home from '../components/Home';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = useAppSelector((state) => state.sessions.isLoggedIn);

  return (
    <Routes>
      <Route
        path='/'
        element={session ? <Navigate to='/home' /> : <Navigate to='/login' />}
      />
      <Route path='/login' element={<Login />} />
      <Route path='/userSignup' element={<SignUp />} />
      <Route path='/home/*' element={<Home />} />
    </Routes>
  );
};

export default App;
