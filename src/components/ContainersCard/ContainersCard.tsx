import React from 'react';

import { ContainerType } from '../../../types';

import styles from './ContainersCard.module.scss';
import globalStyles from '../global.module.scss';

// TODO: double check that stopped for is the right information in stopped containers
// TODO: how can I make running containers and stopped containers the same size but still scale with text input?

const ContainersCard = ({
  containerList,
  stopContainer,
  runContainer,
  removeContainer,
  status,
}) => {
  return (
    <>
      {containerList.map((container: ContainerType, i: number) => {
        return (
          <div key={i} className={styles.containerCard}>
            <div className={styles.textHolder}>
              <h2>{container.Names}</h2>
              <p>
                <strong>Image:</strong> {container.Image}
              </p>
              <p>
                <strong>ID:</strong> {container.ID}
              </p>
              {status === 'running' && (
                <p>
                  <strong>Running for:</strong> {container.RunningFor}
                </p>
              )}
              {status === 'stopped' && (
                <p>
                  <strong>Stopped for:</strong> {container.RunningFor}
                </p>
              )}
            </div>
            <div className={styles.buttonHolder}>
              <div className={styles.buttonSpacer}>
                {status === 'running' && (
                  <button
                    className={globalStyles.buttonSmall}
                    onClick={() => stopContainer(container)}
                  >
                    STOP
                  </button>
                )}
                {status === 'stopped' && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContainersCard;
