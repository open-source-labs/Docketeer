/* eslint-disable react/prop-types */
import React from 'react';
import { ContainerType } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';
import useHelper from '../../helpers/commands';
import { createAlert, createPrompt } from '../../reducers/alertReducer';

import styles from './Containers.module.scss';
import globalStyles from '../global.module.scss';

/**
 * @module | Containers.tsx
 * @description | Provides information and management over both running & stopped Docker containers
 **/

const Containers = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { runStopped, remove, stop } = useHelper();

  const { runningList, stoppedList } = useAppSelector(
    (state) => state.containers
  );

  const stopContainer = (container: ContainerType) => {
    dispatch(
      createPrompt(
        `Are you sure you want to stop ${container.Names}?`,
        () => {
          stop(container.ID);
          dispatch(createAlert(`Stopping ${container.Names}...`, 5, 'error'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to stop ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  const runContainer = (container: ContainerType) => {
    dispatch(
      createPrompt(
        `Are you sure you want to run ${container.Names}?`,
        () => {
          runStopped(container['ID']);
          dispatch(createAlert(`Running ${container.Names}...`, 5, 'success'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to run ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  const removeContainer = (container: ContainerType) => {
    dispatch(
      createPrompt(
        `Are you sure you want to remove ${container.Names}?`,
        () => {
          remove(container['ID']);
          dispatch(createAlert(`Removing ${container.Names}...`, 5, 'success'));
        },
        () => {
          dispatch(
            createAlert(
              `The request to remove ${container.Names} has been cancelled.`,
              5,
              'warning'
            )
          );
        }
      )
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.listHolder}>
        <h2>RUNNING CONTAINERS</h2>
        <div>Count: {runningList.length}</div>
        <div className={styles.containerList}>
          {runningList.map((container: ContainerType, i: number) => {
            return (
              <div key={i} className={globalStyles.card}>
                <div>
                  <h2>{container.Names}</h2>
                  <div></div>
                  <p>Image: {container.Image}</p>
                  <p>ID: {container.ID}</p>
                  <p>Running for: {container.RunningFor}</p>
                  <div>
                    <button
                      className={globalStyles.buttonSmall}
                      onClick={() => stopContainer(container)}
                    >
                      STOP
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.listHolder}>
        <h2>STOPPED CONTAINERS</h2>
        <div>Count: {stoppedList.length}</div>
        <div className={styles.containerList}>
          {stoppedList.map((container: ContainerType, i: number) => {
            return (
              <div key={i} className={globalStyles.card}>
                <div>
                  <h2>{container.Names}</h2>
                  <p>Image: {container.Image}</p>
                  <p>ID: {container.ID}</p>
                  <p>Running for: {container.RunningFor}</p>
                  <div>
                    <button
                      className={globalStyles.buttonSmall}
                      onClick={() => runContainer(container)}
                    >
                      RUN
                    </button>
                    <button
                      className={globalStyles.buttonSmall}
                      onClick={() => removeContainer(container)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Containers;
