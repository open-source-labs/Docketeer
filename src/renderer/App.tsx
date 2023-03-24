import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Home/Home';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: boolean = useAppSelector((state) => state.sessions.isLoggedIn);

  return (
    <Routes>
      <>
        {console.log({ session })}
        <Route
          path="/"
          element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </>
      <Route path="/login" element={<Login />} />
      <Route path="/userSignup" element={<SignUp />} />
      <Route path="/home/*" element={<Home />} />
    </Routes>
  );
};

export default App;
