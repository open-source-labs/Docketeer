import React from 'react';
import { ProcessLogsSelectorProps } from '../../../types';
import styles from './ProcessLogsSelector.module.scss';

function ProcessLogsSelector({
  containerList,
  handleCheck,
  btnIdList
}: ProcessLogsSelectorProps): JSX.Element {

  return (
    <div className={styles.wrapper}>
      <form>
        <fieldset>
          <legend>Container List</legend>
          {containerList.map((container, i) => {
            return (
              <div key={i} >
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
    </div>
  );
}

export default ProcessLogsSelector;
