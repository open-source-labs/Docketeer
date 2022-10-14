import React from 'react';
import { useSelector } from 'react-redux';
import {  Navigate, Route, Routes } from 'react-router-dom';


import AdminView from './views/Admin';
import UserView from './views/UserView';
import SysAdminView from './views/SysAdmin';

const App = (props) => {
  // grab current user's role
  const role = useSelector((state) => state.session.role); 
    
  // const paths = {
  //   'system admin': '/app/sysadmin',
  //   'admin': '/app/admin',
  //   'user': '/app/user'
  // }
  // set path for the active role
  // const path = paths[role];  

  console.log("App Running")
  // console.log(path)
  // console.log(role)

  // return (
  //   <div>
  //     Am I in App?
  //     <Navigate to={path} />
  //     <Routes>
  //       <Route path='/sysadmin/*' element={<SysAdminView />}/>
  //       <Route path='/admin/*' element={<AdminView />}/>
  //       <Route path='/user/*' element={<UserView />}/>
  //     </Routes>
  //   </div>
  // )


  if (role === 'system admin') { return (  
    <div>
      Am I in App?
      <SysAdminView />
    </div>
    )
  }
  else if (role === 'admin') { return (
    <div>
      Am I in App?
      <AdminView />
    </div>
    )
  }
  else if (role === 'user') { return (
    <div>
      Am I in App?
      <UserView />
    </div>
    )
  }
};

export default App;