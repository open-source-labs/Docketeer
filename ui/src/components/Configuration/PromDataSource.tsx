import React from 'react';
import { useAppSelector } from '../../reducers/hooks'
import styles from '../RunningContainer/RunningContainer.module.scss'

const PromDataSource = ({ index }: any): React.JSX.Element => {
  
  // The index tells this component which piece of array to grab
  const promDataSource = useAppSelector(store => store.configuration.prometheusDataSources[index]);


  return (
    <div className={styles.containerCard}>
      <div>
        <b>Job Name: </b> <span>{promDataSource.jobname}</span>
      </div>
      <div>
        <b>URL: </b> <span>{promDataSource.url}</span>
      </div>
      <div>
        <b>Endpoint: </b><span>{promDataSource.endpoint}</span>
      </div>
      <div>
        <b>Type of Endpoint: </b><span>{promDataSource.type_of}</span>
      </div>
      <div>
        <b>Matches: </b><span>{(promDataSource.match) ? promDataSource.match : ''}</span>
      </div>
    </div>
  );
}



export default PromDataSource;