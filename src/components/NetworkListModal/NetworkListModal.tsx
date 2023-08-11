// NetworkListModal.tsx
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { NetworkContainerListType, NetworkListModalProps } from '../../../types';
import ConnectOrDisconnect from '../ConnectOrDisconnect/ConnectOrDisconnect';
import styles from './NetworkListModal.module.scss';
import globalStyles from '../global.module.scss';


/**
 * @module | NetworkListModal.tsx
 * @description | This component renders a modal window that displays all of the networks that exist for the corresponding container to attach to or disconnect from.
 **/

const NetworkListModal = ({
  Names,
  container,
  isOpen,
  connectToNetwork,
  disconnectFromNetwork,
  closeNetworkList,
  networkContainerList,
}: NetworkListModalProps): JSX.Element => {
  // Declare a variable 'scrollPosition' with an initial value of 0.
  let scrollPosition = 0;
  // Function 'getScrollPosition' that returns the current value of 'scrollPosition'.
  const getScrollPosition = () => scrollPosition;
  // Function 'setScrollPosition' that takes a 'position' argument and updates the 'scrollPosition' variable with the new value.
  const setScrollPosition = (position: number) => (scrollPosition = position);

  // useEffect that sets up an event listener to track scroll position changes and saves them in the 'scrollPositionModule'.
  useEffect(() => {
    // This function 'handleScroll' is called whenever the user scrolls the window.
    const handleScroll = () => {
      // Get the current vertical scroll position of the window.
      const scrollY = window.scrollY;
      // Call the 'setScrollPosition' function from 'scrollPositionModule' to update the stored scroll position.
      setScrollPosition(scrollY);
    };
    // Add the 'handleScroll' function as a scroll event listener on the window.
    window.addEventListener('scroll', handleScroll);
    // Cleanup function that runs when the component is unmounted, and it removes the event listener to avoid memory leaks.
    return () => {
      // Remove the 'handleScroll' function as a scroll event listener from the window.
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect that retrieves the previously saved scroll position from the 'scrollPositionModule' and applies it to the window's scroll position.
  useEffect(() => {
    // Get the previously stored scroll position from 'scrollPositionModule'.
    const savedScrollPosition = getScrollPosition();
    if (savedScrollPosition !== null) {
      // scroll the window to the retrieved scroll position, effectively restoring the previous scroll position if there's savedScrollPosition available
      window.scrollTo(0, savedScrollPosition);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeNetworkList}
      contentLabel="Network List"
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div>
        <h4>{Names.toUpperCase()} CONNECTIONS</h4>
        <div className={styles.containerNetworks}>
          {networkContainerList.map(
            (network: NetworkContainerListType, index: number) => {
              return (
                <div className={styles.networkDiv} key={index}>
                  <p id={styles.networkName}>{network.networkName}</p>
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
        </div>
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

export default NetworkListModal;
