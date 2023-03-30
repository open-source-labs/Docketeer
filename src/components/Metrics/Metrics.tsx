import React from 'react';

import styles from './Metrics.module.scss';

/**
 * @module | Metrics.tsx
 * @description | cAdvisor-provided local environment metrics, queried through Prometheus, & rendered utilizing Grafana
 **/

const Metrics = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h2>METRICS DASHBOARD</h2>
      <iframe
        className={styles.metrics}
        src="http://localhost:2999/d/h5LcytHGz/system?orgId=1&refresh=10s&kiosk"
      />
    </div>
  );
};

export default Metrics;
