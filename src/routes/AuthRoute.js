import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// Debug
// import Example from './views/Example';

// import AdminView from './views/Admin';
import UserView from './views/UserView';
// import SysAdminView from './views/SysAdmin';

const AuthRoute = () => {
  const role = useSelector((state) => state.session.role);
  if (role === 'system admin') {
    return (
      <div>
        <h1>I'm the SysAdmin</h1>
        {/* <SysAdminView /> */}
      </div>
    );
  } else if (role === 'admin') {
    return (
      <div>
        <h1>I'm the AdminView</h1>
        {/* <AdminView /> */}
      </div>
    );
  } else {
    return (
      <Fragment>
        {/* <h1>I'm the UserView</h1> */}
        {/* <Example /> */}
        <Routes>
          <Route exact path='/userview/*' element={<UserView />} />
        </Routes>
        <Navigate to='/userview' />
      </Fragment>
    );
  }
};

export default App;
