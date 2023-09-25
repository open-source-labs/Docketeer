import React, { useState, useEffect } from 'react';
import styles from '../Metrics/Metrics.module.scss';
import useHelper from '../../helpers/commands';


const K8Metrics = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h2>Kuburnetes Cluster Health Metrics</h2>
      <div>
        <iframe className={styles.metrics}
 src="http://localhost:49155/d/k8s_views_nodes/kubernetes-views-nodes?orgId=1&refresh=30s&var-job=node&var-datasource=PBFA97CFB590B2093&var-resolution=3m&var-node=docker-desktop&var-instance=192.168.65.4:9100&kiosk" ></iframe>
      </div>
    </div>
  )
}



export default K8Metrics