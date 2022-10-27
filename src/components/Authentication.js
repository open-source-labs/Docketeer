import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authentication = () => {
  // grab session information from state
  const session = useSelector((state) => state.session.isLoggedIn);
  // if session is false navigate to login, if session is true navigate to outlet
  return (
    session ? <Navigate to='/app' /> : <Navigate to='/login' />
  )
}

export default Authentication;