// NetworkListModal.tsx
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { NetworkContainerListType } from '../../../types';
import ConnectOrDisconnect from '../ConnectOrDisconnect/ConnectOrDisconnect';
import styles from './NetworkListModal.module.scss';
import globalStyles from '../global.module.scss';
import * as scrollPositionModule from './scrollPosition';

const NetworkListModal = ({
  Names,
  container,
  isOpen,
  connectToNetwork,
  disconnectFromNetwork,
  closeNetworkList,
  networkContainerList,
}: any): JSX.Element => {
  
  // useEffect that sets up an event listener to track scroll position changes and saves them in the 'scrollPositionModule'.
  useEffect(() => {
    // This function 'handleScroll' is called whenever the user scrolls the window.
    const handleScroll = () => {
      // Get the current vertical scroll position of the window.
      const scrollY = window.scrollY;
      // Call the 'setScrollPosition' function from 'scrollPositionModule' to update the stored scroll position.
      scrollPositionModule.setScrollPosition(scrollY);
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
    const savedScrollPosition = scrollPositionModule.getScrollPosition();
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
      <div className={styles.listHolder}>
        <h4>Network List for {Names}</h4>
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
