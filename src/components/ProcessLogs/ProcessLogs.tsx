import React, { useEffect, useState } from 'react';
import ProcessLogsCard from '../ProcessLogsCard/ProcessLogsCard';
import ProcessLogsSelector from './ProcessLogsSelector';
import { ContainerType, RowsDataType } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { createAlert } from '../../reducers/alertReducer';
import useHelper from '../helpers/commands';
import useSurvey from '../helpers/dispatch';
import { buildOptionsObj } from '../helpers/logs';

import { CSVLink } from 'react-csv';

import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
 **/

type CSVData = string[];

const ProcessLogs = (): JSX.Element => {
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );
  console.log('runningList: ', runningList);

  const dispatch = useAppDispatch();
  const { getContainerLogsDispatcher } = useSurvey();
  const { getLogs } = useHelper();

  // const id = containerID[containerID.length - 1];
  // I need to pass in array of object names
  // make object with name and wether or not they're checked

  // const renderStoppedList = ;

  return (
    <div className={styles.wrapper}>
      <div>
        <div>
          <h2>RUNNING CONTAINERS</h2>
          <div>Count: {runningList.length}</div>
          <div className={styles.cardHolder}>
            {runningList.map(
              (container: ContainerType, index: number): JSX.Element => (
                <ProcessLogsCard
                  key={index}
                  index={index}
                  container={container}
                  status="Running"
                />
              )
            )}
          </div>
        </div>
        <div>
          <div>
            <div>
              <h2>STOPPED CONTAINERS</h2>
              <div>
                <div>Count</div>
                <div>{stoppedList.length}</div>
              </div>
            </div>
            <div className={styles.cardHolder}>
              {stoppedList.map(
                (container: ContainerType, index: number): JSX.Element => (
                  <ProcessLogsCard
                    key={index}
                    index={index}
                    container={container}
                    status="Stopped"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessLogs;
