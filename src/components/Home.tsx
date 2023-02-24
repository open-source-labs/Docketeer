// Module imports
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import useSurvey from './helper/dispatch';
import { useAppSelector } from '../redux/reducers/hooks';

// Static imports
import useHelper from './helper/commands';
import * as history from './helper/volumeHistoryHelper';

// @ts-ignore
import Docketeer from '../../assets/docketeer-title.png';

// Tab component imports
import Metrics from './tabs/Metrics';
import Images from './tabs/Images';
import Yml from './tabs/Yml';
import Containers from './tabs/Containers';
import Settings from './tabs/Settings';
import UserList from './tabs/Users'; //* Feature only for SysAdmin
import VolumeHistory from './tabs/VolumeHistory';
import ProcessLogs from './tabs/ProcessLogs';
import ProcessLogsTable from './display/ProcessLogsTable';

// Helper function imports
import startNotificationRequester from './helper/notificationsRequester';
import initDatabase from './helper/initDatabase';
import Alert from './Alert';

// Container component that has all redux logic along with react router
const Home = () => {
  const navigate = useNavigate();

  const { sessions, volumes } = useAppSelector((state) => state);
  const userData = sessions;
  const { arrayOfVolumeNames } = volumes;

  const {
    getHostStats,
    refreshRunning,
    refreshStopped,
    refreshImages,
    writeToDb,
    networkContainers,
    setDbSessionTimeZone,
    getAllDockerVolumes,
    handlePruneClick,
    getVolumeContainers,
  } = useHelper();

  // Deconstructs dispatch functions from useSurvey memo
  const { updateSession, logoutUser, updateUser, getVolumeContainerList } =
    useSurvey();

  // Handles logout of client
  const handleLogout = () => {
    updateSession();
    logoutUser();
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        return console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/login');
  };

  // Initial refresh
  useEffect(() => {
    initDatabase();
    getHostStats();
    refreshRunning();
    refreshStopped();
    refreshImages();
    writeToDb();
    networkContainers();
    setDbSessionTimeZone();
    getAllDockerVolumes();
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainerList
    );
  }, [arrayOfVolumeNames]);

  // Invoke helper functions every 5 seconds to: refresh running/stopped containers/images & notifications

  const state = useAppSelector((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      getHostStats();
      refreshRunning();
      refreshStopped();
      refreshImages();
    }, 5000);
    startNotificationRequester(state);
    return () => clearInterval(interval);
  }, []);

  // Pertains to sysAdmin only
  useEffect(() => {
    fetch('http://localhost:3000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: userData.token,
        username: userData.username,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className='navbar bg-neutral text-neutral-content rounded-lg'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/home/'>Settings</Link>
              </li>

              <li>
                <Link to='/home/users'>Users</Link>
              </li>
              <li>
                <Link to='/home/running'>Containers</Link>
              </li>
              <li>
                <Link to='/home/images'>Images</Link>
              </li>
              <li>
                <Link to='/home/metrics'>Metrics</Link>
              </li>
              <li>
                <Link to='/home/yml'>Docker Compose</Link>
              </li>
              <li>
                <Link to='/home/volume'>Volume History</Link>
              </li>
              <li>
                <Link to='/home/logs'>Process Logs</Link>
              </li>
              <li>
                <a onClick={(e) => handlePruneClick(e)}>System Prune</a>
              </li>
            </ul>
          </div>
          <a className='btn btn-ghost normal-case text-xl'>docketeer</a>
        </div>
        <div className='navbar-center hidden xl:flex'>
          <ul className='menu menu-horizontal px-1 text-xs'>
            <li>
              <Link to='/home/'>SETTINGS</Link>
            </li>

            <li>
              <Link to='/home/users'>USERS</Link>
            </li>
            <li>
              <Link to='/home/running'>CONTAINERS</Link>
            </li>
            <li>
              <Link to='/home/images'>IMAGES</Link>
            </li>
            <li>
              <Link to='/home/metrics'>METRICS</Link>
            </li>
            <li>
              <Link to='/home/yml'>DOCKER COMPOSE</Link>
            </li>
            <li>
              <Link to='/home/volume'>VOLUME HISTORY</Link>
            </li>
            <li>
              <Link to='/home/logs'>PROCESS LOGS</Link>
            </li>
            <li>
              <a onClick={(e) => handlePruneClick(e)}>SYSTEM PRUNE</a>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          {userData.username && (
            <span className='btn btn-primary btn-md lowercase font-bold text-sm'>{`${userData.username}`}</span>
          )}
          <a className='btn' onClick={() => handleLogout()}>
            Logout
          </a>
        </div>
      </div>
      <Alert />
      <Routes>
        <Route path='/volume' element={<VolumeHistory />} />
        <Route path='/metrics' element={<Metrics key={1} />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/logs' element={<ProcessLogs key={1} />} />
        <Route path='/logTable/:containerId' element={<ProcessLogsTable />} />
        <Route path='/yml' element={<Yml />} />
        <Route path='/images' element={<Images />} />
        <Route path='/running' element={<Containers />} />
        <Route path='/' element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Home;
