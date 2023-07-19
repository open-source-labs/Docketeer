import React from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { ContainerType, ContainersCardsProps } from '../../../types';
import RunningContainer from '../RunningContainer/RunningContainer';

/**
 * @module | ContainersCard.tsx
 * @description | This component renders RunningContainer component and passes functions for connecting/disconnecting to the network as props.
 **/

const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
  status
}: ContainersCardsProps): JSX.Element => {

  const dispatch = useAppDispatch();
  
  async function connectToNetwork(
    networkName: string,
    containerName: string
  ): Promise<void> {
    try {
      const response = await fetch('/api/command/networkConnect', {
        method: 'POST',
        body: JSON.stringify({
          networkName: networkName,
          containerName: containerName,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const dataFromBackend = await response.json();
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            containerName + ' is successfully attached to the ' + networkName,
            4,
            'success'
          )
        );
      } else if (dataFromBackend.error) {
        dispatch(
          createAlert(
            containerName + ' is already attached to the ' + networkName,
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while attaching to network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  async function disconnectFromNetwork(
    networkName: string,
    containerName: string,
  ): Promise<void> {
    try {
      const response = await fetch('/api/command/networkDisconnect', {
        method: 'POST',
        body: JSON.stringify({
          networkName: networkName,
          containerName: containerName,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const dataFromBackend = await response.json();
      
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            containerName +
              ' was successfully disconnected from ' +
              networkName,
            4,
            'success'
          )
        );
      } else if (dataFromBackend.error) {
        dispatch(
          createAlert(
            containerName + ' is not connected to ' + networkName,
            4,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while disconnecting from network : ' + err,
          4,
          'error'
        )
      );
    }
  }

  const RunningContainers = containerList.map((container: ContainerType, i: number) => {
    return (
      <RunningContainer
        container={container}
        key={`container-${i}`}
        stopContainer={stopContainer}
        runContainer={runContainer}
        removeContainer={removeContainer}
        connectToNetwork={connectToNetwork}
        disconnectFromNetwork={disconnectFromNetwork}
        status={status}/>
    );
  }
  );
  return (
    <>
      {RunningContainers}
    </>
  );
};

export default ContainersCard;
