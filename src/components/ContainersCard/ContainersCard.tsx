import React, { useState } from 'react';
// import Modal from 'react-modal';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import { createAlert } from '../../reducers/alertReducer';
import { ContainerType, ContainersCardsProps } from '../../../types';

// import styles from './ContainersCard.module.scss';
// import globalStyles from '../global.module.scss';
// import useHelper from '../../helpers/commands';
// import useSurvey from '../../helpers/dispatch';
import RunningContainer from '../RunningContainer/RunningContainer';

const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
}: ContainersCardsProps): JSX.Element => {
  // // Using useAppSelector for accessing to networkList state
  // const { networkList } = useAppSelector((state) => state.composes);

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

      // console.log for what does resoponse from backend looks like
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
            5,
            // type of the alert
            'success'
          )
        );
        // iterate through containerList in state. if containerName matches the element in containerList, update it's network property to include the network that it was connected to.
        const { networkConnect }: any = dispatch;
        networkConnect([containerName, networkName]);
      } else if (dataFromBackend.error) {
        // If server response { error: stderr } to the frontend which means container already exist in the network
        dispatch(
          createAlert(
            containerName + ' is already attached to the ' + networkName,
            5,
            'warning'
          )
        );
        return;
      }
    } catch (err) {
      dispatch(
        createAlert(
          'An error occurred while attaching to network : ' + err,
          5,
          'error'
        )
      );
    }
  }

  //   // create state that will use as toggle to show the modal or not
  // const [isOpen, setIsOpen] = useState(false);


  // // function for opening the modal
  // // openNetworkList will be invoking when open button is clicked[ line# 154 ]
  // const openNetworkList = () => {
  //   setIsOpen(true);
  // };

  // // function for closing the modal
  // // closeNetworkList will be invoking when close button is clicked[ line# 90 ]
  // const closeNetworkList = () => {
  //   setIsOpen(false);
  // };

  // // Temporary styling for the modal
  // const customStyles = {
  //   // overlay
  //   overlay: {
  //     left: '40%',
  //     top: '30%',
  //     width: '430px',
  //     height: '330px',
  //     // try to mimick the current docketeer's background color
  //     background: 'hsl(0deg 0% 12.94%)',
  //   },
  //   // content which display the actual component
  //   content: {
  //     width: '350px',
  //     height: '250px',
  //     // try to mimick the current docketeer's container card color
  //     background: 'hsl(210deg 15.22% 18.04%)',
  //   },
  // };

  // // temporary styling for button
  // const buttonStyles = {
  //   color: 'white',
  //   border: '2px solid black',
  //   backgroundColor: 'black',
  // };
  // const buttonDiv = {
  //   marginTop: '20px',
  //   marginLeft: '120px',
  // };
  // //
  // const networkDiv = {
  //   marginTop: '10px',
  // };
  // /* 
  // current props for Modal
  // isOpen => Boolean describing if the modal should be shown or not (isOpen state)

  // onRequestClose => Function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC).

  // contentLabel => String indicating how the content container should be announced to screenreaders
  
  // style => Object indicating styles to be used for the modal and it has two keys, `overlay` and `content`.
  //          { overlay: {}, content: {} } 
  // */

  // // component for the modal to display current network list
  // const NetworkListModal = ({ Names }: ContainerType): JSX.Element => {
  //   // console.log(Names);

  //   return (
  //     <Modal
  //       isOpen={isOpen}
  //       onRequestClose={closeNetworkList}
  //       contentLable="Network List"
  //       style={customStyles}
  //       ariaHideApp={false}
  //     >
  //       <div className={styles.listHolder}>
  //         <h4>Network List for {Names}</h4>
  //         {networkList.map((name: string, index: number) => {
  //           return (
  //             <div style={networkDiv} key={index}>
  //               <p id={styles.networkName}>{name}</p>
  //               <button onClick={() => connectToNetwork(name, Names)}>
  //                 Connect
  //               </button>
  //             </div>
  //           );
  //         })}
  //         <div style={buttonDiv}>
  //           <button style={buttonStyles} onClick={() => closeNetworkList()}>
  //             CLOSE
  //           </button>
  //         </div>
  //       </div>
  //     </Modal>
  //   );
  // };
  const RunningContainers = containerList.map((container: ContainerType, i: number) => {
    return (
      <RunningContainer
        container={container}
        key={i}
        stopContainer={stopContainer}
        runContainer={runContainer}
        removeContainer={removeContainer}
        connectToNetwork={connectToNetwork}
        status="running"/>
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
