import React, { useState } from 'react';
import { useAppSelector } from '../../reducers/hooks';
import { ContainersCardsProps } from '../../../ui-types';
import styles from './RunningContainer.module.scss';
import globalStyles from '../global.module.scss';
import NetworkListModal from '../NetworkListModal/NetworkListModal';

/**
 * @module | RunningContainers.tsx
 * @description | This component renders each container, and if a container is currently running, it passes the modal component for network configuration.
 **/

const RunningContainer = ({
  container,
  metrics,
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
  // const networkContainerList = [{ networkName: 'testnetwork', containers: [{ containerName: 'testname', containerIP: 'testip' }]}]
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
  console.log('met', metrics)
  if (!container) return (<p>no container</p>);
  
  return (
    <div key={key} className={styles.containerCard}>




      <div className={styles.containerTextHolder}>
        <h2 className={styles.textSpacing}>{container.Names}</h2>
        <p className={styles.textSpacing}>
          <strong>Image:</strong> {container.Image}
        </p>
        <p className={styles.textSpacing}>
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



      <div className={styles.containerMetricHolder}>
        <div className={styles.metricText}>
          <div className={ styles.metricSubtext }>
            <h5>CPU</h5>
            {metrics && metrics.CPUPerc}
          </div>
          <div className={styles.metricSubtext}>
            <h5>MEM Usage</h5>
            {metrics && metrics.MemUsage}
          </div>
          <div className={styles.metricSubtext}>
            <h5>MEM %</h5>
            {metrics && metrics.MemPerc}
          </div>          
        </div>
        <div className={styles.metricText}>
          <div className={styles.metricSubtext}>
            <h5>NET I/O</h5>
            {metrics && metrics.NetIO}
          </div>
          <div className={styles.metricSubtext}>
            <h5>BLOCK I/O</h5>
            {metrics && metrics.BlockIO}
          </div>
          <div className={styles.metricSubtext}>
            <h5>PID</h5>
            {metrics && metrics.PIDs}
          </div>
        </div>
      </div>
      
      <div className={styles.buttonHolder}>
        <div className={styles.buttonSpacer}>
          {status === 'running' && (
            <button
              className={styles.buttonSmall}
              onClick={() => stopContainer(container)}
            >
              STOP
            </button>
          )}
          {status === 'stopped' && (
            <>
              <button
                className={styles.buttonSmall}
                onClick={() => runContainer(container)}
              >
                RUN
              </button>
              <button
                className={styles.buttonSmall}
                onClick={() => removeContainer(container)}
              >
                REMOVE
              </button>
            </>
          )}
          {(status === 'running') && (
            <button
              className={styles.buttonSmallBottom}
              onClick={() => openNetworkList()}
            >
              NETWORKS
            </button>
          )}
        </div>
      </div>


      {container.Names && connectToNetwork && disconnectFromNetwork && <NetworkListModal
        Names={container.Names}
        isOpen={isOpen}
        closeNetworkList={closeNetworkList}
        networkContainerList={networkContainerList}
        connectToNetwork={connectToNetwork}
        disconnectFromNetwork={disconnectFromNetwork}
        container={container}
      />}
    </div>
  );
};
        
export default RunningContainer;