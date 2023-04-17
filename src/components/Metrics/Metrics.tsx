import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';
import useHelper from '../../helpers/commands';

const Metrics = (): JSX.Element => {
  const { getKey } = useHelper();
  const [kubernetesOrNah, setFrame] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const button = kubernetesOrNah === 1 ? 'Containers' : 'Kubernetes Cluster';

  useEffect(() => {
    const fetchKey = async () => {
      const key = await getKey();
      setApiKey(key);
    };

    fetchKey();
  }, [getKey]);

  const handleToggle = () => {
    setFrame((prevFrame) => (prevFrame === 1 ? 2 : 1));
  };

  console.log(apiKey);

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
