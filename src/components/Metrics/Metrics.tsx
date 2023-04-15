import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [kubernetesOrNah, setFrame] = useState(1);
  const [key, setKey] = useState('');
  const [uid, setUID] = useState('');
  const [dashboard, setDashboard] = useState('Node Exporter / Nodes');
  const button = kubernetesOrNah === 1 ? 'Container Metrics' : 'Kubernetes Cluster Metrics';

  const handleToggle = () => {
    setFrame((prevFrame) => (prevFrame === 1 ? 2 : 1));
  };

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/auth/keys', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Basic YWRtaW46cHJvbS1vcGVyYXRvcg==',
  //       Accept: '*/*',
  //       'Content-Type': 'application/json',
  //     },
  //     mode: 'no-cors',
  //     body: JSON.stringify({
  //       'name': 'myKey',
  //       'role': 'Admin',
  //       'secondsToLive': 86400
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('this is the key ', data.key);
  //       setKey(data.key);
  //     });
  // });

  useEffect(() => {
    fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(dashboard)}`, {
      method: 'GET',
      headers: {
        Authorization: 'Basic YWRtaW46cHJvbS1vcGVyYXRvcg==',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      mode: 'no-cors'
    })
      // .then(response => response.json())
      .then(data => {
        console.log(data);
        setUID(data[0].uid);
      });
  });

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
          src={`http://localhost:3000/d/${uid}/node-exporter-nodes?orgId=1&refresh=30s`}
        />
      )}
    </div>
  );
};

export default Metrics;
