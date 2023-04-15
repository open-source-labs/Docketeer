import React, { useState } from 'react';
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
      <input type="checkbox" id="switch" onClick={handleToggle} />{button}<label htmlFor="switch">{button}</label>
      {kubernetesOrNah === 1 ? (
        <iframe
          className={styles.metrics}
          src="http://localhost:2999/d/h5LcytHGz/system?orgId=1&refresh=10s&kiosk"
        />
      ) : (
        <iframe
          className={styles.metrics}
          src="http://localhost:3000/d/ldxep7PVz/test?orgId=1&refresh=10s&kiosk"
        />
      )}
    </div>
  );
};

export default Metrics;
