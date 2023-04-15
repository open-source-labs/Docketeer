import React, { useState } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [kubernetesOrNah, setFrame] = useState(1);
  const button = kubernetesOrNah === 1 ? 'Containers' : 'Kubernetes Cluster';

  const handleToggle = () => {
    setFrame((prevFrame) => (prevFrame === 1 ? 2 : 1));
  };

  return (
    <div className={styles.wrapper}>
      <h2>METRICS DASHBOARD</h2>
      <button className={styles.button} onClick={handleToggle}>
        {button}
      </button>
      {kubernetesOrNah === 1 ? (
        <iframe
          className={styles.metrics}
          src="http://localhost:2999/d/h5LcytHGz/system?orgId=1&refresh=10s&kiosk"
        />
      ) : (
        <iframe
          className={styles.metrics}
          src="http://localhost:3000/d/Hkev6ZP4z/node-exporter-nodes?orgId=1&refresh=30s"
        />
      )}
    </div>
  );
};

export default Metrics;
