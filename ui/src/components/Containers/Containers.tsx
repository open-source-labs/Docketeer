/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ContainerType } from '../../../ui-types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import useHelper from '../../helpers/commands';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import styles from './Containers.module.scss';
import ContainersCard from '../ContainersCard/ContainersCard';
import {
  filterOneProperty,
  listOfVolumeProperties,
} from '../../helpers/volumeHistoryHelper';
import { useMemo } from 'react';
import Client from '../../models/Client';
import { fetchRunningContainers, fetchStoppedContainers } from '../../reducers/containerReducer';

/**
 * @module | Containers.tsx
 * @description | Provides information and management over both running & stopped Docker containers
 **/

const Containers = (): JSX.Element => {
  const [activeButton, setActiveButton] = useState(1);
  const dispatch = useAppDispatch();
  // const [stateChange, changeState] = useState(0)
  const { remove, bashContainer } = useHelper();
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  const stopWrapper = async(id: string) => {
    const wasStopped = await Client.ContainerService.stopContainer(id);
    if (wasStopped) {
      dispatch(fetchStoppedContainers());
      dispatch(fetchRunningContainers());
    }
  }

  const startWrapper = async(id: string) => {
    const wasStarted = await Client.ContainerService.runContainer(id);
    console.log(wasStarted)
    if (wasStarted) {
      dispatch(fetchStoppedContainers());
      dispatch(fetchRunningContainers());
    }
  }


  const stopContainer = (container: ContainerType) => {
    // changeState(prev => prev+1)
    dispatch(
      createPrompt(
        `Are you sure you want to stop ${container.Names}?`,
        () => {
          stopWrapper(container.ID);
          dispatch(createAlert(`Stopping ${container.Names}...`, 5, 'error'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to stop ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  const runContainer = (container: ContainerType) => {
    // changeState(prev => prev+1)
    dispatch(
      createPrompt(
        `Are you sure you want to run ${container.Names}?`,
        () => {
          startWrapper(container['ID']);
          dispatch(createAlert(`Running ${container.Names}...`, 5, 'success'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to run ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  const removeContainer = (container: ContainerType) => {
    // changeState(prev => prev+1)
    dispatch(
      createPrompt(
        `Are you sure you want to remove ${container.Names}?`,
        () => {
          remove(container['ID']);
          dispatch(createAlert(`Removing ${container.Names}...`, 5, 'success'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to remove ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };


  

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.listHolder}>

    
          <div className={styles.toggle}>
            <div>
              {activeButton === 1 && <iframe src="http://localhost:49155/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=75" width="100%"></iframe>}
              {activeButton === 2 && <iframe src="http://localhost:49155/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=7" width="100%"></iframe>}
              {activeButton === 3 && <iframe src="http://localhost:49155/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=8" width="100%"></iframe>}
            </div>
            <div className={styles.buttons}>
              <button className={activeButton === 1 ? styles.active : styles.notActive} onClick={() => setActiveButton(1)}>Memory</button>
              <button className={activeButton === 2 ? styles.active : styles.notActive} onClick={() => setActiveButton(2)}>Block I/O</button>
              <button className={activeButton === 3 ? styles.active : styles.notActive} onClick={() => setActiveButton(3)}>Net I/O</button>
            </div>
          </div>
          
          <h2>RUNNING CONTAINERS</h2>
          <p className={styles.count}>Count: {runningList.length}</p>
          <div className={styles.containerList}>
            <ContainersCard
              containerList={runningList}
              stopContainer={stopContainer}
              runContainer={runContainer}
              bashContainer = {bashContainer}
              removeContainer={removeContainer}
              status="running"
            />
          </div>
        </div>
        <div className={styles.listHolderStopped}>
          <h2>STOPPED CONTAINERS</h2>
          <p className={styles.count}>Count: {stoppedList.length}</p>
          <div className={styles.containerList}>
            <ContainersCard
              containerList={stoppedList}
              stopContainer={stopContainer}
              runContainer={runContainer}
              bashContainer = {bashContainer}
              removeContainer={removeContainer}
              status="stopped"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Containers;
