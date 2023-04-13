import React from "react";

import styles from "./Metrics.module.scss";

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
      <iframe
        className={styles.metrics}
        src="http://localhost:3000/d/vN1Y7kPVk/node-exporter-nodes?orgId=1&refresh=30s&from=1681423247828&to=1681426847828&anonymous=true"
      />
    </div>
  );
};

export default Metrics;
