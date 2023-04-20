import React from 'react';
import styles from './Setup.module.scss';

const Setup = (): JSX.Element => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button1} style={{ alignSelf: 'center' }}
        onClick={() => fetch('/api/setup/promInstall')}>Install Prometheus Operator</button>
      <span style={{display: 'none'}}>complete!&#10004;</span>
      <button className={styles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('/api/setup/applyGraf')}>Get Metrics</button>
      <button className={styles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('/api/setup/portForward')}>Launch Port Forwarding</button>
    </div>
  );
};

export default Setup;
