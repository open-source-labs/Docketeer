import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface RootState {
  session: {
    isLoggedIn: boolean
  }
}

const Authentication = () => {
  // grab session information from state
  const session: boolean = useSelector((state: RootState) => state.session.isLoggedIn);
  // if session is false navigate to login, if session is true navigate to outlet
  return (
    session ? <Navigate to='/app' /> : <Navigate to='/login' />
  )
}

export default Authentication;