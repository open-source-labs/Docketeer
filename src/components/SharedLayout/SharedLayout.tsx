import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

// Importing helpers
import useSurvey from '../../helpers/dispatch';
import useHelper from '../../helpers/commands';
import * as history from '../../helpers/volumeHistoryHelper';

import Alert from '../Alert/Alert';
import styles from './SharedLayout.module.scss';
// import globalStyles from '../global.module.scss';

// const activeStyle = 'background - color: color(background, darker);';

function SharedLayout(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handlePruneClick } = useHelper();
  const { updateSession, logoutUser } = useSurvey();

  const { isLoggedIn } = useAppSelector((state) => state.sessions);
  // console.log('session in SharedLayout.tsx', isLoggedIn);

  const logOut = async (): Promise<void> => {
    try {
      // console.log('logging out, in the try block');
      await fetch('/api/logout', {
        method: 'POST',
      });
      updateSession();
      logoutUser();
    } catch (err) {
      console.log(err);
    }
    if (isLoggedIn === false) navigate('/login');
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
                'warning',
              ),
            );
          },
        ),
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
                'warning',
              ),
            );
          },
        ),
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
    getAllDockerVolumes,
    getVolumeContainers,
  } = useHelper();

  // Deconstructs dispatch functions from custom hook
  const { getVolumeContainerList } = useSurvey();

  useEffect(() => {
    refreshRunning();
    refreshStopped();
    refreshImages();
    writeToDb();
    networkContainers();
    getAllDockerVolumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changes in arrayOfVolumeNames will run history.volumeByName
  useEffect(() => {
    history.volumeByName(
      getVolumeContainers,
      arrayOfVolumeNames,
      getVolumeContainerList,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayOfVolumeNames]);

  // Refresh runningList, stoppedList, and imageList every 5-seconds to ensure GUI accurately depicts local Docker environment
  useEffect(() => {
    const interval = setInterval(() => {
      refreshRunning();
      refreshStopped();
      refreshImages();
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
                to='/home/'
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/users'
              >
                USERS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/running'
              >
                CONTAINERS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/images'
              >
                IMAGES
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/metrics'
              >
                METRICS
              </NavLink>
            </li>
            {/* <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.navButton
              }
              to="/home/yml"
            >
              Docker Compose
            </NavLink>
          </li> */}
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/volume'
              >
                VOLUME HISTORY
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/logs'
              >
                PROCESS LOGS
              </NavLink>
            </li>
            <li>
              <a className={styles.navButton} onClick={(e) => systemPrune(e)}>
                SYSTEM PRUNE
              </a>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to='/home/about'
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
