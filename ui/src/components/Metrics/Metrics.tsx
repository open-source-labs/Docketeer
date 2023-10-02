import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';
import useHelper from '../../helpers/commands';

const Metrics = (): JSX.Element => {
  // const { getKey, getUid } = useHelper();
  const { checkGrafanaConnection } = useHelper();

  // This is up here to define it before the metricsDiv state so it can be passed into the button
  const checkGrafana = async () => {
    const grafStatus = true;  //await checkGrafanaConnection();
    if (grafStatus) {
      setMetricsDiv(
        <iframe
          className={styles.metrics}
          src="http://localhost:49155/d/metrics_monitoring/docker-and-system-monitoring?orgId=1&refresh=5m&kiosk"
        />
      );
    }
  }
  const [metricsDiv, setMetricsDiv] = useState(
    <div>
      <p>Containers are still booting.</p>
      <button className={styles.button} onClick={checkGrafana}>Click to refresh</button>
    </div>
  );

  useEffect(() => {
    /** 
    * @description Retrieves the API and UID key 
    * @method
    * @async
    * @returns {promise} returns promise when api key and uid key is successfully set
    */
    // Checks to see if the grafana container is running
    checkGrafana();
  }, []);


  /** 
    * @description Changes the container metrics dashboard to the kubernetes dashboard
    * @params {string} dashboard, new dashboard page to set to as the current page
    * @returns {promise} returns promise when dashboard and uid key is successfully set
  */
  // const changePage = async (dashboard: any) => {
  //   setCurrentPage(dashboard);
  //   const uid = await getUid(apiKey, dashboard);
  //   setUidKey(uid);
  // };

  return (
    <div className={styles.wrapper}>
      <h2>METRICS DASHBOARD</h2>
      {/* If reimplementing kubernetes deleted the below div and uncomment all the rest */}
      <div>
        {metricsDiv}
      </div>
    </div>
  );
};

export default Metrics;
