import React from 'react';
import styles from './Setup.module.scss';
import globalStyles from '../global.module.scss';

const Setup = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h3>Configure Kubernetes</h3>
      <div className={styles.buttonContainer}>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('http://localhost:3000/')}>Install Prometheus Operator</button>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('http://localhost:3000/')}>Get Metrics</button>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('http://localhost:3000/')}>Launch Port Forwarding</button>
      </div>
    </div>
  );
};

export default Setup;
