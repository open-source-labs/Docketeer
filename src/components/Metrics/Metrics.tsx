import React from 'react';

/**
 * @module | Metrics.tsx
 * @description | cAdvisor-provided local environment metrics, queried through Prometheus, & rendered utilizing Grafana
 **/

const Metrics = (): JSX.Element => {
  return (
    <>
      <div className="h-3"></div>
      <div className="card text-neutral-content rounded-lg min-h-full">
        <div className="card-body space-y-2 metric-card">
          <h2 className="card-title text-sm">METRICS DASHBOARD</h2>
          <div className="divider py-4"></div>
          <iframe
            src="http://localhost:2999/d/h5LcytHGz/system?orgId=1&refresh=10s&kiosk"
            frameBorder="0"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Metrics;
