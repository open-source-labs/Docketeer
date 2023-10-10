import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { createPrunePrompt } from '../../reducers/pruneReducer';


import Alert from '../../components/Alert/Alert';
import styles from './SharedLayout.module.scss';
import docketeerLogo from '../../../assets/docketeer-logo-light.png';
import { fetchRunningContainers, fetchStoppedContainers } from '../../reducers/containerReducer';
import { fetchImages } from '../../reducers/imageReducer';
import { fetchNetworkAndContainer } from '../../reducers/networkReducer';
import { fetchAllContainersOnVolumes, fetchAllDockerVolumes } from '../../reducers/volumeReducer';
import Client from '../../models/Client';

/**
 * @module | SharedLayout.tsx
 * @description | This component renders a navbar at the top that allows you to select which tab you would like to view.
 **/

function SharedLayout(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNetworkPrune = async(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const successful = await Client.NetworkService.pruneNetwork();
    if (!successful) console.error(`Coudn't prune network`);
  }

  const handleSystemPrune = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const successful = await Client.SystemService.pruneSystem();
    if (!successful) console.error(`Coudn't prune system`)
  }

  const prune = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      dispatch(
        createPrunePrompt(
          // prompt (first argument in createPrunePrompt)
          'Are you sure you want to run system / network prune? System prune will remove all unused containers, networks, images and Network prune will remove all unused networks only (both dangling and unreferenced).',
          // handleSystemPrune (second argument in creatPrunePrompt)
          () => {
            handleSystemPrune(e);
            dispatch(createAlert('Performing system prune...', 4, 'success'));
          },
          // handleNetworkPrune (third argument in creatPrunePrompt)
          () => {
            handleNetworkPrune(e);
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
    
  };
  const { volumes } = useAppSelector((state) => state.volumes);

  useEffect(() => {
    dispatch(fetchRunningContainers());
    dispatch(fetchStoppedContainers());
    dispatch(fetchImages());
    dispatch(fetchNetworkAndContainer());
    dispatch(fetchAllDockerVolumes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchAllContainersOnVolumes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumes]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.navBar}>
        <div className={styles.navSpacer}>
          <ul className={styles.navLeft}>
         
            <li>
              <NavLink
                to="/"
              >
                <img className={styles.logo} src={docketeerLogo} alt="docketeer-logo" width="45" height="45"></img>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/"
              >
                CONTAINERS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/network"
              >
                NETWORKS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/images"
              >
                IMAGES
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/metrics"
              >
                CONTAINER METRICS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/K8Metrics"
              >
                KUBERNETES METRICS
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.navButton
                }
                to="/volume"
              >
                VOLUME HISTORY
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => isActive ? styles.active : styles.navButton}
                to="/logs">
                PROCESS LOGS
              </NavLink>
            </li>
           
            <li>
              <NavLink
                className={({ isActive }) => 
                  isActive ? styles.active : styles.navButton
                }
              to="/configuration">
                CONFIGURATIONS
              </NavLink>
            </li>
            <li>
              <a className={styles.navButton} onClick={(e) => prune(e)}>
                PRUNE
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
