import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { ContainerType, ContainersCardsProps, stats } from '../../../ui-types';
import RunningContainer from '../RunningContainer/RunningContainer';
import PageSwitch from './PageSwitch';
import Client from '../../models/Client';
/**
 * @module | ContainersCard.tsx
 * @description | This component renders RunningContainer component and passes functions for connecting/disconnecting to the network as props.
 **/

/**
 * A custom hook which gets the stats of all Docker containers.
 */
type containerType = number;
const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
  status,
}: ContainersCardsProps): JSX.Element => {

  const dispatch = useAppDispatch();
  const [containerMetrics, setContainerMetrics] = useState<stats[]>();

  let ddClient;
  useEffect(() => {
    async function displayMetrics() {
      try {
        let newData: stats[] = [];
        // This is unicode by the way
        const TERMINAL_CLEAR_CODE = '\x1B[2J[H';
        const { createDockerDesktopClient } = await import("@docker/extension-api-client");
        ddClient = createDockerDesktopClient();
        const result = ddClient.docker.cli.exec(
          'stats',
          ['--all', '--no-trunc', '--format', '{{ json . }}'],
          {
            stream: {
              onOutput(data) {
                if (data.stdout?.includes(TERMINAL_CLEAR_CODE)) {
                  setContainerMetrics(newData);
                  newData = [];
                  newData.push(JSON.parse(data.stdout.replace(TERMINAL_CLEAR_CODE, '')));
                } else {
                  newData.push(JSON.parse(data.stdout ?? ''));
                }
              },
              onError(error) {
                console.error(error);
              },
              splitOutputLines: true,
            },
          }
        );
        // Clean-up function
        // return () => {
        //   result.close();
        //   newData = [];
        // };
      } catch (error) {
        console.log(`Can't import ddClient`);
      }
    }
  
  }, [ddClient]);


  async function connectToNetwork(
    networkName: string,
    containerName: string
  ): Promise<void> {
    try {
      await Client.NetworkService.connectContainerToNetwork(networkName, containerName);

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
      await Client.NetworkService.disconnectContainerFromNetwork(networkName, containerName);

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
    let metrics = null;
    if (containerMetrics !== undefined) {
      for (const item of containerMetrics) {
        if (item.Container === container.ID) {
          metrics = item;
          break;
        }
      }
    }


    return (
      <RunningContainer
        container={container}
        metrics={metrics}
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
  const [currentPage, setPage] = useState(1);
  const [contPerPage, setCont] = useState(5);
  // index of last container on each page
  const lastContainerI = contPerPage * currentPage;
  const firstContainerI = lastContainerI - contPerPage;
  const slicedRunningContainers = RunningContainers.slice(firstContainerI, lastContainerI);
  return (
    <>
      {slicedRunningContainers}
      <PageSwitch totalContainers = {RunningContainers.length} setPage = {setPage} contPerPage = {contPerPage}/>
    </>
  );
};

export default ContainersCard;