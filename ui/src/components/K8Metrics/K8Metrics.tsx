import React, { useState, useEffect } from 'react';
import styles from '../Metrics/Metrics.module.scss';
import useHelper from '../../helpers/commands';


const K8Metrics = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h2>Kuburnetes Cluster Health Metrics</h2>
      <div>
        <iframe className={styles.metrics}
 src="http://localhost:49155/d/k8s_views_pods/kubernetes-views-pods?orgId=1&refresh=30s&var-datasource=PBFA97CFB590B2093&var-namespace=&var-pod=&var-resolution=30s" frameborder="0"></iframe>
      </div>
    </div>
  )
}



export default K8Metrics