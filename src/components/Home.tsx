import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../reducers/hooks';

// Importing helpers
import useSurvey from './helpers/dispatch';
import useHelper from './helpers/commands';
import * as history from './helpers/volumeHistoryHelper';
import initDatabase from './helpers/initDatabase';

// Importing features
import Metrics from './features/Metrics';
import Images from './features/Images';
import Yml from './features/Yml';
import Containers from './features/Containers';
import Settings from './features/Settings';
import UserList from './features/Users';
import VolumeHistory from './features/VolumeHistory';
import ProcessLogs from './features/ProcessLogs';
import ProcessLogsTable from './displays/ProcessLogsTable';
import Alert from './Alert';

/**
 * HOME (Routing, Re-rendering, etc.)
 **/

const Home = () => {
  const navigate = useNavigate();

  const { sessions, volumes } = useAppSelector((state) => state);
  const userData = sessions;
  const { arrayOfVolumeNames } = volumes;

  const {
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

  // Deconstructs dispatch functions from custom hook
  const { updateSession, logoutUser, updateUser, getVolumeContainerList } =
    useSurvey();

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

  useEffect(() => {
    initDatabase();
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

  // Refresh runningList, stoppedList, and imageList every 5-seconds to ensure GUI accurately depicts local Docker environment
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRunning();
      refreshStopped();
      refreshImages();
    }, 5000);
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
