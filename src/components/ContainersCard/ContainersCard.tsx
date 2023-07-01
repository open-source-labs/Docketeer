import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { ContainerType, ContainersCardsProps } from '../../../types';

import styles from './ContainersCard.module.scss';
import globalStyles from '../global.module.scss';
// import useHelper from '../../helpers/commands';

const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
  // connectToNetwork,
  status,
}: ContainersCardsProps): JSX.Element => {
  // Using useAppSelector for accessing to networkList state
  const { networkList } = useAppSelector((state) => state.composes);
 

  // create state that will use as toggle to show the modal or not
  const [isOpen, setIsOpen] = useState(false);


  const dispatch = useAppDispatch();
  // const { networkName, containerName } = req.body; <-- give the backend this information
  // containerName = container.Name

  async function connectToNetwork(
    networkName: string,
    containerName: string,
  ): Promise<void> {
    try {
      console.log(containerName)
      const response = await fetch('/api/command/networkConnect', {
        method: 'POST',
        body: JSON.stringify({
          networkName: networkName,
          containerName: containerName,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log(
          `Request to connect ${containerName} to ${networkName} has been sent`
        );
        // iterate through containerList in state. if containerName matches the element in containerList, update it's network property to include the network that it was connected to.
        const { networkConnect }: any = dispatch;
        console.log(containerName, networkName);
        networkConnect([containerName, networkName]);
      } else {
        // If backend sending stderr to the frontend
        dispatch(
          createAlert(
            'Please detach container(s) before deleting this network.',
            5,
            'error'
          )
        );
        return;
      }
    } catch (err) {
      console.log('An error occurred while attaching to network', err);
    }
  }

  // function for opening the modal
  // openNetworkList will be invoking when open button is clicked[ line# 154 ]
  const openNetworkList = () => {
    setIsOpen(true);
  };

  // function for closing the modal
  // closeNetworkList will be invoking when close button is clicked[ line# 90 ]
  const closeNetworkList = () => {
    setIsOpen(false);
  };

  // Temporary styling for the modal
  const customStyles = {
    // overlay
    overlay: {
      left: '40%',
      top: '30%',
      width: '430px',
      height: '330px',
      // try to mimick the current docketeer's background color
      background: 'hsl(0deg 0% 12.94%)',
    },
    // content which display the actual component
    content: {
      width: '350px',
      height: '250px',
      // try to mimick the current docketeer's container card color
      background: 'hsl(210deg 15.22% 18.04%)',
    },
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

  // component for the modal to display current network list
  const NetworkListModal = ({ Names }: ContainerType): JSX.Element => {
    console.log('Line#130', Names);

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeNetworkList}
        contentLable="Network List"
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={styles.listHolder}>
          <h4>Network List</h4>
          {networkList.map((name: string, index: number) => {
            return (
              <div style={networkDiv} key={index}>
                <p id={styles.networkName}>{name}</p>
                <button onClick={() => connectToNetwork(name, Names)}>
                  Connect
                </button>
              </div>
            );
          })}
          <div style={buttonDiv}>
            <button style={buttonStyles} onClick={() => closeNetworkList()}>
              CLOSE
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {containerList.map((container: ContainerType, i: number) => {
        return (
          <div key={i} className={styles.containerCard}>
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
      })}
    </>
  );
};

export default ContainersCard;
