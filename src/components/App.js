import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminView from './views/Admin';
import UserView from './views/User';

const App = () => {

  let isAdmin = true;

  if (isAdmin) {
    return (
      <div>
        <AdminView />
      </div>
    )
  }

  else {
    return (
      <div>
        <UserView />
      </div>
    )
  }
}

export default App;