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
                                'success'
                              )
                            );
                          },
                          () => {
                            dispatch(
                              createAlert(
                                `The request to perform system prune has been cancelled.`,
                                5,
                                'warning'
                              )
                            );
                          }
                        )
                      );
                    }}
                  >
                    System Prune
                  </a>
                </li>
              </ul>
            </div>
            <Link to='/home/' className='btn btn-ghost normal-case text-xl'>
              docketeer
            </Link>
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
                              'success'
                            )
                          );
                        },
                        () => {
                          dispatch(
                            createAlert(
                              `The request to perform system prune has been cancelled.`,
                              5,
                              'warning'
                            )
                          );
                        }
                      )
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
                          'warning'
                        )
                      );
                    }
                  )
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
          <a href='https://www.docketeer.org/demo'>
            <img
              src={Docketeer}
              alt='footer-product-logo'
              className='w-auto h-10'
            />
          </a>
        </div>
        <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
          <a href='https://twitter.com/dockDockGoose7'>
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
          <a href='https://github.com/open-source-labs/Docketeer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
          <a href='babybelugala45@gmail.com'>
            <svg
              width='24'
              height='24'
              xmlns='http://www.w3.org/2000/svg'
              fill-rule='evenodd'
              clip-rule='evenodd'
              className='fill-current'
            >
              <path d='M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z' />
            </svg>
          </a>
          <a href='https://www.linkedin.com/company/docketeer/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
