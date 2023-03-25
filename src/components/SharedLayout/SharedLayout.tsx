import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

// Importing helpers
import useSurvey from '../helpers/dispatch';
import useHelper from '../helpers/commands';
import * as history from '../helpers/volumeHistoryHelper';

import Alert from '../Alert';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Docketeer from '../../../assets/docketeer-title2.png';
import styles from './SharedLayout.module.scss';
import globalStyles from '../global.module.scss';

const activeStyle = 'background - color: color(background, darker);';

function SharedLayout(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handlePruneClick } = useHelper();

  const { updateSession, logoutUser } = useSurvey();

  const logOut = async (): Promise<void> => {
    updateSession();
    logoutUser();

    // what is this try block doing?
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
        }),
      });
      const parsedData = await response.json();
      console.log(parsedData);
    } catch (err) {
      console.log(err);
    }
    navigate('/login');
  };

  const handleLogOut = () => {
    {
      dispatch(
        createPrompt(
          // prompt (first argument in createPrompt)
          'Are you sure you want to log out of Docketeer?',
          // handleAccept (second argument in createPrompt)
          () => {
            logOut();
            dispatch(createAlert('Logging out...', 5, 'success'));
          },
          // handleDeny (third argument in createPrompt)
          () => {
            dispatch(
              createAlert(
                'The request to logout has been cancelled.',
                5,
                'warning'
              )
            );
          }
        )
      );
    }
  };

  const systemPrune = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    {
      dispatch(
        createPrompt(
          // prompt (first argument in createPrompt)
          'Are you sure you want to run system prune? This will remove all unused containers, networks, images (both dangling and unreferenced).',
          // handleAccept (second argument in createPrompt)
          () => {
            handlePruneClick(e);
            dispatch(createAlert('Performing system prune...', 5, 'success'));
          },
          // handleDeny (third argument in createPrompt)
          () => {
            dispatch(
              createAlert(
                'The request to perform system prune has been cancelled.',
                5,
                'warning'
              )
            );
          }
        )
      );
    }
  };

  const { sessions, volumes } = useAppSelector((state) => state);
  const userData = sessions;
  const { arrayOfVolumeNames } = volumes;

  const {
    refreshRunning,
    refreshStopped,
    refreshImages,
    writeToDb,
    networkContainers,
    // below function never called
    // setDbSessionTimeZone,
    getAllDockerVolumes,
    getVolumeContainers,
  } = useHelper();

  // Deconstructs dispatch functions from custom hook
  const { updateUser, getVolumeContainerList } =
    useSurvey();

  useEffect(() => {
    refreshRunning();
    refreshStopped();
    refreshImages();
    writeToDb();
    networkContainers();
    getAllDockerVolumes();
    setAdminToken();
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
  // TODO: double check what this is doing and name appropriately
  const setAdminToken = async (): Promise<void> => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userData.token,
          username: userData.username,
        }),
      });
      const parsedData = await response.json();

      updateUser(parsedData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navBar}>
        <ul className={styles.innerNav}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/users">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeStyle : styles.navButton)}
              to="/home/running">
              Containers
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/images">
              Images
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/metrics">
              Metrics
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/yml">
              Docker Compose
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : styles.navButton)}
              to="/home/volume">
              Volume History
            </NavLink>
          </li>
          <li>
            <NavLink
              className={styles.navButton}
              to="/home/logs">
              Process Logs
            </NavLink>
          </li>
          <li>
            <a
              className={styles.navButton}
              onClick={(e) => systemPrune(e)}>
              System Prune
            </a>
          </li>
          <li>
            {userData.username && (
              <span className="btn btn-primary btn-md lowercase font-bold text-sm">{`${userData.username}`}</span>
            )}
            <a className={globalStyles.navButton}
              onClick={() => handleLogOut()}>
          Logout
            </a>
          </li>
        </ul>
      </nav>
      <Alert />

      <Outlet />
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <a href="https://www.docketeer.org/demo">
            <img
              className={styles.footerLogo}
              src={Docketeer}
              alt="footer-product-logo"
            />
          </a>
        </div>
        <div className={styles.footerIcons}>
          <a href="https://twitter.com/dockDockGoose7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="https://github.com/open-source-labs/Docketeer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="babybelugala45@gmail.com">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.288 21h-20.576c-.945 0-1.712-.767-1.712-1.712v-13.576c0-.945.767-1.712 1.712-1.712h20.576c.945 0 1.712.767 1.712 1.712v13.576c0 .945-.767 1.712-1.712 1.712zm-10.288-6.086l-9.342-6.483-.02 11.569h18.684v-11.569l-9.322 6.483zm8.869-9.914h-17.789l8.92 6.229s6.252-4.406 8.869-6.229z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/docketeer/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default SharedLayout;
