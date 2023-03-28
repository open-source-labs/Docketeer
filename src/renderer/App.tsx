import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Home/Home';

// Importing features
import Metrics from '../components/features/Metrics';
import Images from '../components/Images/Images';
// import Yml from '../components/features/Yml';
import Containers from '../components/Containers/Containers';
import Settings from '../components/features/Settings';
import Users from '../components/Users/Users';
import VolumeHistory from '../components/VolumeHistory/VolumeHistory';
import ProcessLogs from '../components/ProcessLogs/ProcessLogs';
// import ProcessLogsTable from '../components/ProcessLogsTable/ProcessLogsTable';
import SharedLayout from '../components/SharedLayout/SharedLayout';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: boolean = useAppSelector((state) => state.sessions.isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/userSignup" element={<SignUp />} />
      <Route path="/home" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/home/volume" element={<VolumeHistory />} />
        <Route path="/home/metrics" element={<Metrics key={1} />} />
        <Route path="/home/users" element={<Users />} />
        <Route path="/home/logs" element={<ProcessLogs key={1} />} />
        {/* <Route
          path="/home/logTable/:containerId"
          element={<ProcessLogsTable />}
        /> */}
        {/* <Route path="/home/yml" element={<Yml />} /> */}
        <Route path="/home/images" element={<Images />} />
        <Route path="/home/running" element={<Containers />} />
        <Route path="/home/" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
