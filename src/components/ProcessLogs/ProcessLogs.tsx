import React from 'react';
import ProcessLogsCard from '../ProcessLogsCard/ProcessLogsCard';
import { ContainerType } from '../../../types';
import { useAppSelector } from '../../reducers/hooks';

import styles from './ProcessLogs.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Metrics.tsx
 * @description | Provides process logs for running containers & additional configuration options
 **/

const ProcessLogs = (): JSX.Element => {
  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  // const renderRunningList = ;

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
