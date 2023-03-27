import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../reducers/hooks';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';

// Importing features
import Metrics from '../Metrics/Metrics';
import Images from '../Images/Images';
// import Yml from './features/Yml';
import Containers from '../Containers/Containers';
import Settings from '../Settings/Settings';
import Users from '../Users/Users';
import VolumeHistory from '../VolumeHistory/VolumeHistory';
import ProcessLogs from '../ProcessLogs/ProcessLogs';
// import ProcessLogsTable from '../components/ProcessLogsTable/ProcessLogsTable';
import SharedLayout from '../SharedLayout/SharedLayout';

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
        {/* <Route path="/yml" element={<Yml />} /> */}
        <Route path="/home/images" element={<Images />} />
        <Route path="/home/running" element={<Containers />} />
        <Route path="/home/" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
