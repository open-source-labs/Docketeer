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
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollPositionModule.setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedScrollPosition = scrollPositionModule.getScrollPosition();
    if (savedScrollPosition !== null) {
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
