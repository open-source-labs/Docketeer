import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAppSelector } from '../../reducers/hooks';
import {
  ContainersCardsProps,
  NetworkModal,
  NetworkContainerListType,
} from '../../../types';
import ConnectOrDisconnect from '../ConnectOrDisconnect/ConnectOrDisconnect';
import styles from './RunningContainer.module.scss';
import globalStyles from '../global.module.scss';

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


  // temporary styling for button
  const buttonStyles = {
    color: 'white',
    border: '2px solid black',
    backgroundColor: 'black',
  };
  const buttonDiv = {
    marginTop: '20px',
    marginLeft: '120px',
  };
  //
  const networkDiv = {
    marginTop: '10px',
  };
  /* 
  current props for Modal
  isOpen => Boolean describing if the modal should be shown or not (isOpen state)

  onRequestClose => Function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC).

  contentLabel => String indicating how the content container should be announced to screenreaders
  
  style => Object indicating styles to be used for the modal and it has two keys, `overlay` and `content`.
           { overlay: {}, content: {} } 
  */


  const NetworkListModal = ({ Names }: NetworkModal): JSX.Element => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeNetworkList}
        contentLabel="Network List"
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <div className={styles.listHolder}>
          <h4>Network List for {Names}</h4>
          {networkContainerList.map(
            (network: NetworkContainerListType, index: number) => {
              return (
                <div style={networkDiv} key={index}>
                  <p id={styles.networkName}>{network.networkName}</p>
                  {/* <button onClick={() => connectToNetwork(name, Names)}>
                  Connect
                </button>
                <button onClick={() => disconnectFromNetwork(name, Names)}>
                  Disconnect
                </button> */}
                  <ConnectOrDisconnect
                    container={container}
                    networkName={network.networkName}
                    connectToNetwork={connectToNetwork}
                    disconnectFromNetwork={disconnectFromNetwork}
                  />
                </div>
              );
            }
          )}
          <div className={styles.buttonDiv}>
            <button
              className={globalStyles.buttonSmall}
              onClick={() => closeNetworkList()}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    );
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
          {status === 'running' && (
            <button
              className={globalStyles.buttonSmall}
              onClick={() => openNetworkList()}
            >
              NETWORK
            </button>
          )}
        </div>
      </div>
      <NetworkListModal Names={container.Names} />
    </div>
  );
};
        
export default RunningContainer;