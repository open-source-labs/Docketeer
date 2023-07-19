import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import { createPrunePrompt } from '../../reducers/pruneReducer';

// Importing helpers
import useSurvey from '../../helpers/dispatch';
import useHelper from '../../helpers/commands';
import * as history from '../../helpers/volumeHistoryHelper';

import Alert from '../Alert/Alert';
import styles from 'src/components/SharedLayout/SharedLayout.module.scss';


/**
 * @module | SharedLayout.tsx
 * @description | This component renders a navbar at the top that allows you to select which tab you would like to view.
 **/

function SharedLayout(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handlePruneClick, handleNetworkPruneClick } = useHelper();
  const { logoutUser } = useSurvey();

  const logOut = async (): Promise<void> => {
    logoutUser();

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
      await response.json();
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

  const prune = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    {
      dispatch(
        createPrunePrompt(
          // prompt (first argument in createPrunePrompt)
          'Are you sure you want to run system / network prune? System prune will remove all unused containers, networks, images and Network prune will remove all unused networks only (both dangling and unreferenced).',
          // handleSystemPrune (second argument in creatPrunePrompt)
          () => {
            handlePruneClick(e);
            dispatch(createAlert('Performing system prune...', 4, 'success'));
          },
          // handleNetworkPrune (third argument in creatPrunePrompt)
          () => {
            handleNetworkPruneClick(e);
            dispatch(createAlert('Performing network prune...', 4, 'success'));
          },
          // handleDeny (fourth argument in creatPrunePrompt)
          () => {
            dispatch(
              createAlert(
                'The request to perform system / network prune has been cancelled.',
                4,
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
    refreshNetwork,
    writeToDb,
    getAllDockerVolumes,
    getVolumeContainers,
  } = useHelper();

  // Deconstructs dispatch functions from custom hook
  const { getVolumeContainerList } = useSurvey();

  useEffect(() => {
    refreshRunning();
    refreshStopped();
    refreshImages();
    refreshNetwork();
    writeToDb();
    getAllDockerVolumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainerList
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayOfVolumeNames]);


  // Refresh runningList, stoppedList, imageList and networkContainerList every 5-seconds to ensure GUI accurately depicts local Docker environment
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRunning();
      refreshStopped();
      refreshImages();
      refreshNetwork();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navBar}>
        <div className={styles.navSpacer}>
          <ul className={styles.navLeft}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/"
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/running"
              >
                CONTAINERS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/network"
              >
                NETWORKS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/images"
              >
                IMAGES
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/metrics"
              >
                METRICS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/volume"
              >
                VOLUME HISTORY
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/logs"
              >
                PROCESS LOGS
              </NavLink>
            </li>
            <li>
              <a className={styles.navButton} onClick={(e) => prune(e)}>
                PRUNE
              </a>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/home/about"
              >
                ABOUT
              </NavLink>
            </li>
          </ul>
          <ul className={styles.navRight}>
            <li>
              {userData.username && (
                <span
                  className={styles.userName}
                >{`${userData.username}`}</span>
              )}
            </li>
            <li>
              <a className={styles.navButton} onClick={() => handleLogOut()}>
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Alert />
      <Outlet />
    </div>
  );
}

export default SharedLayout;
