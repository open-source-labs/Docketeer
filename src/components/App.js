import React from 'react';
import { useSelector } from 'react-redux';

import AdminView from './views/Admin';
import UserView from './views/UserView';
import SysAdminView from './views/SysAdmin';

const App = () => {
  const role = useSelector((state) => state.session.role);
  if (role === 'system admin') {
    return (
      <div>
        <SysAdminView />
      </div>
    );
  } else if (role === 'admin') {
    return (
      <div>
        <AdminView />
      </div>
    );
  } else {
    return (
      <div>
        <UserView />
      </div>
    );
  }
};

export default App;
