import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [kubernetesOrNah, setFrame] = useState(1);
  const button = kubernetesOrNah === 1 ? 'Container Metrics' : 'Kubernetes Cluster Metrics';

  const handleToggle = () => {
    setFrame((prevFrame) => (prevFrame === 1 ? 2 : 1));
  };


  return (
    <div className={styles.wrapper}>
      <h2>METRICS DASHBOARD</h2>
      <input type="checkbox" id="switch" className={styles.switch} onClick={handleToggle} />
      {button}
      <label className={styles.toggle} htmlFor="switch"></label>
      {kubernetesOrNah === 1 ? (
        <iframe
          className={styles.metrics}
          src="http://localhost:2999/d/h5LcytHGz/system?orgId=1&refresh=10s&kiosk"
        />
      ) : (
        <iframe
          className={styles.metrics}
          src={`http://localhost:3000/d/${uid}/node-exporter-nodes?orgId=1&refresh=30s`}
        />
      )}
    </div>
  );
};

export default Metrics;
