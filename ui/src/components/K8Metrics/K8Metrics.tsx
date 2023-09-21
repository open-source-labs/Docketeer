import React, { useState, useEffect } from 'react';
import styles from './K8Metrics.module.scss'
import useHelper from '../../helpers/commands';


const K8Metrics = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h2>Kuburnetes Cluster Health Metrics</h2>
    </div>
  )
}



export default K8Metrics