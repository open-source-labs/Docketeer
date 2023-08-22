/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ContainerType } from '../../../ui-types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import useHelper from '../../helpers/commands';
import { createAlert, createPrompt } from '../../reducers/alertReducer';
import styles from './Containers.module.scss';
import ContainersCard from '../ContainersCard/ContainersCard';


/**
 * @module | Containers.tsx
 * @description | Provides information and management over both running & stopped Docker containers
 **/

const Containers = (): JSX.Element => {
  const { getKey, getUid } = useHelper();
  const [apiKey, setApiKey] = useState('');
  const [uidKey, setUidKey] = useState('');
  const [activeButton, setActiveButton] = useState(1)
  const dispatch = useAppDispatch();
  const { runStopped, remove, stop } = useHelper();
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  // const runningList = [{ ID: 'run', Names: 'does this appear', Image: 'image', RunningFor: 'runningfor', Networks: ['networks1', 'networks2'] }];
  // const runStopped = true;
  // const stoppedList = [{ ID: 'stop' }];

  const stopContainer = (container: ContainerType) => {
    dispatch(
      createPrompt(
        `Are you sure you want to stop ${container.Names}?`,
        () => {
          stop(container.ID);
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
    dispatch(
      createPrompt(
        `Are you sure you want to run ${container.Names}?`,
        () => {
          runStopped(container['ID']);
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
  function toggle(e) {
   console.log('e', e)
  }



  useEffect(() => {
    /** 
    * @description Retrieves the API and UID key 
    * @method
    * @async
    * @returns {promise} returns promise when api key and uid key is successfully set
    */
    const fetchKey = async () => {
      try {
        const key = await getKey();
        console.log('key', key)
        setApiKey(key);
        const uid = await getUid(key, 'Containers');
        console.log('uid', uid)
        setUidKey(uid);
      } catch (err) {
        console.log('Cannot get uid key or api key', err);
      }
    };
    fetchKey();
  }, []);


  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.listHolder}>

    
          <div className={styles.toggle}>
            <div>
              {activeButton === 1 && <iframe src="http://localhost:2999/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=75" width="100%"></iframe>}
              {activeButton === 2 && <iframe src="http://localhost:2999/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=7" width="100%"></iframe>}
              {activeButton === 3 && <iframe src="http://localhost:2999/d-solo/h5LcytHGz/system?orgId=1&refresh=10s&panelId=8" width="100%"></iframe>}
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
              removeContainer={removeContainer}
              status="running"
            />
          </div>
        </div>
        <div className={styles.listHolder}>
          <h2>STOPPED CONTAINERS</h2>
          <p className={styles.count}>Count: {stoppedList.length}</p>
          <div className={styles.containerList}>
            <ContainersCard
              containerList={stoppedList}
              stopContainer={stopContainer}
              runContainer={runContainer}
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
