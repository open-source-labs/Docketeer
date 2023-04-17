import React from 'react';
import styles from './Setup.module.scss';
import globalStyles from '../global.module.scss';

const Setup = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h3>Configure Kubernetes</h3>
      <div className={styles.buttonContainer}>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }}
          onClick={() =>
            fetch('/api/setup/promInstall')
              .then(() => document.querySelector('span').style.display = 'inline-block')}>Install Prometheus Operator</button>
        <span style={{display: 'none'}}>complete!&#10004;</span>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('/api/setup/applyGraf')}>Get Metrics</button>
        <button className={globalStyles.button1} style={{ alignSelf: 'center' }} onClick={() => fetch('/api/setup/portForward')}>Launch Port Forwarding</button>
      </div>
    </div>
  );
};

export default Setup;
