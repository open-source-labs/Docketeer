import React from 'react';
import { useSelector } from 'react-redux';

// Debug
import Example from './views/Example';

// import AdminView from './views/Admin';
import UserView from './views/UserView';
// import SysAdminView from './views/SysAdmin';

const App = (props) => {
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
      <div>
        {/* <h1>I'm the UserView</h1> */}
        {/* <Example /> */}
        <UserView />
      </div>
    );
  }
};

export default App;
