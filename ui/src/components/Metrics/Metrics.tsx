import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [resetIframe, setResetIframe] = useState<boolean>(true);

  const handleHome = (): void => {
    setResetIframe(resetIframe ? false : true);
  };

  const getMetrics = (): void => {
    const date = Math.floor(new Date().getTime() / 1000);
    console.log('date', date);

    const url = 'http://localhost:49156/api/v1/query';
    const queryValue = `{__name__=~".+" } @ ${date}`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ query: queryValue }).toString(),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        //saveMetrics(date, data.data);
      })
      .catch((error) => console.error('Error:', error));

    // const date = new Date().toISOString();
    // fetch(
    //   `http://localhost:49156/api/v1/query?query=node_memory_MemAvailable_bytes&time=${date}`
    // )
    //   .then((data) => data.json())
    //   .then((data) => {
    //     console.log(data.data)
    //     saveMetrics(date, data.data)
    //   })
    //   .catch((err) => console.log(err));
  }

  const saveMetrics = (date, metricsResult) => { 

    const newEntry = {
      date: date,
      metricsResult: metricsResult
    }

    const saveMetricsRequest = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    };

    fetch(
      'http://localhost:3000/api/saveMetricsEntry',
      saveMetricsRequest
    )
      .then(data => data.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.iframeHeader}>
        <h2>METRICS DASHBOARD</h2>
        <div>
          <button className={styles.button} onClick={handleHome}>
            HOME
          </button>
          <button className='SaveMetrics' onClick={getMetrics}>
            Save CPU and Memory Metrics
          </button>
        </div>
      </div>
      <div>
        <iframe
          //TODO:fix the boolean key issue, key shouldn't be a bool
          // key ={resetIframe}
          id="iframe"
          className={styles.metrics}
          src="http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=10s&kiosk"
        />
      </div>
    </div>
  );
};

export default Metrics;
