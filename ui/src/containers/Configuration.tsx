import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../reducers/hooks';
import { setEndpointTypes, setPrometheusDataSources } from '../reducers/configurationReducer';
import Client from '../models/Client';
import PromDataSource from '../components/Configuration/PromDataSource';
import ConfigurationForm from '../components/Configuration/ConfigurationForm';
import styles from './C.module.scss'

const Configuration = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  // Set state of Prom Data Sources upon page load
  const promDataSourcesLength = useAppSelector(store => store.configuration.prometheusDataSources.length);
  useEffect(() => {
    async function loadPromSources() {
      const dataSources = await Client.ConfigService.getDataSources();
      dispatch(setPrometheusDataSources(dataSources));

      const endpointTypes = await Client.ConfigService.getEndpointTypes();
      dispatch(setEndpointTypes(endpointTypes));

    }
    loadPromSources();
  }, [promDataSourcesLength]);

  // Child Elements for individual Configuration
  const dataSourceElements: React.JSX.Element[] = [];
  // Loop through to length of the promDataSource index, passing in the index
  for (let i = 0; i < promDataSourcesLength; i++){
    dataSourceElements.push(<PromDataSource key={`datasource_${i}`} index={i} />);
  }



  return (
    <div>
      <div>
        <h2 className = {styles.hh}>Configurations</h2>
        <div>
          <h3 className = {styles.hh}>Upload New Configuration</h3>
          <ConfigurationForm />
        </div>
        <div>
          <h3>Connected Data Sources</h3>
          <div>
            {dataSourceElements}
          </div>
        </div>
      </div>
    </div>
  );
}



export default Configuration;