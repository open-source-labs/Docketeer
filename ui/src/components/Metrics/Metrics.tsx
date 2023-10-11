import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {
  const [resetIframe, setResetIframe] = useState<boolean>(true);

  const handleHome = (): void => {
    setResetIframe(resetIframe ? false : true);
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
          src='http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=10s&kiosk'
        />
      </div>
    </div>
  );
};

export default Metrics;
