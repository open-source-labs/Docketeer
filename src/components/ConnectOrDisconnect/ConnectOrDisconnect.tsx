import React from 'react';
import styles from './ConnectOrDisconnect.module.scss';

/**
 * @module | ConnectedOrDisconnect.tsx
 * @description | This component renders either a connect or disconnect button, depending on whether the container is currently attached to the network.
 **/

const ConnectOrDisconnect = ({ container, networkName, connectToNetwork, disconnectFromNetwork }: { container: object, networkName: string, connectToNetwork: Function, disconnectFromNetwork: Function}): JSX.Element => {

  // component that will rendered if the connected variable has a value of trueif the connected variable has a value of true
  const connectButton = () => {
    return <button className={styles.connect} onClick={() => connectToNetwork(networkName, container.Names)}> Connect </button>;
  };

  // component that will rendered if connected variable has a value of false
  const disconnectButton = () => {
    return <button className={styles.disconnect} onClick={() => disconnectFromNetwork(networkName, container.Names)}> Disconnect </button>;
  };

  const Button = container.Networks.includes(networkName) ? disconnectButton() : connectButton();


  return (
    <div>
      {Button}
    </div>
  );
};

export default ConnectOrDisconnect;
