import React from 'react';
import Setup from './Setup';
import styles from './Setup.module.scss';

const SetupDisplay = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h3>Configure Kubernetes</h3>
      <div><Setup /></div>
    </div>
  );
};

export default SetupDisplay;
