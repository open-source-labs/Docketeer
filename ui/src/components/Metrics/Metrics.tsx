import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {

  return (
    <div className={styles.wrapper}>
      <h2>METRICS DASHBOARD</h2>
      {/* If reimplementing kubernetes deleted the below div and uncomment all the rest */}
      <div>
        <iframe
          className={styles.metrics}
          src="http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=5m&kiosk"
        />
      </div>
    </div>
  );
};

export default Metrics;
