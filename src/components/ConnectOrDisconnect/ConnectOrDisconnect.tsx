import React from 'react';
// import Container

// Need to have passed in props as container(container object from running list), name(string of network name), connectToNetwork(function), disconnectToNetwork(function)
const ConnectOrDisconnect = ({ container, networkName, connectToNetwork, disconnectFromNetwork }: { container: object, networkName: string, connectToNetwork: Function, disconnectFromNetwork: Function}): JSX.Element => {

  // connectButton component that will rendered if connected variable has true value
  const connectButton = () => {
    return <button onClick={() => connectToNetwork(networkName, container.Names)}> Connect </button>;
  };

  // disconnectButton component that will rendered if connected var has false value
  const disconnectButton = () => {
    return <button onClick={() => disconnectFromNetwork(networkName, container.Names)}> Disconnect </button>;
  };

  // declare and assign the variable to either connectButton / disconnectButton component depends by condition of container.Networks.includes(networkName) 
  const Button = container.Networks.includes(networkName) ? disconnectButton() : connectButton();


  return (
    <div>
      {Button}
    </div>
  );
};

export default ConnectOrDisconnect;
