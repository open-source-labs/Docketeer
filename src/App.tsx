import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './reducers/hooks';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';

import Metrics from './components/Metrics/Metrics';
import Images from './components/Images/Images';
// import Yml from './features/Yml';
import Containers from './components/Containers/Containers';
import Settings from './components/Settings/Settings';
import Users from './components/Users/Users';
import VolumeHistory from './components/VolumeHistory/VolumeHistory';
import ProcessLogs from './components/ProcessLogs/ProcessLogs';
import SharedLayout from './components/SharedLayout/SharedLayout';
import About from './components/About/About';
import useSurvey from './helpers/dispatch';
import useHelper from './helpers/commands';


const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { updateSession } = useSurvey();
  const { checkCookie } = useHelper();
  
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await checkCookie();
        console.log('session on start dog ' + data);
        if (data) {
          updateSession();
          setSession(true);
        } else {
          setSession(false);
        }
        setLoading(false);
      } catch (err) {
        console.log('Cannot get uid key or api key', err);
        setSession(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, [checkCookie, updateSession]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />: 
      <Route path="/login" element={<Login />} />
      <Route path="/userSignup" element={<SignUp />} />
      <Route path="/home" element={session ? <SharedLayout /> :
        <Navigate to="/login" />}>
        <Route index element={<Home />} />
        <Route path="/home/volume" element={<VolumeHistory />} />
        <Route path="/home/metrics" element={<Metrics key={1} />} />
        <Route path="/home/users" element={<Users />} />
        <Route path="/home/logs" element={<ProcessLogs key={1} />} />
        <Route path="/home/about" element={<About />} />
        {/* <Route path="/yml" element={<Yml />} /> */}
        <Route path="/home/images" element={<Images />} />
        <Route path="/home/running" element={<Containers />} />
        <Route path="/home/" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
