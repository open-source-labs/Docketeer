import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Metrics = (): JSX.Element => {

  const getMetrics = async (): Promise<void> => {
    const date = new Date().toISOString();
    const metrics = [
      // {
      //   metricName: 'Containers',
      //   metricQuery: 'count(rate(container_last_seen{name=~".+", job="localprometheus"}[1m]))'
      //   // count(rate(container_last_seen{name=~".+", job="localprometheus"}[50s]))
      // },
      {
        metricName: 'diskSpace',
        metricQuery: 'round(sum(container_fs_usage_bytes{job="localprometheus"}) by (container_name) / sum(container_fs_limit_bytes{job="localprometheus"}) by (container_name), 0.001)'
      },
      {
        metricName: 'memory',
        metricQuery: 'round((1 - (node_memory_MemAvailable_bytes{job="localprometheus"} / node_memory_MemTotal_bytes{job="localprometheus"})), 0.001)'
      },
      {
        metricName: 'swap',
        metricQuery: 'round((1 - (node_memory_SwapFree_bytes{job="localprometheus"} / node_memory_SwapTotal_bytes{job="localprometheus"})), 0.001)'
      },
      {
        metricName: 'CPU_usage',
        metricQuery: 'sum(rate(process_cpu_seconds_total{job="localprometheus"}[5m])) * 100'
      },
      // {
      //   metricName: 'Used Disk Space',
      //   metricQuery: 'node_filesystem_size_bytes{job="localprometheus"} - node_filesystem_free_bytes{job="localprometheus"}'
      // },
      {
        metricName: 'available_Memory',
        metricQuery: 'node_memory_MemTotal_bytes{job="localprometheus"} - node_memory_MemAvailable_bytes{job="localprometheus"}'
      },
    ];

    const metricsEntry = {}
    metricsEntry['date'] = date;

    const fetchPromises = metrics.map(async metric => {
      const { metricName, metricQuery } = metric;
      const res = await fetch(`http://localhost:49156/api/v1/query?query=${metric.metricQuery}&time=${date}`);
      const metricData = await res.json();
      metricsEntry[metricName] = metricData.data;
    })

    await Promise.all(fetchPromises);
    saveMetrics(metricsEntry)

  }

  const saveMetrics = (metricsEntry) => { 
    const metricsEntryString = JSON.stringify(metricsEntry['diskSpace']);
    const saveMetricsRequest = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(metricsEntry),
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
          <button className={styles.button} onClick={getMetrics}>
            SAVE METRICS
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
