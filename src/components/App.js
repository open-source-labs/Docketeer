import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate, Route, Routes } from 'react-router-dom';

import AdminView from './views/Admin';
import UserView from './views/UserView';
import SysAdminView from './views/SysAdmin';

const App = (props) => {
  // grab current user's role
  const role = useSelector((state) => state.session.role); 
    
  const paths = {
    'system admin': '/app/sysadmin',
    'admin': '/app/admin',
    'user': '/app/user'
  }
  // set path for the active role
  const path = paths[role];  
    
  return( 
    //in return statement:
    //3 routes that take us to the three different view's paths 
    <div>
      Am I in App?
      <Navigate to={path} />
      <Routes>
        <Route path='/sysadmin' element={<SysAdminView />}/>
        <Route path='/admin' element={<AdminView />}/>
        <Route path='/user' element={<UserView />}/>
      </Routes>
    </div>
  )
};

export default App;