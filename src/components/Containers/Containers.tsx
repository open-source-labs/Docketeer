/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ContainerType } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import useHelper from '../../helpers/commands';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

import styles from './Containers.module.scss';
import ContainersCard from '../ContainersCard/ContainersCard';
import globalStyles from '../global.module.scss';

// import { connect } from 'http2';

/**
 * @module | Containers.tsx
 * @description | Provides information and management over both running & stopped Docker containers
 **/

const Containers = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { runStopped, remove, stop, networkContainers, } = useHelper();
  const [network, setNetwork] = useState('');
  const [showList, setShowList] = useState(false);

  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  // networkList state from the composeReducer.ts and ready to use
  const { networkList } = useAppSelector(
    (state) => state.composes
  );

  useEffect(() => {
    console.log(networkList);
  }, []);

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

  //
  const connectToNetwork = (container: ContainerType) => {
    dispatch(
      createPrompt(
        `Please connect or disconnect desired networks for container ${container.Names}`,
        () => {
          dispatch(createAlert(`Connecting ${container.Names} to network.`, 5, 'success'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to connect ${container.Names} to a network has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  const displayNetworkList = () => {
    // update the networkList before displaying the network list
    // networkContainers();
    setShowList(!showList);
  };

  //
  async function fetchNewNetwork(name: string): Promise<void> {
    try {
      const response = await fetch('/api/command/networkCreate', {
        method: 'POST',
        body: JSON.stringify({networkName : name}),
        headers: {'Content-Type': 'application/json'}
      });

      if (response.ok) {
        console.log('New network name has been sent');
      }
    } catch (err) {
      console.log('An error occurred while sending new network name:', err);
    }
  }


  // Invoked when 'Create new network' button is pressed. Sends POST request to backend with current state of input field in the body. Resets input field upon submission.
  const createNewNetwork = () => {
    if (!network) {
      dispatch(
        createAlert(
          'Please enter a network name.',
          5,
          'error'
        )
      );
      return;
    }
    // console.log(network);
    fetchNewNetwork(network);
    // update the networkList right away after add a new network name
    // networkContainers();
    setNetwork('');
  };

  // ADDED deleteNetwork
  async function deleteNetwork(name: string): Promise<void> {
    try {
      const response = await fetch('/api/command/networkRemove', {
        method: 'POST',
        body: JSON.stringify({ networkName: name }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('Request to delete network has been sent');
      } else {
        // If backend sending stderr to the frontend
        dispatch(createAlert('Please detach container(s) before deleting this network.', 5, 'error'));
        return;
      }
      
    } catch (err) {
      console.log('An error occurred while deleting network', err);
    }
  }

  // TODO: CREATE FUNCTIONALITY TO ADD NETWORK TO CONTAINER

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper}>
        <div id={styles.networkList} className={styles.listHolder}>
          <h2>NETWORKS</h2>
          <input
            className={globalStyles.input}
            type="text"
            id="newNetwork"
            value={network}
            placeholder="Input network name here..."
            onChange={(e) => {
              setNetwork(e.target.value);
            }}
          />
          <button
            className={globalStyles.button1}
            onClick={() => createNewNetwork()}
          >
            CREATE NEW NETWORK
          </button>
          <button
            className={globalStyles.button1}
            onClick={() => displayNetworkList()}
          >
            {showList ? 'HIDE NETWORK LIST' : 'DISPLAY NETWORK LIST'}
          </button>
          {showList && (
            <div className={styles.listHolder}>
              <div id={styles.networkList}>
                {networkList.map((name: string, index: number) => {
                  return (
                    <div key={index}>
                      <p id={styles.networkName}>{name}</p>
                      {/* ADDING DELETE BUTTON */}
                      <button onClick={() => deleteNetwork(name)}>DELETE</button>
                    </div>
                  );
                })}
              </div>
            </div>
            
          )}
        </div>
        <div className={styles.listHolder}>
          <h2>RUNNING CONTAINERS</h2>
          <p className={styles.count}>Count: {runningList.length}</p>
          <div className={styles.containerList}>
            <ContainersCard
              containerList={runningList}
              stopContainer={stopContainer}
              runContainer={runContainer}
              removeContainer={removeContainer}
              connectToNetwork={connectToNetwork}
              status="running"
            />
          </div>
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
            connectToNetwork={connectToNetwork}
            status="stopped"
          />
        </div>
      </div>
    </div>
  );
};

export default Containers;
