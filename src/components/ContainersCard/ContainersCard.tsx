import React, { useState } from 'react';
// import Modal from 'react-modal';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { ContainerType, ContainersCardsProps } from '../../../types';

// import styles from './ContainersCard.module.scss';
// import globalStyles from '../global.module.scss';
// import useHelper from '../../helpers/commands';
import useSurvey from '../../helpers/dispatch';
import RunningContainer from '../RunningContainer/RunningContainer';

const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
  status
}: ContainersCardsProps): JSX.Element => {

  const dispatch = useAppDispatch();
  // const { networkName, containerName } = req.body; <-- give the backend this information
  // containerName = container.Name

  async function connectToNetwork(
    networkName: string,
    containerName: string
  ): Promise<void> {
    try {
      console.log('Current containerList', containerList);
      console.log('Current container name', containerName);

      const response = await fetch('/api/command/networkConnect', {
        method: 'POST',
        body: JSON.stringify({
          networkName: networkName,
          containerName: containerName,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // process that we forgot to do in fetch function!
      // we need to parse the response from the server as JSON and then grab the data from it
      const dataFromBackend = await response.json();

      // console.log for what does response from backend looks like
      // console.log(
      //   'Response from the backend after call the connectToNetwork function: ',
      //   dataFromBackend
      // );

      // if server response the { hash: stdout } which means we are success to attach the network to the container
      // we CAN NOT set the if conidtion for success as if(dataFromBackend.hash) because when I checked stdout
      // it is just empty string so it should be treat as false not true
      // and use creatAlert to display the result of function invocation to user instead of using console.log
      if (dataFromBackend.hasOwnProperty('hash')) {
        dispatch(
          createAlert(
            // string that shows on the alert
            containerName + ' is successfully attached to the ' + networkName,
            // how long it will stay up in the alert window
            4,
            // type of the alert
            'success'
          )
        );

      } else if (dataFromBackend.error) {
        // If server response { error: stderr } to the frontend which means container already exist in the network
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
            // string that shows on the alert
            containerName + ' was successfully disconnected from ' + networkName,
            // how long it will stay up in the alert window
            4,
            // type of the alert
            'success'
          )
        );
      } else if (dataFromBackend.error) {
        // If server response { error: stderr } to the frontend which means container already exist in the network
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
  // console.log('CONTAINER LIST DATA FOR GARRETT', containerList);
  const RunningContainers = containerList.map((container: ContainerType, i: number) => {
    return (
      <RunningContainer
        container={container}
        key={i}
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
