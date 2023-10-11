import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [resetIframe, setResetIframe] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>('&from=now-2h&to=now');
  const timeDictionary = {
    Seconds: 's',
    Minutes: 'm',
    Hours: 'h',
    Days: 'd',
    Months: 'M',
    Years: 'y',
  };

  const handleHome = (): void => {
    setResetIframe(resetIframe ? false : true);
  };
  // Last {number} {dictionary}, drop down menu, with a default nume slot, an time range
  // pretty much just the graf component page minute the absolute time range power
  // default to last 2 hours
  //

  const handleTimeRangeChange = (): void => {
    console.log('change')
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.iframeHeader}>
        <h2>METRICS DASHBOARD</h2>
        <div>
          <button className={styles.button} onClick={handleHome}>
            HOME
          </button>
        </div>
      </div>
      <div>
        <iframe
          key={resetIframe}
          id='iframe'
          className={styles.metrics}
<<<<<<< HEAD
          src={
            `http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=5s&kiosk${timeRange}`
          }
=======
          src='http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=10s&kiosk'
>>>>>>> dev
        />
      </div>
    </div>
  );
};

export default Metrics;
