import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// Debug
// import Example from './views/Example';

import AdminView from './views/Admin';
import UserView from './views/UserView';
import SysAdminView from './views/SysAdmin';

const AuthRoute = () => {
  const role = useSelector((state) => state.session.role);
  // * THIS NEEDS TO BE CHANGED/DELETED
  // const role = 'system admin';
  // * THIS NEEDS TO BE CHANGED/DELETED

  if (role === 'system admin') {
    return (
      <Fragment>
        {/* <Navigate to='/app/SysAdminView' /> */}
        <Routes>
          <Route path='/SysAdminView/*' element={<SysAdminView />} />
        </Routes>
      </Fragment>
    );
  } else if (role === 'admin') {
    return (
      <Fragment>
        {/* <Navigate to='/app/AdminView' /> */}
        <Routes>
          <Route path='/AdminView/*' element={<AdminView />} />
        </Routes>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {/* <Navigate to='/app/UserView' /> */}
        <Routes>
          <Route path='/UserView/*' element={<UserView />} />
        </Routes>
      </Fragment>
    );
  }
};

export default App;
