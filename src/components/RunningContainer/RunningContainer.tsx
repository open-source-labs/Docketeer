import React, { useState } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { ContainersCardsProps } from '../../../types';
import styles from './RunningContainer.module.scss';
import globalStyles from '../global.module.scss';
import NetworkListModal from '../NetworkListModal/NetworkListModal';

/**
 * @module | RunningContainers.tsx
 * @description | This component renders each container, and if a container is currently running, it passes the modal component for network configuration.
 **/

const RunningContainer = ({
  container,
  stopContainer,
  runContainer,
  removeContainer,
  connectToNetwork,
  disconnectFromNetwork,
  status,
  key
}: ContainersCardsProps): JSX.Element => {
  // Using useAppSelector for accessing to networkList state
  const { networkContainerList } = useAppSelector((state) => state.networks);
  // create state that will use as toggle to show the modal or not
  const [isOpen, setIsOpen] = useState(false);

  // function for opening the modal
  const openNetworkList = () => {
    setIsOpen(true);
  };

  // function for closing the modal
  const closeNetworkList = () => {
    setIsOpen(false);
  };

  return (
    <div key={key} className={styles.containerCard}>
      <div className={styles.textHolder}>
        <h2>{container.Names}</h2>
        <p>
          <strong>Image:</strong> {container.Image}
        </p>
        <p>
          <strong>ID:</strong> {container.ID}
        </p>
        {status === 'running' && (
          <p>
            <strong>Running since: </strong> {container.RunningFor}
          </p>
        )}
        {status === 'stopped' && (
          <p>
            <strong>Stopped: </strong> {container.RunningFor}
          </p>
        )}
      </div>
      <div className={styles.buttonHolder}>
        <div className={styles.buttonSpacer}>
          {status === 'running' && (
            <button
              className={globalStyles.buttonSmall}
              onClick={() => stopContainer(container)}
            >
              STOP
            </button>
          )}
          {status === 'stopped' && (
            <>
              <button
                className={globalStyles.buttonSmall}
                onClick={() => runContainer(container)}
              >
                RUN
              </button>
              <button
                className={globalStyles.buttonSmall}
                onClick={() => removeContainer(container)}
              >
                REMOVE
              </button>
            </>
          )}
          {(status === 'running' && container.Names !== 'docketeer') && (
            <button
              className={globalStyles.buttonSmall}
              onClick={() => openNetworkList()}
            >
              NETWORKS
            </button>
          )}
        </div>
      </div>
      <NetworkListModal Names={container.Names} isOpen={isOpen} closeNetworkList={closeNetworkList} networkContainerList={networkContainerList} connectToNetwork={connectToNetwork} disconnectFromNetwork={disconnectFromNetwork} container={container} />
    </div>
  );
};
        
export default RunningContainer;