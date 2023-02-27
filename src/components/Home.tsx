import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../reducers/hooks';
import { createAlert, createPrompt } from '../reducers/alertReducer';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../assets/docketeer-title2.png';

// Importing helpers
import useSurvey from './helpers/dispatch';
import useHelper from './helpers/commands';
import * as history from './helpers/volumeHistoryHelper';

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
 * @module | Home.tsx
 * @description | Handles client-side routing, pre-rendering of data, refreshing of data, etc...
 **/

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    refreshRunning();
    refreshStopped();
    refreshImages();
    writeToDb();
    networkContainers();
    getAllDockerVolumes();
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainerList,
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
    <>
      <div className='inset-x-0 fixed top-0 z-50'>
        <div className='navbar bg-neutral text-neutral-content p-4'>
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
                  <a
                    onClick={(e) => {
                      dispatch(
                        createPrompt(
                          `Are you sure you want to run system prune? This will remove all unused containers, networks, images (both dangling and unreferenced).`,
                          () => {
                            handlePruneClick(e);
                            dispatch(
                              createAlert(
                                `Performing system prune...`,
                                5,
                                'success',
                              ),
                            );
                          },
                          () => {
                            dispatch(
                              createAlert(
                                `The request to perform system prune has been cancelled.`,
                                5,
                                'warning',
                              ),
                            );
                          },
                        ),
                      );
                    }}
                  >
                    System Prune
                  </a>
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
                <a
                  onClick={(e) => {
                    dispatch(
                      createPrompt(
                        `Are you sure you want to run system prune? This will remove all unused containers, networks, images (both dangling and unreferenced).`,
                        () => {
                          handlePruneClick(e);
                          dispatch(
                            createAlert(
                              `Performing system prune...`,
                              5,
                              'success',
                            ),
                          );
                        },
                        () => {
                          dispatch(
                            createAlert(
                              `The request to perform system prune has been cancelled.`,
                              5,
                              'warning',
                            ),
                          );
                        },
                      ),
                    );
                  }}
                >
                  SYSTEM PRUNE
                </a>
              </li>
            </ul>
          </div>
          <div className='navbar-end'>
            {userData.username && (
              <span className='btn btn-primary btn-md lowercase font-bold text-sm'>{`${userData.username}`}</span>
            )}
            <a
              className='btn'
              onClick={() => {
                dispatch(
                  createPrompt(
                    `Are you sure you want to log out of Docketeer?`,
                    () => {
                      handleLogout();
                      dispatch(createAlert(`Logging out...`, 5, 'success'));
                    },
                    () => {
                      dispatch(
                        createAlert(
                          `The request to logout has been cancelled.`,
                          5,
                          'warning',
                        ),
                      );
                    },
                  ),
                );
              }}
            >
              Logout
            </a>
          </div>
        </div>
        <Alert />
      </div>
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
      <footer className='footer items-center p-4 bg-neutral text-neutral-content fixed bottom-0 inset-x-0 z-50'>
        <div className='items-center grid-flow-col'>
          <img
            src={Docketeer}
            alt='footer-product-logo'
            className='w-auto h-10'
          />
        </div>
        <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
