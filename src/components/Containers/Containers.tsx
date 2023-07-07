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

  const { runStopped, remove, stop, networkContainers } = useHelper();
  const [network, setNetwork] = useState('');
  const [showList, setShowList] = useState(false);

  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  // networkList state from the composeReducer.ts and ready to use
  const { networkList } = useAppSelector((state) => state.composes);

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
        body: JSON.stringify({ networkName: name }),
        headers: { 'Content-Type': 'application/json' },
      });
      // parse the reponse
      const dataFromBackend = await response.json();
      // if new network is succefully added
      // we can also use if(dataFromBackend) as a condition here since prop hash has a value
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            'New network ' + name + ' is successfully added',
            4,
            'success'
          )
        );
      }
      // Do we need this stderr handling part? I already add line#165 ~ 172 to handle the duplicated network name issue
      // Is there any other possibility that backend send back the data with stderr?
      else if (dataFromBackend.error) {
        dispatch(
          createAlert(
            'Error from the docker : ' + dataFromBackend.error,
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while creating a new network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  // Invoked when 'Create new network' button is pressed. Sends POST request to backend with current state of input field in the body. Resets input field upon submission.
  const createNewNetwork = () => {
    // alert msg if user does not type anything in input field
    if (!network) {
      dispatch(createAlert('Please enter a network name.', 4, 'error'));
      return;
    }
    // alert msg if same network name is already available in network list
    if (networkList.includes(network)) {
      dispatch(
        createAlert(
          'Duplicate name already exists in the network list.',
          4,
          'warning'
        )
      );
      // clear the input field after displaying alert msg
      setNetwork('');
      return;
    }
    // alert msg if there's a special character that is not accepted
    // const pattern = /^[a-zA-Z0-9\\-_]+$/;
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/;
    if (!pattern.test(network)) {
      dispatch(
        createAlert(
          'The network name must start with an alphanumerical character and can contain alphanumerical characters, hypens, or underscores.',
          5,
          'warning'
        )
      );
      // clear the input field after displaying alert msg
      setNetwork('');
      return;
    }
    //

    fetchNewNetwork(network);
    setNetwork('');
  };
  // console.log(runningList)

  // attachedContainers('bridge');
  // console.log(attachedContainers('alpha-'))


  // ADDED deleteNetwork
  async function deleteNetwork(name: string): Promise<void> {
    try {
      const response = await fetch('/api/command/networkRemove', {
        method: 'POST',
        body: JSON.stringify({ networkName: name }),
        headers: { 'Content-Type': 'application/json' },
      });
      // parse the reponse
      const dataFromBackend = await response.json();
      // if network is succefully removed
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            // string that shows on the alert
            'Network ' + name + ' is successfully removed',
            // how long it will stay up in the alert window
            4,
            // type of the alert
            'success'
          )
        );
      } else if (dataFromBackend.error) {
        
        // If server response { error: stderr } to the frontend which means container already exist in the network
        // display the alert window with attached containers
        dispatch(
          createAlert(
            'Please detach ' +
              attachedContainers(name) +
              ' container(s) before deleting this network.',
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while removing the network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  //
  const attachedContainers = (name) => {
    // create empty array named attachedContainer
    const attachedContainer = [];
    // iterate the runningList state
    runningList.forEach((container) => {
      // check that container obj's Networks property has a value of passed in network name
      if (container.Networks.includes(name)) {
        // push the container's name to attachedContainer array
        attachedContainer.push(` [${container.Names}] `);
      }
    });
    // return attachedContainer
    return attachedContainer;
  };

  // function to display which containers are attached to specific network
  // this will be invoked when user click the network name on the network list side bar
  const displayAttachedContainers = (name) => {
    // const var containerName is array returned from invocation of attachedContainers function with passed in network name argument
    const containerName = attachedContainers(name);
    // if containerName array has any length, which means there are attached containers available
    if (containerName.length) {
      // display the alert window with this prompt
      dispatch(
        createAlert(
          'Currently ' +
            containerName +
            ' is(are) attached to ' +
            name +
            ' network.',
          4,
          'success'
        )
      );
    } else {
      // if there's no container attached to this network
      dispatch(
        createAlert(
          'Currently no container is attached to ' + name + ' network.',
          4,
          'success'
        )
      );
    }

  };

  // TODO: CREATE FUNCTIONALITY TO ADD NETWORK TO CONTAINER

  return (
    <div>
      <div id={styles.sidebar}>
        <div className={styles.listHolder}>
          <div id={styles.networkList}>
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
              <div className={styles.listHolder} >
                {networkList.map((name: string, index: number) => {
                  if (name !== 'bridge' && name !== 'docketeer_default') {
                    return (
                      <div className={styles.networkDiv} key={index} >
                        <p id={styles.networkName} onClick={() => displayAttachedContainers(name)}>{name}</p>
                        <button
                          id={styles.networkDeleteButton}
                          onClick={() => deleteNetwork(name)}
                        >
                          DELETE
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.networkDiv} key={index}>
                        <p
                          id={styles.networkName}
                          onClick={() => displayAttachedContainers(name)}
                        >
                          {name}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.listHolder}>
          <h2>RUNNING CONTAINERS</h2>
          <p className={styles.count}>Count: {runningList.length}</p>
          <div className={styles.containerList}>
            <ContainersCard
              containerList={runningList}
              stopContainer={stopContainer}
              runContainer={runContainer}
              removeContainer={removeContainer}
              // connectToNetwork={connectToNetwork}
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
              // connectToNetwork={connectToNetwork}
              status="stopped"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Containers;
