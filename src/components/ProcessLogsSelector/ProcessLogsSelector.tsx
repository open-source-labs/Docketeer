import React from 'react';
import styles from './ProcessLogsSelector.module.scss';
import globalStyles from '../global.module.scss';
import { ProcessLogsSelectorProps } from '../../../types';

/**
 * @module | ProcessLogsSelector.tsx
 * @description | This component renders checkboxes to select which process logs you would like to get.
 **/
function ProcessLogsSelector({
  containerList,
  handleCheck,
  btnIdList,
  status,
}: ProcessLogsSelectorProps): JSX.Element {

  return (
    <form className={styles.wrapper}>
      <fieldset className={globalStyles.radioForm}>
        <legend>{status.toUpperCase()} CONTAINERS</legend>
        {containerList.map((container, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                id={container.Names}
                value={container.Names}
                checked={btnIdList[container.Names] === true}
                onChange={(e) => {
                  handleCheck(e.target.id);
                }}
              />
              <label htmlFor={container.Names}>{container.Names}</label>
            </div>
          );
        })}
      </fieldset>
    </form>
  );
}

export default ProcessLogsSelector;
